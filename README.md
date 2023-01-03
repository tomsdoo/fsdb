# @tomsd/fsdb

It's a data handler that a file is as the store.  
See [fsdb.netlify.app](https://fsdb.netlify.app/) also.

![npm](https://img.shields.io/npm/v/@tomsd/fsdb)
![NPM](https://img.shields.io/npm/l/@tomsd/fsdb)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@tomsd/fsdb)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@tomsd/fsdb)
![Maintenance](https://img.shields.io/maintenance/yes/2023)

## Installation

``` shell
npm install @tomsd/fsdb
```

## Usage

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

``` typescript
import { DirDb } from "@tomsd/fsdb";

const dirPath = "path/to/directory";
const db = new DirDb(dirPath);

// getting all ids
console.log(await db.getIds()); // []

// saving an item
console.log(
  await db.save({
    message: "test"
  })
); // { _id: "xxx", message: "test" }

// fetching an item
console.log(
  await db.get("xxx")
); // { _id: "xxx", message: "test" }

// deleting an item
console.log(
  await db.remove("xxx")
) // true

// drop(directory will be deleted)
console.log(
  await db.drop()
); // true
```
