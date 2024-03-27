/* eslint-disable no-undef */
import { fetchRepoCreationDate } from './main.js';
import { getInput } from './setup.js';
import { Octokit } from 'octokit';
import { DataRecorder } from './dataRecorder.js';
import fs from 'fs';
const { token } = getInput();
const octokit = new Octokit({ auth: token });


describe('Skretch Objective', () => {
  let data;
  it('receives a mocked response from the GitHub API', async () => {
    data = await fetchRepoCreationDate(octokit, 'octocat', 'hello-world');
    expect(data).toEqual('2019-02-23T15:08:34Z');
  
  
  });

  it('writes JSON data to csv file', async() => {
    const response = {
      'date_first_commit': '2019-02-23T15:08:34Z',
    };
    const spy = jest.spyOn(DataRecorder.prototype, 'appendToCSV').mockImplementation(() => fs.appendFileSync('test.csv', '2019-02-23T15:08:34Z\n', 'utf8'));
    const dataRecorder = new DataRecorder('test.csv');
    dataRecorder.appendToCSV([response.date_first_commit]);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([data]); 
  });
});
