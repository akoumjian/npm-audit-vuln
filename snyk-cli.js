#!/usr/bin/env node
const { exec } = require("child_process");
const path = require("path");
const patchSnyk = require("./patch-snyk.js");

/**
 * Patches the `snyk` command and then runs original
 */
exec("which -a node", (err, stdout, stderr) => {
  const nodeLocation = String(stdout).trim();
  const snykCliLocation = path.join(
    nodeLocation,
    "../../lib/node_modules/snyk/dist/cli/index.js"
  );
  patchSnyk(nodeLocation);
  require(snykCliLocation);
});
