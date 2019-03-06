#!/usr/bin/env node
import RooibosProcessor from './lib/RooibosProcessor';
const program = require('commander');
const pkg = require('../package.json');
const path = require('path');

program
  .version(pkg.version)
  .description('Rooibos Preprocessor');

program
.option('-c, --config [path]', 'Specify a config file to use.')
.option('-t, --testDir [path]', 'Path to test spec directory.')
.option('-r, --rootDir [path]', 'Path to root directory.')
.option('-o, --outputDir [path]', 'Path to output directory. This is where the test map file will be written to.')
.description(`
  processes a brightscript SceneGraph project and creates json data structures
  which can be used by the rooibos unit testing framework, or vsCode IDE
  HAPPY TESTING :)
`)
.action((options) => {
  console.log(`Processing....`);
  console.time('Finished in:');
  let conf;

  if (options.config) {
    conf = require(path.resolve(process.cwd(), options.config));
  } else if (options.testDir) {
    conf = {
      testDir: options.testDir,
      rootDir: options.rootDir || '',
      outputDir: options.outputDir || options.testDir
    };
  } else {
    console.warn('You must specify either a config file or a test spec directory');
  }

  let processor = new RooibosProcessor(conf.testDir, conf.rootDir, conf.outputDir);
  processor.processFiles();

  console.timeEnd('Finished in:');
});

program.parse(process.argv);
