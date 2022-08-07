import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { FileDb } from "../src/";
import { v4 as uuid } from "uuid";
import { join } from "path";
import { tmpdir } from "os";

describe("FileDb", () => {
  let fileDb: FileDb;

  before(() => {
    const filePath = join(tmpdir(), uuid());
    fileDb = new FileDb(filePath);
  });

  after(async () => {
    await fileDb.drop();
  });

  it("value after initializing is empty object", async () => {
    assert.equal(
      await fileDb.get()
        .then(obj => JSON.stringify(obj)),
      JSON.stringify({})
    );
  });

  it("value of item that does not exist is undefined", async () => {
    assert.equal(
      await fileDb.get(uuid()),
      undefined
    );
  });

  it("save() new item", async () => {
    const savingObj = {
      testValue: uuid()
    };
    assert.equal(
      await fileDb.save(savingObj)
        .then(({ _id, ...rest }) => JSON.stringify(rest)),
      JSON.stringify(savingObj)
    );
  });

  it("save() update item", async () => {
    const savingObj = {
      testValue: "value before updating"
    };

    const saved = await fileDb.save(savingObj);
    await fileDb.save({
      ...saved,
      testValue: "value after updating"
    });

    assert.equal(
      await fileDb.get(saved._id)
        .then(({ testValue }) => testValue),
      "value after updating"
    );
  });
});
