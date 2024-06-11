# Self Identification of Open Source JSON Schema Tooling

JSON Schema has a vast ecosystem. We have documented a fraction of the existing tools out there for JSON Schema.

This project aims to enable tooling authors and maintainers to detail their tools existance and additional informaiton to be listed on the JSON Schema website and Landscape diagram.

The approach is to define a data structure for a file which is located in their own repo, which will then be located and extracted into a single file within this repository. Other repositories such as the website and landscape repositories, will then copy and transform the data as required. The data may be used to augment or totally replace the data they hold, if any.

## Just Open Source for now

This project only aims to capture the open source tooling, and does not include detailing or tracking of tools which are not open source.

There may be further projects which aim to collate and combine data collected from other locations (such as this project), and primary data (such as information deposited into the website or later this repository in relation to close source tools).

## How do I self identify my tool?

We (will) have automation that looks for data daily. It will look for data in GitHub repositories which meet the following conditions:

- Repository has the Topic `json-schema` assigned
- Has a file called `.json-schema-identification.json` in the project's root
- The JSON file validates successfully against the version of the self identification JSON Schema it declares

While this tooling will initially only use GitHub, we will begin working on supporting other source hosts as soon as possible. We recognize that GitHub is not the only source code platform. If you'd like to help with this, please reach make yourself know in our Slack server.

## Why should I include this file in my tooling repository?

If you define this file in your tooling repository, you will:
- Be able to update your listing on the JSON Schema website's tooling page
- Have your tool listing show it's project status and be filterable based on the project status
- Have your tool shown in the JSON Schema Landscape diagram (unless you opt out)