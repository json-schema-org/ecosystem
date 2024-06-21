import { Octokit } from 'octokit';
import { getInput } from './setup.js';

import { DataRecorder } from './dataRecorder.js';

const CSV_FILE_NAME = `initialTopicRepoData-${Date.now()}.csv`;

export async function fetchRepoCreationDate(octokit, owner, repo) {
  console.log(`Fetching creation date for repository: ${owner}/${repo}`);
  const response = await octokit.request('GET /repos/{owner}/{repo}', {
    owner,
    repo,
  });
  return Date.parse(response.data.created_at);
}

async function fetchFirstCommitDate(octokit, owner, repo) {
  console.log(`Fetching first commit date for repository: ${owner}/${repo}`);
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner,
      repo,
      per_page: 1,
    });

    const lastPageUrl = response.headers.link?.match(
      /<([^>]+)>;\s*rel="last"/,
    )?.[1];

    if (!lastPageUrl) {
      if (response.data.length > 0) {
        response.data[0].commit.author.date;     
      } 
      else {
        throw new Error(`No commits found for ${owner}/${repo}`); //TODO: check if this is the correct error message
      }
    }
    
    const lastPageResponse = await octokit.request(lastPageUrl);

    if (lastPageResponse.data.length > 0) {
      return Date.parse(lastPageResponse.data[0].commit.author.date);     
    } else {
      console.error('Error occured');
      throw new Error(`No commits found ${owner}/${repo}`);  //TODO: check if this is the correct error message
    } 
  }
  catch(err) {
    throw new Error(`Could not find any commits for ${owner}/${repo}`); //TODO: check if this is the correct error message
  }
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
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
      owner,
      repo,
      per_page: 1,
    });
    const lastPageUrl = response.headers.link?.match(
      /<([^>]+)>;\s*rel="last"/,
    )?.[1];

    if (!lastPageUrl) {
      if (response.data.length > 0) {
        response.data[0].created_at;
      } 
      else {
        throw new Error(`No releases found for ${owner}/${repo}`); //TODO: check if this is the correct error message
      }
    }

    const lastPageResponse = await octokit.request(lastPageUrl);
    if (lastPageResponse.data.length > 0) {
      return Date.parse(lastPageResponse.data[0].created_at);
    }
    else {
      throw new Error(`No releases found for ${owner}/${repo}`); //TODO: check if this is the correct error message
    }
  }
  catch(err) {
    console.error('Error occured');
    throw new Error(`Unable to get releases for ${owner}/${repo}`); //TODO: check if this is the correct error message
  }
}

export async function processRepository(octokit, owner, repo) {
  console.log(`Processing repository: ${owner}/${repo}`);
  const githubRepoURL = `https://github.com/${owner}/${repo}`;

  const creationDate = await fetchRepoCreationDate(octokit, owner, repo);
  let firstReleaseDate;
  try {
    firstReleaseDate = await fetchFirstReleaseDate(octokit, owner, repo);
  }
  catch(err) {
    throw new Error(`Unable to get releases for ${owner}/${repo}`);  
  }
  const repoTopics = await fetchRepoTopics(octokit, owner, repo);

  let firstCommitDate;
  try {
    firstCommitDate = await fetchFirstCommitDate(octokit, owner, repo);
  }
  catch(err) {
    throw new Error(`Error trying to find first commit for ${owner}/${repo}`);
  }
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
    date_first_release: firstReleaseDate, // firstReleaseDate is null if no releases. allowed it because it is appropriate
  };

  return singleRowData;
}

async function main(token, topic, numRepos) {
  const octokit = new Octokit({ auth: token });

  const iterator = octokit.paginate.iterator(octokit.rest.search.repos, {
    q: `topic:${topic}`,
    per_page: 100,
  });
  let processedRepos = 0;

  const dataRecorder = new DataRecorder(`./data/${CSV_FILE_NAME}`);

  for await (const iteration of iterator) {
    const data = iteration.data;
    for (const repo of data) {
      try {
        if (numRepos !== -1 && processedRepos >= numRepos) break;
        const dataRow = await processRepository(
          octokit,
          repo.owner.login,
          repo.name,
        );

        dataRecorder.appendToCSV(Object.values(dataRow));
        processedRepos++;
        console.log(`processed ${processedRepos}`);
      } catch (err) {
        console.error(err);
      }
    }
  }

};


export function runMain() {
  const { token, topic, numRepos } = getInput();
  console.log(
    `Starting process with token: REDACTED, topic: ${topic}, numRepos: ${numRepos}`,
  );

  main(token, topic, numRepos);
}
