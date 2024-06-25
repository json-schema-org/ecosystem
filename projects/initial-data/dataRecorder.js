import fs from 'fs';

export class DataRecorder {
  constructor(fileName, columns = []) {
    this.fileName = fileName;
    this.columns = columns;
    this.#createFile();
  }

  #createFile() {
    if (!fs.existsSync(this.fileName)) {
      const headerLine = `${this.columns.join(',')}\n`;
      fs.writeFileSync(this.fileName, headerLine, 'utf8');
    }
  }

  appendToCSV(data) {
    const csvLine = `${data.join(',')}\n`;
    fs.appendFileSync(this.fileName, csvLine, 'utf8');
  }
}
