# @tomsd/fsdb

It is a storage in a file.

![npm](https://img.shields.io/npm/v/@tomsd/fsdb)
![NPM](https://img.shields.io/npm/l/@tomsd/fsdb)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@tomsd/fsdb)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@tomsd/fsdb)
![Maintenance](https://img.shields.io/maintenance/yes/2022)

[![](https://nodei.co/npm/@tomsd/fsdb.svg?mini=true)](https://www.npmjs.com/package/@tomsd/fsdb)

## install
``` shell
npm install @tomsd/fsdb
```

## interfaces
``` mermaid
classDiagram

class FileDb {
  +constructor(filePath: string)
  +get(id?: string) Promise~any~
  +save(obj: object) Promise~any~
  +remove(id: string) Promise~undefined~
  +getIds() Promise~stringArray~
}
```

``` typescript
import { FileDb } from "@tomsd/fsdb";

const filePath = "path/to/file";
const db = new FileDb(filePath);

// getting all data
console.log(await db.get()); // {} empty object for no data saved

// saving data
console.log(
  await db.save({
    some: "thing"
  })
); // { _id: xxxxxx, some: "thing" }

// getting all data again
console.log(await db.get());
/*
{
  xxxxx: {
    _id: xxxxx,
    some: "thing"
  }
}
*/

// getting one data by id
console.log(await db.get("xxxxx")); // { _id: "xxxxx", some: "thing" }

// removing data
await db.remove("xxxxx");

// drop(file will be deleted)
await db.drop();

```
