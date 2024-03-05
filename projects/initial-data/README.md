# Initial data

## What is this?

This folder contains a small project to collect some inital ecosystem data.

The aim is to collect all Github repos which use the `json-schema` topic, and work out when they were created and had their first release, if any.

So far, there's a simple script which collects this data in a CSV file, but it has some limitations that need addressing.

## Why?

See https://github.com/json-schema-org/community/issues/518

## Why not use an existing solution

While there are many solutions for tracking stats about a repository or a group of repositories, I could not find anything that would track project creation in an ecosystem over time.

If you know of something, please raise an Issue and let us know!

## What do I need?

The project uses node.js.and pnpm, python and csvkit ,and optionally gnuplot.

You'll also need a Github API Personal Access Token.

## How does it work?

It uses the Github rest API to get the repos for the topic.
It uses the internet archive API to check if the topic was used when the repo was first created. (I guess this may not be required, but I thought it was interesting.)

The internet archive API has a hard rate limit of 500 requests per hour.
It does not specify how it calculates the hour.

To generate the data, you'll first need to create a .env file with the following config options.

```
GITHUB_TOKEN=[YOUR Personal Access Token]
TOPIC=json-schema
NUM_REPOS=-1
```

You'll also need to run `pnpm install` to install dependencies.

For initial testing, change the number of repos to 10. When you're happy it's working, set this back to -1 for no limit.

Run `node main.js`. This will take some time. It is slow on purpose to avoid the Github API rate limits, but that doesn't help the Internet Archive API rate limit.

This will generate the data file, appending as it goes. The filename includes the timestamp of when it was created.

You'll need to run the following commands to modify the data for now.

`csvsort -c creation initialTopicRepoData-timestamp.csv > sorted_data.csv`
This sorts the data based on the creation column.

`csvcut -c creation sorted_data.csv | awk -F, '{print $1/1000, 1}' | csvformat -U 0 > processed_data.csv`
This formats the timestamp to be in seconds, as required by gnuplot.

`echo "set xdata time; set timefmt '%s'; set format x '%Y-%m-%d'; plot 'processed_data.csv' using 1:2 smooth cumulative with lines" | gnuplot -p `
This creates and displays the graph.
