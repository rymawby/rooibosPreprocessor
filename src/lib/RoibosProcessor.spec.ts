import * as chai from 'chai';
import * as fs from 'fs-extra';

import { expect } from 'chai';

import ProjectProcessor from './RooibosProcessor';

const chaiSubset = require('chai-subset');
let dircompare = require('dir-compare');

chai.use(chaiSubset);
let processor: ProjectProcessor;
let sourcePath = 'src/test/stubProject';
let testsPath = 'build/source/tests/specs';
let alternateTestsPath = 'build/components/tests/specs';
let rootPath = 'build/source';
let outputPath = 'build/source/tests/framework';
let targetPath = 'build';

function clearFiles() {
  fs.removeSync(targetPath);
}

function copyFiles() {
  try {
    fs.copySync(sourcePath, targetPath);
  } catch (err) {
    console.error(err);
  }
}

describe('RooibosProcessor tests', function() {
  beforeEach(() => {
    clearFiles();
    copyFiles();
    processor = new ProjectProcessor(testsPath, rootPath, outputPath);
  });

  describe('Initialization', function() {
    it('correctly sets source paths and config', function() {
      expect(processor.testsPath).to.equal(testsPath);
    });
  });

  describe('Process files valid test', function() {
    it('tests file creation', () => {
      processor.processFiles();
    });
  });

  describe('Accepting multiple locations for tests', function() {
    it('should be an array with original param if string contains no commas', () => {
      let expectedResult: string[] = [testsPath] 
      
      let createdTestPaths = processor.createPathsList(testsPath)

      expect(createdTestPaths).to.eql(expectedResult)
    });

    it('should be an array containing both comma seperated items', () => {
      let concattedPaths: string = testsPath + "," + alternateTestsPath
      let expectedResult: string[] = [testsPath, alternateTestsPath] 

      let createdTestPaths = processor.createPathsList(concattedPaths)

      expect(createdTestPaths).to.eql(expectedResult)
    });

    it('should handle spaces in comma separated string', () => {
      let concattedPaths: string = testsPath + ", " + alternateTestsPath
      let expectedResult: string[] = [testsPath, alternateTestsPath] 

      let createdTestPaths = processor.createPathsList(concattedPaths)

      expect(createdTestPaths).to.eql(expectedResult)      
    });

    it('should handle multiple spaces in comma separated string', () => {
      let concattedPaths: string = testsPath + ", " + alternateTestsPath
      let expectedResult: string[] = [testsPath, alternateTestsPath] 

      let createdTestPaths = processor.createPathsList(concattedPaths)

      expect(createdTestPaths).to.eql(expectedResult)      
    });
  });
});
