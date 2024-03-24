import { Octokit } from 'octokit';
import { getInput } from './setup.js';

import { DataRecorder } from './dataRecorder.js';

const CSV_FILE_NAME = `initialTopicRepoData-${Date.now()}.csv`;

async function fetchRepoCreationDate(octokit, owner, repo) {
  console.log(`Fetching creation date for repository: ${owner}/${repo}`);
  const response = await octokit.request('GET /repos/{owner}/{repo}', {
    owner,
    repo,
  });
  return response.data.created_at;
}

async function fetchFirstCommitDate(octokit, owner, repo) {
  console.log(`Fetching first commit date for repository: ${owner}/${repo}`);
  const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo,
    per_page: 1,
  });
  
  const lastPageUrl = response.headers.link?.match(
    /<([^>]+)>;\s*rel="last"/,
  )?.[1];
  
  if (!lastPageUrl) {
    return response.data.length > 0 ? response.data[0].commit.author.date : null;
  }

  const lastPageResponse = await octokit.request(lastPageUrl);
  return lastPageResponse.data.length > 0 ? lastPageResponse.data[0].commit.author.date : null;
}

async function fetchRepoTopics(octokit, owner, repo) {
  console.log(`Fetching topics for repository: ${owner}/${repo}`);
  const response = await octokit.request('GET /repos/{owner}/{repo}/topics', {
    owner,
    repo,
  });
  return response.data.names;
}

async function fetchFirstReleaseDate(octokit, owner, repo) {
  console.log(`Fetching first release date for repository: ${owner}/${repo}`);
  const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner,
    repo,
    per_page: 1,
  });
  const lastPageUrl = response.headers.link?.match(
    /<([^>]+)>;\s*rel="last"/,
  )?.[1];

  if (!lastPageUrl) {
    return response.data.length > 0 ? response.data[0].created_at : null;
  }

  const lastPageResponse = await octokit.request(lastPageUrl);
  return lastPageResponse.data.length > 0
    ? lastPageResponse.data[0].created_at
    : null;
}

async function processRepository(octokit, owner, repo) {
  console.log(`Processing repository: ${owner}/${repo}`);
  const githubRepoURL = `https://github.com/${owner}/${repo}`;

  const creationDate = await fetchRepoCreationDate(octokit, owner, repo);
  const firstReleaseDate = await fetchFirstReleaseDate(octokit, owner, repo);
  const repoTopics = await fetchRepoTopics(octokit, owner, repo);
  const firstCommitDate = await fetchFirstCommitDate(octokit, owner, repo);
  console.log({ firstReleaseDate });
  if (firstReleaseDate === null) {
    console.log(`First release date: of ${githubRepoURL} unknown`);
  }
  
  if (firstCommitDate === null) {
    console.log(`First commit date: of ${githubRepoURL} unknown`);
  }
  
  const singleRowData = {
    repository: `${owner}/${repo}`,
    repoTopics: `"${repoTopics.join(', ')}"`,
    date_first_commit: firstCommitDate,
    creation: creationDate,
    release: firstReleaseDate,
  };

  return singleRowData;
}

async function main(token, topic, numRepos) {
  const octokit = new Octokit({ auth: token });

  const iterator = octokit.paginate.iterator(octokit.rest.search.repos, {
    q: `topic:${topic}`,
    per_page: 100,
  });
  console.log(iterator);
  let processedRepos = 0;

  const dataRecorder = new DataRecorder(CSV_FILE_NAME);

  for await (const iteration of iterator) {
    const data = iteration.data;
    for (const repo of data) {
      if (numRepos !== -1 && processedRepos >= numRepos) break;
      const dataRow = await processRepository(
        octokit,
        repo.owner.login,
        repo.name,
      );
      console.log({ dataRow });
      dataRecorder.appendToCSV(Object.values(dataRow));
      processedRepos++;
      console.log(`processed ${processedRepos}`);
    }

    if (numRepos !== -1 && processedRepos >= numRepos) break;
  }
}

const { token, topic, numRepos } = getInput();
console.log(
  `Starting process with token: REDACTED, topic: ${topic}, numRepos: ${numRepos}`,
);

main(token, topic, numRepos);