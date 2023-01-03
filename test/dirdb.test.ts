import { before, after, describe, it } from "mocha";
import { strict as assert } from "assert";

import { DirDb } from "../src/";
import { v4 as uuid } from "uuid";
import { join } from "path";
import { tmpdir } from "os";

describe("DirDb", () => {
  let dirDb: DirDb;

  before(() => {
    const dirPath = join(tmpdir(), uuid());
    dirDb = new DirDb(dirPath);
  });

  after(async () => {
    await dirDb.drop();
  });

  it("value is undefined if id doesn't exist", async () => {
    assert.equal(await dirDb.get("dummyId"), undefined);
  });

  it("save() and get()", async () => {
    const savedObject = await dirDb.save({
      message: "test",
    });
    assert.equal((savedObject as any).message, "test");
    assert.equal(
      await dirDb.get((savedObject as any)._id).then(({ message }) => message),
      "test"
    );
  });

  it("getIds()", async () => {
    assert.equal(await dirDb.getIds().then((ids) => ids.length), 1);
  });

  it("remove()", async () => {
    const ids = await dirDb.getIds();
    for (const id of ids) {
      assert.equal(await dirDb.remove(id), true);
    }
    assert.equal(await dirDb.getIds().then((ids) => ids.length), 0);
  });
});
