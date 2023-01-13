const regionConverter = (txt) => {
  try {
    const regionName = new Intl.DisplayNames(['en'], { type: 'region' });
    return txt ? [txt, regionName.of(txt.toUpperCase())] : txt;
  } catch (_) {
    return txt;
  }
};

module.exports = (item) => {
  if (typeof item === 'string' && !parseInt(item)) return regionConverter(item);
  return item;
};
