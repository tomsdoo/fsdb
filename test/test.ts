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
});
