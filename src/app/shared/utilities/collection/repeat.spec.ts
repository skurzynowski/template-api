import { repeat } from './repeat';

describe('repeat', () => {
  it('repeates provided collection the provided number of times', () => {
    const collection = [1, 2, 3];

    const result = repeat(collection, 3);

    expect(result.length).toBe(9);
    expect(result).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3]);
  });

  it('returns an empty collection when an empty collection provided', () => {
    const collection = [];

    const result = repeat(collection, 5);

    expect(result.length).toBe(0);
    expect(result).toEqual([]);
  });
});
