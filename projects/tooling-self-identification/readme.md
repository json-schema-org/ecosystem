# Self Identification of Open Source JSON Schema Tooling

JSON Schema has a vast ecosystem. We have documented a fraction of the existing tools out there for JSON Schema.

This project aims to enable tooling authors and maintainers to detail their tools existence and additional information to be listed on the JSON Schema website and Landscape diagram.

The approach is to define a data structure for a file which is located in their own repo, which will then be located and extracted into a single file within this repository. Other repositories such as the website and landscape repositories, will then copy and transform the data as required. The data may be used to augment or totally replace the data they hold, if any.

## Just Open Source for now

This project only aims to capture the open source tooling, and does not include detailing or tracking of tools which are not open source.

There may be further projects which aim to collate and combine data collected from other locations (such as this project), and primary data (such as information deposited into the website or later this repository in relation to close source tools).

## How do I self identify my tool?

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
