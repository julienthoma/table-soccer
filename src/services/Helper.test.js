import * as Helper from './Helper';

describe('Helper', () => {
  it('normalize data', () => {
    const property = {
      max: { value: 2500 },
      min: { value: 1200 }
    };

    expect(Helper.normalizeValue(1200, property)).toEqual(1);
    expect(Helper.normalizeValue(1201, property)).toEqual(1);
    expect(Helper.normalizeValue(2499, property)).toEqual(10);
    expect(Helper.normalizeValue(1330, property)).toEqual(1);
    expect(Helper.normalizeValue(1331, property)).toEqual(2);

    expect(Helper.normalizeValue(1200, property, true)).toEqual(10);
    expect(Helper.normalizeValue(2499, property, true)).toEqual(1);
    expect(Helper.normalizeValue(1331, property, true)).toEqual(9);

    const property2 = {
      max: { value: 0.9 },
      min: { value: 0.3 }
    };

    expect(Helper.normalizeValue(0.3, property2)).toEqual(1);
    expect(Helper.normalizeValue(0.4, property2)).toEqual(2);
    expect(Helper.normalizeValue(0.89, property2)).toEqual(10);
    expect(Helper.normalizeValue(0.9, property2)).toEqual(10);
  });

  it('avgTimeBetween', () => {
    const end = 600;
    const timings1 = [100, 300, 500, 600];
    const timings2 = [100, 300, 500];
    const timings3 = [];

    expect(Helper.avgTimeBetween(end, timings1)).toEqual(150);
    expect(Helper.avgTimeBetween(end, timings2)).toEqual(150);
    expect(Helper.avgTimeBetween(end, timings3)).toEqual(600);
  });
});
