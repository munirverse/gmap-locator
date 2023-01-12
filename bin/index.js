const helper = require('../src/helper');

const ALLOWED_ARGS = {
  '-h': 'boolean',
  '-i': 'string',
  '-o': 'string'
};

const HELP_MESSAGE_LITERAL = `
Usage: npx gmap-locator [arguments]
Example: npx gmap-locator -i test.csv -o output.csv
Arguments:
    -h      print help command and list of arguments
    -i      filepath and filename of input files
    -o      filepath and filename of output files`;

const main = () => {
  const args = helper.extraArgs(process.argv);
  if (!args) {
    console.error('should provide arguments, see: `npx gmap-locator -h`');
    process.exit(1);
  }
  const validArgs = helper.validateArgs(args, ALLOWED_ARGS);
  if (!validArgs) {
    console.error('arguments not valid, see: `npx gmap-locator -h`');
    process.exit(1);
  }
  if (args['-h']) {
    console.log(HELP_MESSAGE_LITERAL);
    process.exit(0);
  }
};

main();
