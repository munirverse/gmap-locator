const path = require('path');
const fs = require('fs');
const helper = require('../../../src/helper');

describe('test helper module', () => {
  it('test function extraArgs', () => {
    // Given
    const exampleArgs = [null, null, '-h'];
    const exampleArgs2 = [null, null, '-i', 'test.csv', '-o', 'output.csv'];
    const exampleArgs3 = [null, null, '-h', '-i', 'test.csv', '-o', 'output.csv'];
    const exampleArgs4 = [null, null, '-i', './test-folder/test.csv'];

    // When
    const args = helper.extraArgs(exampleArgs);
    const args2 = helper.extraArgs(exampleArgs2);
    const args3 = helper.extraArgs(exampleArgs3);
    const args4 = helper.extraArgs(exampleArgs4);

    // Then
    expect(args).toMatchObject({ '-h': true });
    expect(args2).toMatchObject({ '-i': 'test.csv', '-o': 'output.csv' });
    expect(args3).toMatchObject({
      '-h': true,
      '-i': 'test.csv',
      '-o': 'output.csv'
    });
    expect(args4).toMatchObject({ '-i': './test-folder/test.csv' });
  });

  it('test function validateArgs', () => {
    // Given
    const allowedArgs = { '-i': 'string', '-o': 'string', '-h': 'boolean' };
    const exampleArgs = { '-h': true, '-i': 'test.csv', '-o': 'output.csv' };
    const exampleArgs2 = { '-h': 'test', '-i': true, '-o': 2 };
    const exampleArgs3 = { '-z': true };
    const exampleArgs4 = {
      '-h': true,
      '-i': 'test.csv',
      '-o': 'output.csv',
      '-z': true
    };

    // When
    const result = helper.validateArgs(exampleArgs, allowedArgs);
    const result2 = helper.validateArgs(exampleArgs2, allowedArgs);
    const result3 = helper.validateArgs(exampleArgs3, allowedArgs);
    const result4 = helper.validateArgs(exampleArgs4, allowedArgs);

    // Then
    expect(result).toBe(true);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
  });

  it('test function loadCSV and loadJSON', () => {
    // Given
    const expectedResult = [
      ['Indonesia', 'Jl. Jend. Sudirman'],
      ['SG', 'Bartley Rd East'],
      ['PH', 'Pedro Gil St']
    ];
    const exampleCSV = fs.readFileSync(path.resolve(__dirname, '../../fixtures/example.csv'));
    const exampleJSON = fs.readFileSync(path.resolve(__dirname, '../../fixtures/example.json'));

    // When
    const csv = helper.loadCSV(exampleCSV);
    const json = helper.loadJSON(exampleJSON);

    // Then
    expect(csv).toMatchObject(expectedResult);
    expect(json).toMatchObject(expectedResult);
  });

  it('test function writeJSON and writeCSV', () => {
    // Given
    const exampleData = [
      { fields_original: 'EG', fields_converted: 'Egypt', data_url: false, lat: false, lng: false }
    ];
    const exampleCSVData =
      'fields_original,fields_converted,data_url,lat,lng\nEG,Egypt,false,false,false';

    // When
    helper.writeCSV(exampleData, path.resolve(__dirname, '../../fixtures/test.csv'));
    helper.writeJSON(exampleData, path.resolve(__dirname, '../../fixtures/test.json'));

    // Then
    expect(fs.existsSync(path.resolve(__dirname, '../../fixtures/test.csv'))).toBe(true);
    expect(fs.existsSync(path.resolve(__dirname, '../../fixtures/test.json'))).toBe(true);
    expect(fs.readFileSync(path.resolve(__dirname, '../../fixtures/test.json')).toString()).toBe(
      JSON.stringify(exampleData)
    );
    expect(fs.readFileSync(path.resolve(__dirname, '../../fixtures/test.csv')).toString()).toBe(
      exampleCSVData
    );
  });

  afterAll(() => {
    fs.rmSync(path.resolve(__dirname, '../../fixtures/test.csv'), { force: true });
    fs.rmSync(path.resolve(__dirname, '../../fixtures/test.json'), { force: true });
  });
});
