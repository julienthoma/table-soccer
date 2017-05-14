import Collection from './Collection';

describe('Collection', () => {
  it('create collection', () => {
    const collection = new Collection([1, 2, 3]);

    expect(collection.items).toEqual([1, 2, 3]);
  });
});
