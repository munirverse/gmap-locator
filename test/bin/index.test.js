const path = require('path');
const { exec } = require('child_process');

describe('test bin/index.js', () => {
  it('should print error when no arguments provided', async () => {
    // Given
    const expectedMessage = 'should provide arguments, see: `gmap-locator -h`';

    // When
    const command = exec(`node ${path.resolve(__dirname, '../../bin/index.js')}`);
    const getCommandOutput = (child) =>
      new Promise((resolve) => child.stderr.on('data', (data) => resolve(data.toString().trim())));
    const output = await getCommandOutput(command);

    // Then
    expect(output).toBe(expectedMessage);
  });

  it('should print error when include non valid arguments', async () => {
    // Given
    const expectedMessage = 'arguments not valid, see: `gmap-locator -h`';

    // When
    const command = exec(`node ${path.resolve(__dirname, '../../bin/index.js')} -h -z`);
    const getCommandOutput = (child) =>
      new Promise((resolve) => child.stderr.on('data', (data) => resolve(data.toString().trim())));
    const output = await getCommandOutput(command);

    // Then
    expect(output).toBe(expectedMessage);
  });

  it('should print help message', async () => {
    // Given
    const HELP_MESSAGE_LITERAL = `Usage: gmap-locator [INPUT_ARGUMENTS] [INPUT_FILEPATH] [OUTPUT_ARGUMENTS] [OUTPUT_FILEPATH]
Example: gmap-locator -i countries.csv -o output.csv
Arguments:
    -h      print help command and list of arguments
    -i      filepath and filename of input files
    -o      filepath and filename of output files`;

    // When
    const command = exec(`node ${path.resolve(__dirname, '../../bin/index.js')} -h`);
    const getOutputCommand = (child) =>
      new Promise((resolve) => child.stdout.on('data', (data) => resolve(data.toString().trim())));
    const output = await getOutputCommand(command);

    // Then
    expect(output).toBe(HELP_MESSAGE_LITERAL);
  });

  it('should print error when include not allowed format as input files', async () => {
    // Given
    const expectedMessage = 'input files have not allowed format';

    // When
    const command = exec(`node ${path.resolve(__dirname, '../../bin/index.js')} -i test.doc`);
    const getOutputCommand = (child) =>
      new Promise((resolve) => child.stderr.on('data', (data) => resolve(data.toString().trim())));
    const output = await getOutputCommand(command);

    // Then
    expect(output).toBe(expectedMessage);
  });

  it('should print error when include not existing input files', async () => {
    // Given
    const expectedMessage = 'input files not exists';

    // When
    const command = exec(`node ${path.resolve(__dirname, '../../bin/index.js')} -i testing.json`);
    const getOutputCommand = (child) =>
      new Promise((resolve) => child.stderr.on('data', (data) => resolve(data.toString().trim())));
    const output = await getOutputCommand(command);

    // Then
    expect(output).toBe(expectedMessage);
  });

  it('should print error when not provide output arguments', async () => {
    // Given
    const expectedMessage = 'output destination not provided';

    // When
    const command = exec(
      `node ${path.resolve(__dirname, '../../bin/index.js')} -i ${path.resolve(
        __dirname,
        '../fixtures/example.csv'
      )}`
    );
    const getOutputCommand = (child) =>
      new Promise((resolve) => child.stderr.on('data', (data) => resolve(data.toString().trim())));
    const output = await getOutputCommand(command);

    // Then
    expect(output).toBe(expectedMessage);
  });

  it('should print error when include not allowed format as output files', async () => {
    // Given
    const expectedMessage = 'output files have not allowed format';

    // When
    const command = exec(
      `node ${path.resolve(__dirname, '../../bin/index.js')} -i ${path.resolve(
        __dirname,
        '../fixtures/example.csv'
      )} -o test.txt`
    );
    const getOutputCommand = (child) =>
      new Promise((resolve) => child.stderr.on('data', (data) => resolve(data.toString().trim())));
    const output = await getOutputCommand(command);

    // Then
    expect(output).toBe(expectedMessage);
  });
});
