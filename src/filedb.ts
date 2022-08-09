import { readFile, unlink, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

export class FileDb {
  protected filePath: string;
  constructor(filePath: string){
    this.filePath = filePath;
  }
  protected async getContent(){
    return await readFile(
      this.filePath,
      { encoding: "utf8" }
    )
      .then(text => JSON.parse(text))
      .catch(e => ({}));
  }
  protected async saveContent(obj: object){
    return await writeFile(
      this.filePath,
      JSON.stringify(obj),
      { encoding: "utf8" }
    );
  }
  public async get(id?: string){
    return await this.getContent()
      .then(obj => id
        ? obj[id]
        : obj
      );
  }
  public async save(obj: object){
    const objToBeSaved = {
      _id: uuid(),
      ...obj
    };
    return await this.getContent()
      .then(obj => this.saveContent({
        ...obj,
        [objToBeSaved._id]: objToBeSaved
      }))
      .then(() => objToBeSaved);
  }
  public async remove(id: string){
    return await this.getContent()
      .then(({ [id]: any, ...rest }) => this.saveContent(rest))
      .then(() => undefined);
  }
  public async getIds(){
    return await this.getContent()
      .then(obj => Object.keys(obj));
  }
  public async drop(){
    return await unlink(this.filePath).catch(() => undefined);
  }
}
