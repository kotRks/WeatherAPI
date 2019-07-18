const cypress = require('cypress');
const fse = require('fs-extra');
const { merge } = require('mochawesome-merge');

async function runTests() {
    await fse.remove('mochawesome-report');
    const { totalFailed } = await cypress.run();
    const jsonReport = await merge();
    process.exit(totalFailed);
}

runTests();
