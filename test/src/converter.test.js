const converter = require('../../src/converter');

describe('test module converter', () => {
  it('should return expected result', () => {
    // Given
    const example = [
      ['ID', 1, 'Jl. Sukmawati no.50'],
      ['', 'SG', 30],
      ['ph', '', false]
    ];
    const expectedResult = [
      [['ID', 'Indonesia'], 1, 'Jl. Sukmawati no.50'],
      ['', ['SG', 'Singapore'], 30],
      [['ph', 'Philippines'], '', false]
    ];

    // When
    const result = example.map((x) => x.map((y) => converter(y)));

    // Then
    expect(result).toMatchObject(expectedResult);
  });
});
