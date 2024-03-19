import { Octokit } from 'octokit';
import cheerio from 'cheerio';
import { getInput } from './setup.js';

import { DataRecorder } from './dataRecorder.js';

const axios = require('axios');
const { parse } = require('json2csv');
const fs = require('fs');

const githubToken = `initialTopicRepoData-${Date.now()}.csv`;
const apiBaseUrl = 'http://archive.org/wayback/available';

// Function to fetch repository information
async function fetchRepos() {
    const topic = 'json-schema';
    const perPage = 100; // Number of results per page (adjust as needed)
    const page = 1; // Page number (start from 1)
    const sort = 'created'; // Sort by creation date
    const order = 'desc'; // Sort in descending order (newest first)

    const apiUrl = `${apiBaseUrl}/search/repositories?q=topic:${topic}&per_page=${perPage}&page=${page}&sort=${sort}&order=${order}`;

    try {
        const response = await axios.get(apiUrl);
        const repos = response.data.items.map(repo => ({
            'Repository Name': repo.full_name,
            'Creation Date': repo.created_at.substr(0, 10)
        }));

        // Fetch the first commit date for each repository
        for (const repo of repos) {
            const commitsUrl = `${apiBaseUrl}/repos/${repo['Repository Name']}/commits`;
            const commitsResponse = await axios.get(commitsUrl);
            if (commitsResponse.data.length > 0) {
                const firstCommitDate = commitsResponse.data[0].commit.author.date.substr(0, 10);
                repo['First Commit Date'] = firstCommitDate;
            } else {
                repo['First Commit Date'] = 'N/A';
            }
        }

        // Convert the data to CSV format
        const csv = parse(repos);

        // Write CSV data to a file
        fs.writeFileSync('json_schema_repos.csv', csv);
        console.log('CSV file created successfully.');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchRepos();
