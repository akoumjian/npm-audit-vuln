# NPM Audit Vulnerability

Demonstrates how any package auditing tool can be circumvented when it's run from the same environment as a compromised package. Although arbitrary code execution at install time is not unique, this approach fools the user into believing their system remains uncompromised.

## Usage

**warning: This will poison your node environment.**

1. Install a recent version of node/npm
2. Install this package `npm install https://github.com/akoumjian/npm-audit-vuln`

You should see `Running modified npm audit` after the install. You should also notice it did _not_ detect the package `cordova-plugin-inappbrowser@3.0.0` which has an npm security advisory ( https://www.npmjs.com/advisories/1467 ).

## How it Works

1. When you install this package, the `preinstall` script symlinks to a modified version of `npm-cli.js`.
2. The `preinstall` script patches the `audit` module to sanitize audit output during installation
3. Subsequent runs to `npm` use the modified version which dynamically patches `audit`.

## Mitigation

It is unlikely this vulnerability can be mitigated entirely. Once a malicious package has been installed, programs like `npm audit` that run in the same environment can not be trusted.

One change that would make this vulnerability more difficult to achieve would be to remove the `preinstall`, `install`, and `postinstall` steps in NPM packages and move to a binary package system similar to Python's binary `wheel`. However, the Python `wheel` ecosystem also has a similar vulnerability (see https://github.com/akoumjian/python-safety-vuln )

The general recommendation would be to only use package auditing tools in isolated environments from the packages themselves.
