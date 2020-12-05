import { plainToClass } from 'class-transformer';

export class Transformer {
  public static createDTOFactory<T>(constructor: new () => T) {
    return (props: T): T => Transformer.transformTo(constructor, props);
  }

  public static createEntityFactory<T>(constructor: new () => T) {
    return (props: Partial<T>): T => Transformer.transformTo(constructor, props);
  }

  public static transformTo<T>(toClass: new () => T, plain: Record<any, any>): T {
    return plainToClass(toClass, plain, { excludeExtraneousValues: true });
  }

  public static stripOptionalProperties<T>(object: T): T {
    return Object.keys(object).reduce((result, key) => {
      const value = object[key];

      if (value === undefined) {
        return result;
      }

      result[key] = value;

      return result;
    }, {}) as T;
  }
}
