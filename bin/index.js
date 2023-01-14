#!/usr/bin/env node
/* eslint-disable */
const fs = require('fs');
const path = require('path');
const helper = require('../src/helper');
const converter = require('../src/converter');
const scraper = require('../src/scraper');

const ALLOWED_ARGS = {
  '-h': 'boolean',
  '-i': 'string',
  '-o': 'string',
  '-c': 'boolean'
};

const ALLOWED_FORMAT = ['csv', 'json'];

const HELP_MESSAGE_LITERAL = `Usage: gmap-locator [INPUT_ARGUMENTS] [INPUT_FILEPATH] [OUTPUT_ARGUMENTS] [OUTPUT_FILEPATH]
Example: gmap-locator -i countries.csv -o output.csv
Arguments:
    -h      print help command and list of arguments
    -i      filepath and filename of input files
    -o      filepath and filename of output files`;

const main = async () => {
  let dataInput = null;

  const args = helper.extraArgs(process.argv);
  if (!args) {
    console.error('should provide arguments, see: `gmap-locator -h`');
    process.exit(1);
  }

  const validArgs = helper.validateArgs(args, ALLOWED_ARGS);
  if (!validArgs) {
    console.error('arguments not valid, see: `gmap-locator -h`');
    process.exit(1);
  }

  if (args?.['-h']) {
    console.log(HELP_MESSAGE_LITERAL);
    process.exit(0);
  }

  if (args?.['-i']) {
    console.log('load input...');

    const formatInput = args['-i'].split('.')[1].toLowerCase();
    if (!ALLOWED_FORMAT.includes(formatInput)) {
      console.error('input files have not allowed format');
      process.exit(1);
    }

    if (!fs.existsSync(path.resolve(args['-i']))) {
      console.error('input files not exists');
      process.exit(1);
    }

    if (formatInput === 'csv')
      dataInput = helper.loadCSV(fs.readFileSync(path.resolve(args['-i'])));

    if (formatInput === 'json')
      dataInput = helper.loadJSON(fs.readFileSync(path.resolve(args['-i'])));

    dataInput = dataInput.map((rows) => rows.map((columns) => converter(columns)));

    console.log('input sucessfully loaded');
  }

  if (!args?.['-o']) {
    console.error('output destination not provided');
    process.exit(1);
  }

  const formatOuput = args['-o'].split('.')[1].toLowerCase();
  if (!ALLOWED_FORMAT.includes(formatOuput)) {
    console.error('output files have not allowed format');
    process.exit(1);
  }

  if (dataInput?.length) {
    const tempOutput = [];

    console.time('scraper time:');

    for (const row of dataInput)
      for (const column of row) {
        const isArray = typeof column === 'object' && column?.length;

        console.log(`scraping ${isArray ? column[1] : column}...`);
        const scraperResult = await scraper(isArray ? column[1] : column);
        tempOutput.push(
          isArray
            ? {
                field_original: column[0],
                field_converted: column[1],
                url: scraperResult?.url,
                lat: scraperResult?.lat,
                lng: scraperResult?.lng
              }
            : {
                field_original: column,
                field_converted: null,
                url: scraperResult?.url,
                lat: scraperResult?.lat,
                lng: scraperResult?.lng
              }
        );
      }

    if (formatOuput == 'csv') helper.writeCSV(tempOutput, path.resolve(args['-o']));
    if (formatOuput == 'json') helper.writeJSON(tempOutput, path.resolve(args['-o']));
  }

  console.timeEnd('scraper time:');
  process.exit(0);
};

main();
