import { tmpdir } from 'node:os';
import { sep } from 'node:path';
import fs from 'fs';

import { fetchRepoCreationDate } from './main.js';
import { getInput } from './setup.js';
import { Octokit } from 'octokit';
import { DataRecorder } from './dataRecorder.js';
import { describe, it, expect, afterEach, afterAll } from '@jest/globals';

const { token } = getInput();
const octokit = new Octokit({ auth: token });
const tmpDir = tmpdir();
const tmpDirForTests = fs.mkdtempSync(`${tmpDir}${sep}`);

describe('Basic tests', () => {
  afterEach((done) => {
    fs.rm(tmpDirForTests, { recursive: true, force: true }, (err) => {
      if (err) {
        console.log(err);
        done(err);
      } else {
        console.debug('temp directory cleared');
        fs.mkdir(tmpDirForTests, {}, (err) => {
          if (err) {
            console.log(err);
            done(err);
          } else {
            done();
          }
        });
      }
    });
  });

  afterAll((done) => {
    fs.rm(tmpDirForTests, { recursive: true, force: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`${tmpDirForTests} is deleted!`);
      done();
    });
  });

  it('Simple use of Octokit calls the GitHub API', async () => {
    let data;
    data = await fetchRepoCreationDate(octokit, 'octocat', 'hello-world');
    expect(data).toEqual(1550934514000);
  });

  it('DataRecorder writes JSON data to csv file', async () => {
    const response = {
      date_first_commit: 1550934514000,
    };
    const fileName = `${tmpDirForTests}${sep}test.csv`;

    const dataRecorder = new DataRecorder(fileName);
    dataRecorder.appendToCSV([response.date_first_commit]);
    const fileContent = fs.readFileSync(fileName, 'utf8');

    expect(fileContent).toEqual(
      expect.stringContaining(response.date_first_commit.toString()),
    );
  });
});
