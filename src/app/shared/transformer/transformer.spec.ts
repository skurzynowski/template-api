import { Expose } from 'class-transformer';

import { Transformer } from './transformer';

class TransformToClass {
  @Expose()
  public a: string;

  @Expose()
  public b: string;
}

describe('Transformer', () => {
  describe('stripOptionalProperties', () => {
    it('removes all undefined properties', () => {
      const object = {
        a: 1,
        b: 2,
        c: undefined,
      };

      expect(Transformer.stripOptionalProperties(object)).toEqual({ a: 1, b: 2 });
    });
  });

  describe('transformTo', () => {
    it('transforms a given object into the specified class instance', () => {
      const object = {
        a: 'value',
        b: 'value',
      };

      const result = Transformer.transformTo(TransformToClass, object);

      expect({ ...result }).toEqual({ ...object });
      expect(result).toBeInstanceOf(TransformToClass);
    });

    it('removes all the not specified values', () => {
      const object = {
        a: 'value',
        b: 'value',
        c: 123,
      };

      const result = Transformer.transformTo(TransformToClass, object);

      expect({ ...result }).toEqual({ a: 'value', b: 'value' });
      expect(result).toBeInstanceOf(TransformToClass);
    });
  });
});
