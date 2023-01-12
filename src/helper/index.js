const isExistsAndNotIncude = (itemArr, chars) =>
  itemArr && !itemArr?.includes(chars) ? itemArr : true;

const reduceArgs = (prev, curr, i, arr) =>
  curr.includes('-')
    ? { ...prev, [curr]: isExistsAndNotIncude(arr[i + 1], '-') }
    : prev;

const extraArgs = (argv) =>
  argv?.length > 2 ? argv.slice(2).reduce(reduceArgs, {}) : null;

const validateArgs = (args, allowedArgs) =>
  Object.entries(args).every(
    (item) =>
      allowedArgs?.[item[0]] && typeof item[1] === allowedArgs?.[item[0]]
  );

module.exports = { extraArgs, validateArgs };
