import {
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  unlink,
  writeFile,
} from "fs/promises";
import { join } from "path";
import { v4 as uuid } from "uuid";

export class DirDb {
  protected dirPath: string;
  constructor(dirPath: string) {
    this.dirPath = dirPath;
  }

  public async ensurePath(): Promise<boolean> {
    return await stat(this.dirPath)
      .then(() => true)
      .catch(async (e) => {
        return await mkdir(this.dirPath, { recursive: true }).then(() => true);
      });
  }

  public async get<T = any>(id: string): Promise<T | undefined> {
    await this.ensurePath();
    return await readFile(join(this.dirPath, id), { encoding: "utf8" })
      .then((text) => JSON.parse(text) as T)
      .catch((e) => undefined);
  }

  public async save(obj: object): Promise<object> {
    await this.ensurePath();
    const _id = uuid();
    const savingObj = {
      _id,
      ...obj,
    };
    const filePath = join(this.dirPath, savingObj._id);
    return await writeFile(filePath, JSON.stringify(savingObj), {
      encoding: "utf8",
    }).then(() => savingObj);
  }

  public async remove(id: string): Promise<boolean> {
    await this.ensurePath();
    const filePath = join(this.dirPath, id);
    return await unlink(filePath)
      .then(() => true)
      .catch(() => false);
  }

  public async getIds(): Promise<string[]> {
    await this.ensurePath();
    return await readdir(this.dirPath, { withFileTypes: true }).then((files) =>
      files.filter((file) => file.isFile()).map(({ name }) => name)
    );
  }

  public async drop(): Promise<boolean> {
    return await rm(this.dirPath, { recursive: true })
      .then(() => true)
      .catch(() => false);
  }
}
