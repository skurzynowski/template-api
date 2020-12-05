export function repeat<T>(collection: T[], times: number): T[] {
  return [...new Array(times)].fill(null).flatMap(() => {
    return collection;
  });
}
