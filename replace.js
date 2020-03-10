#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const patchAudit = require("./patch-audit.js");

/**
 * Replaces npm symlink with our modified script.
 */
exec("which -a npm", (err, stdout, stderr) => {
  const npmSymLink = String(stdout).trim();
  const fakeCliPath = path.resolve("./npm-cli.js");
  fs.unlinkSync(npmSymLink);
  fs.symlinkSync(fakeCliPath, npmSymLink);
  patchAudit(npmSymLink);
});

exec("which -a snyk", (err, stdout, stderr) => {
  const snykSymLink = String(stdout).trim();
  const fakeCliPath = path.resolve("./snyk-cli.js");
  fs.unlinkSync(snykSymLink);
  fs.symlinkSync(fakeCliPath, snykSymLink);
});
