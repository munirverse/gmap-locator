const path = require('path');
const { exec } = require('child_process');

describe('test bin/index.js', () => {
  it('should print error when no arguments provided', async () => {
    // Given
    const expectedMessage =
      'should provide arguments, see: `npx gmap-locator -h`';

    // When
    const command = exec(
      `node ${path.resolve(__dirname, '../../bin/index.js')}`
    );
    const getCommandOutput = (child) =>
      new Promise((resolve) =>
        child.stderr.on('data', (data) => resolve(data.toString().trim()))
      );
    const output = await getCommandOutput(command);

    // Then
    expect(output).toBe(expectedMessage);
  });

  it('should print help message', async () => {
    // Given
    const HELP_MESSAGE_LITERAL = `Usage: npx gmap-locator [arguments]
Example: npx gmap-locator -i test.csv -o output.csv
Arguments:
    -h      print help command and list of arguments
    -i      filepath and filename of input files
    -o      filepath and filename of output files`;

    // When
    const command = exec(
      `node ${path.resolve(__dirname, '../../bin/index.js')} -h`
    );
    const getOutputCommand = (child) =>
      new Promise((resolve) =>
        child.stdout.on('data', (data) => resolve(data.toString().trim()))
      );
    const output = await getOutputCommand(command);

    // Then
    expect(output).toBe(HELP_MESSAGE_LITERAL);
  });
});
