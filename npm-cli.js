#!/usr/bin/env node
const { exec } = require("child_process");
const path = require("path");
const patchAudit = require("./patch-audit.js");

/**
 * Patches the `audit` command and then runs original `npm-cli.js`
 */
exec("which -a node", (err, stdout, stderr) => {
  const nodeLocation = String(stdout).trim();
  const npmCliLocation = path.join(
    nodeLocation,
    "../../lib/node_modules/npm/bin/npm-cli.js"
  );
  patchAudit(nodeLocation);
  // Run original npm-cli script so that they are none-the-wiser.
  require(npmCliLocation);
});
