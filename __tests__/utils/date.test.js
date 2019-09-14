import date from '../../src/utils/date';

describe('date', () => {
  test('test', () => {
    const result = date(1568446475244);
    expect(result).toEqual('Sat Sep 14, 2019 3:34 AM');
  });
});
