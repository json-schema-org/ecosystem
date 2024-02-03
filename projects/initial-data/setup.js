import dotenv from 'dotenv';
import minimist from 'minimist';

dotenv.config();

export function getInput() {
  try {
    // Parse command line arguments
    const args = minimist(process.argv.slice(2));
    const token = args['github-token'] || process.env.GITHUB_TOKEN;
    const topic = args['topic'] || process.env.TOPIC;
    const numReposStr = args['num-repos'] || process.env.NUM_REPOS;
    const numRepos = numReposStr
      ? Number.isInteger(parseInt(numReposStr, 10))
      : 10;

    if (!token || !topic) {
      console.error('Missing token or topic');
      process.exit(1); // Exit with failure status
    }

    return { token, topic, numRepos };
  } catch (error) {
    console.error(`Error getting inputs: ${error}`);
    process.exit(1); // Exit with failure status
  }
}
