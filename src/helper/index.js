const isExistsAndNotMatch = (itemArr) => (itemArr && !/^-\w+$/.test(itemArr) ? itemArr : true);

const reduceArgs = (prev, curr, i, arr) =>
  /^-\w+$/.test(curr) ? { ...prev, [curr]: isExistsAndNotMatch(arr[i + 1]) } : prev;

const extraArgs = (argv) => (argv?.length > 2 ? argv.slice(2).reduce(reduceArgs, {}) : null);

const validateArgs = (args, allowedArgs) =>
  Object.entries(args).every(
    (item) => allowedArgs?.[item[0]] && typeof item[1] === allowedArgs?.[item[0]]
  );

const loadCSV = (bufferCSV, delimiter = ',') =>
  bufferCSV
    .toString()
    .split('\n')
    .reduce(
      (prev, curr, i) =>
        i ? [...prev, curr.split(delimiter).map((item) => parseInt(item) || item)] : prev,
      []
    );

const loadJSON = (bufferJSON) =>
  JSON.parse(bufferJSON.toString()).map((item) => Object.values(item));

module.exports = { extraArgs, validateArgs, loadCSV, loadJSON };
