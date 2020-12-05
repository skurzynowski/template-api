import { random } from 'faker';

import { createCollectionMapper } from './map-collection-by-key';

interface CollectionItem {
  readonly id: string;
  readonly title: string;
}

const createCollectionItem = (): CollectionItem => {
  return {
    id: random.uuid(),
    title: random.word(),
  };
};

const collection = [createCollectionItem(), createCollectionItem()];

describe('mapCollectionByKey', () => {
  it('maps the collection by id', () => {
    const mapCollectionById = createCollectionMapper<CollectionItem, CollectionItem>(
      (item) => item.id,
      (item) => item,
    );

    const result = mapCollectionById(collection);

    expect(result).toEqual({
      [collection[0].id]: collection[0],
      [collection[1].id]: collection[1],
    });
  });

  it('maps the collection by title', () => {
    const mapCollectionByTitle = createCollectionMapper<CollectionItem, CollectionItem>(
      (item) => item.title,
      (item) => item,
    );

    const result = mapCollectionByTitle(collection);

    expect(result).toEqual({
      [collection[0].title]: collection[0],
      [collection[1].title]: collection[1],
    });
  });
});
