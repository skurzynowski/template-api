type GetKey<T> = (item: T) => string;
type GetValue<T, E> = (item: T) => E;

export function createCollectionMapper<T, E>(getKey: GetKey<T>, getValue: GetValue<T, E>) {
  return (collection: T[]): Record<string, E> => {
    return collection.reduce((result, item) => {
      const key = getKey(item);
      const value = getValue(item);

      return {
        ...result,
        [key]: value,
      };
    }, {} as Record<string, E>);
  };
}
