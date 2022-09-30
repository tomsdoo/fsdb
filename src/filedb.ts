import { readFile, unlink, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

export class FileDb {
  protected filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  protected async getContent(): Promise<any> {
    return await readFile(this.filePath, { encoding: "utf8" })
      .then((text) => JSON.parse(text))
      .catch((e) => ({}));
  }

  protected async saveContent(obj: object): Promise<any> {
    return await writeFile(this.filePath, JSON.stringify(obj), {
      encoding: "utf8",
    });
  }

  public async get(id?: string): Promise<any> {
    return await this.getContent().then((obj) => (id != null ? obj[id] : obj));
  }

  public async save(obj: object): Promise<any> {
    const objToBeSaved = {
      _id: uuid(),
      ...obj,
    };
    return await this.getContent()
      .then(async (obj) =>
        await this.saveContent({
          ...obj,
          [objToBeSaved._id]: objToBeSaved,
        })
      )
      .then(() => objToBeSaved);
  }

  public async remove(id: string): Promise<undefined> {
    return await this.getContent()
      .then(async ({ [id]: any, ...rest }) => await this.saveContent(rest))
      .then(() => undefined);
  }

  public async getIds(): Promise<string[]> {
    return await this.getContent().then((obj) => Object.keys(obj));
  }

  public async drop(): Promise<any> {
    return await unlink(this.filePath).catch(() => undefined);
  }
}
