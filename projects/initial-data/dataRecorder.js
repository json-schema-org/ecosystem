import fs from 'fs';

export class DataRecorder {
  constructor(fileName) {
    this.fileName = fileName;
    this.#createFile();
  }

  #createFile() {
    if (!fs.existsSync(this.fileName)) {
      fs.writeFileSync(
        this.fileName,
        'repo,repo_topics,creation,archive_url_creation,topic_present_creation,release,archive_url_release,topic_present_release\n',
        'utf8',
      );
    }
  }

  appendToCSV(data) {
    console.log(`Appending data to CSV: ${data}`);
    const csvLine = `${data.join(',')}\n`;
    fs.appendFileSync(this.fileName, csvLine, 'utf8');
  }
}
