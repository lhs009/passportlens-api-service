"use strict";

// tests for decryptCode
// Generated by serverless-mocha-plugin

const mochaPlugin = require("serverless-mocha");
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper(
  "decryptCode",
  "../../../src/functions/decryptCode.js",
  "decryptCode"
);

describe("decryptCode", () => {
  before((done) => {
    done();
  });

  it("implement tests here", async () => {
    const response = await wrapped.run({});
    expect(response).to.not.be.empty;
  });
});