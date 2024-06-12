# Self Identification of Open Source JSON Schema Tooling

JSON Schema has a vast ecosystem. We have documented a fraction of the existing tools out there for JSON Schema.

This project aims to enable tooling authors and maintainers to detail their tools existence and additional information to be listed on the JSON Schema website and Landscape diagram.

The approach is to define a data structure for a file which is located in their own repo, which will then be located and extracted into a single file within this repository. Other repositories such as the website and landscape repositories, will then copy and transform the data as required. The data may be used to augment or totally replace the data they hold, if any.

🚨 Note: This document details how everything SHOULD work when fully set up and running. The realization of this effort has not yet happened. This note will be removed once everything is working.

## What data is here?

In this repository in the `data` folder, there will be three files (sets of data) relating to tools and libraries which are in relation to this project.

Community-Contributed Legacy data: The data provided by the community and maintainers which has been used for listing on the website.

Maintainer-Provided data: The data provided by tooling and library maintainers through a file in their repositories, which is then copied into this repository.

Ecosystem-Controlled Override data: The data used to override or correct data provided from maintainer repositories or legacy data.

## What is the data used for?

This data will be used for the listing of tools and libraries on the JSON Schema website, and for populating the JSON Schema landscape diagram (unless opted out).

## How do I add to or modify the data?

The Community-Contributed Legacy data is no longer accepting updates. No one should update this data.

Any changes to the data requested by the maintainers or community should be done by detailing or updating self identifying data as explained later in this document. The Maintainer-Provided data in this repository should not be edited by anyone directly.

The Ecosystem-Controlled Override data should hopefully not be used or modified very often. Such cases may be correcting data where the maintainer is no longer responding to requests to change the data or accept a Pull Request which would make the fix. This will only be edited by the JSON Schema team.

## Just Open Source for now

This project only aims to capture the open source tooling, and does not include detailing or tracking of tools which are not open source.

There may be further projects which aim to collate and combine data collected from other locations (such as this project), and primary data (such as information deposited into the website or later this repository in relation to close source tools).

## How do I self identify my tool or library?

We (will) have automation that looks for data daily. It will look for data in GitHub repositories which meet the following conditions:

- Repository has the Topic `json-schema` assigned
- Has a file called `.json-schema-identification.json` in the project's root
- The JSON file validates successfully against the version of the self identification JSON Schema it declares

While this tooling will initially only use GitHub, we will begin working on supporting other source hosts as soon as possible. We recognize that GitHub is not the only source code platform. If you'd like to help with this, please reach make yourself know in our [Slack server](https://json-schema.org/slack).

## Why should I include this file in my tooling repository?

If you define this file in your tooling repository, you will:
- Be able to update your listing on the JSON Schema website's tooling page
- Have your tool listing show it's project status and be filterable based on the project status
- Have your tool shown in the JSON Schema Landscape diagram (unless you opt out)

## What will happen with the data?

Data that's collected when it meets the above stated criteria will be used to create a Pull Request into the ecosystem repo to add or update the information.

The data for tools lives in a single file in this repository, and will be duplicated out to the website repository and the landscape repository when modified. (You can opt-out of appearing in the landscape diagram if you wish, by setting `landscape > optOut` to `true`. This will mean the tool will only appear on the website.)

The Pull Request will be reviewed by the JSON Schema team. If we need to ask for changes to your data file, we will do so by raising an Issue in the originating repository.

When we receive and accept Maintainer-Provided data for a tool or library, we will remove the entry from the Community-Contributed Legacy data.

## Tooling categories definitions

The `toolingType` field defines the category or type of tool, which enables filtering by end users on the website. Here's an explanation of what each category means. If you're unsure what categories your tool fits into, please reach out to us on [Slack](https://json-schema.org/slack) or raise an Issue on GitHub.

<details>
<summary>View Category Definitions</summary>

<table>
<thead><tr><th>Value</th><th>Definition</th><tr></thead>
<tr><td>"validator"</td><td>A library which itself directly validates JSON data using a JSON Schema, providing an assertion result.</td></tr>
<tr><td>"hyper-schema"</td><td>A library which provides utility and processing in relation to JSON Hyper Schema.</td></tr>
<tr><td>"benchmarks"</td><td>A tool which performs benchmarking of JSON Schema tooling.</td></tr>
<tr><td>"LDO-utility"</td><td>A library which provides utility in relation to Link Description Objects found in JSON Hyper Schema.</td></tr>
<tr><td>"code-to-schema"</td><td>A tool or library which enables the creation of a JSON Schema from existing <b>code</b>.</td></tr>
<tr><td>"data-to-schema"</td><td>A tool or library which enables the creation of a JSON Schema from existing <b>data</b>.</td></tr>
<tr><td>"model-to-schema"</td><td>A tool or library which enables the creation of a JSON Schema from existing <b>models</b>.</td></tr>
<tr><td>"schema-to-types"</td><td>A tool or library which enables the creation of <b>types</b> from a JSON Schema.</td></tr>
<tr><td>"schema-to-code"</td><td>A tool or library which enables the creation of <b>code</b> from a JSON Schema.</td></tr>
<tr><td>"schema-to-web-UI"</td><td>A tool or library which enables the creation of <b>Web UI (such as forms)</b> from a JSON Schema.</td></tr>
<tr><td>"schema-to-data"</td><td>A tool or library which enables the creation of <b>data</b> from a JSON Schema.</td></tr>
<tr><td>"util-general-processing"</td><td>A library or tool which makes processing and using JSON Schema easier.</td></tr>
<tr><td>"util-schema-to-schema"</td><td>A library or tool which enables or provides utilities to assist with Schema to Schema transformations.</td></tr>
<tr><td>"util-draft-migration"</td><td>A library or tool which enables or provides utilities to assist with JSON Schema version/draft migration.</td></tr>
<tr><td>"util-format-conversion"</td><td>A library or tool which enables or provides utilities to assist with converting from a format to or from JSON Schema.</td></tr>
<tr><td>"util-testing"</td><td>A library or tool which enables or provides utilities to assist with utilizing JSON Schema with tests.</td></tr>
<tr><td>"editor"</td><td>A tool which allows you to create and edit JSON documents with specific support for authoring and editing JSON Schema documents.</td></tr>
<tr><td>"editor-plugins"</td><td>Plugins for editors which augment the use of JSON Schema within an editor.</td></tr>
<tr><td>"schema-to-documentation"</td><td>A tool or library which enables the creation of <b>documentation</b> from a JSON Schema.</td></tr>
<tr><td>"schema-repository"</td><td>A collection of Schemas. This may not be an example of best use, nor does it signal endorsement.</td></tr>
<tr><td>"linter"</td><td>A tool or library which provides the ability for rule based validation of JSON Schemas.</td></tr>
<tr><td>"linter-plugins"</td><td>Plugins for other linter based tooling which enables rule based validation of JSON Schemas.</td></tr>
</table>

</details>

## My tool or library is already on the website or landscape diagram, but I haven't added the file. Where did that come from?

Over the years many people have added to the list of "implementations" or tools on the JSON Schema website. We are using the data from the website repository as the basis for the initial data in this repository in relation to details of a tool or library.

## The data shown on the site or the landscape diagram is different to the data I provided in the repository. What's happening?

We reserve the right to override and/or augment any aspect of the provided data where we feel it is the right thing to do for whatever reason. We will do so by using another file in this repository which will contain only overriding data, which will take precedence.

## I created the required file but it's not showing up! What's happening?

We understand it may be frustrating, but we are here to help!

First, check the data is valid according to the JSON Schema.

Second, check the provided source URL matches the the repository location. If it doesn't, we may assume your repository is a fork which isn't intended to be an alternative to the forked project, to avoid duplicate entries.

Otherwise (or if you're not sure how to resolve the problems above), please reach out to us on [Slack](https://json-schema.org/slack) or raise an Issue on GitHub. We would love to hear from you!