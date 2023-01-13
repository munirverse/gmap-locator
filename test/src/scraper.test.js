const scraper = require('../../src/scraper');

describe('test module scraper', () => {
  it('should return false object when pass nonstring or empty string arguments', async () => {
    // Given
    const example = null;
    const example2 = '';
    const example3 = {};
    const example4 = 1;
    const example5 = true;

    // When
    const scraperResult = await scraper(example);
    const scraperResult2 = await scraper(example2);
    const scraperResult3 = await scraper(example3);
    const scraperResult4 = await scraper(example4);
    const scraperResult5 = await scraper(example5);

    // Then
    expect(scraperResult).toMatchObject({ url: false, lat: false, lng: false });
    expect(scraperResult2).toMatchObject({ url: false, lat: false, lng: false });
    expect(scraperResult3).toMatchObject({ url: false, lat: false, lng: false });
    expect(scraperResult4).toMatchObject({ url: false, lat: false, lng: false });
    expect(scraperResult5).toMatchObject({ url: false, lat: false, lng: false });
  });

  it('should return certain object when pass text of place', async () => {
    // Given
    const examples = ['Indonesia', 'SG', 'Victoria St Singapura', 'RandomPlace'];

    // When
    const scraperResult = await Promise.all(examples.map((item) => scraper(item)));

    // Then
    expect(scraperResult.map((item) => ({ lat: item.lat, lng: item.lng }))).toMatchObject([
      {
        lat: -0.789275,
        lng: 113.921327
      },
      {
        lat: 1.352083,
        lng: 103.819836
      },
      {
        lat: 1.3005974,
        lng: 103.855907
      },
      {
        lat: false,
        lng: false
      }
    ]);
  });
});
