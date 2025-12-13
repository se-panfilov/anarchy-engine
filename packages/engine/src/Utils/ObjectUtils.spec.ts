import { mergeAll, omitInObjectWithMutation, omitInObjectWithoutMutation } from './ObjectUtils';

describe('ObjectUtils', () => {
  describe('omitInObjectWithoutMutation', () => {
    it('should do NOT mutate the original object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      omitInObjectWithoutMutation(obj, ['b']);
      expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should remove a property from an object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      const expectedResult: Record<string, number> = { a: 1, c: 3 };
      const result: Omit<typeof obj, 'b'> = omitInObjectWithoutMutation(obj, ['b']);

      expect(result).toEqual(expectedResult);
      expect(obj).not.toEqual(result);
    });

    it('should remove multiple properties from an object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      const expectedResult: Record<string, number> = { a: 1, c: 3 };
      const result: Omit<typeof obj, 'b' | 'd' | 'e'> = omitInObjectWithoutMutation(obj, ['b', 'd', 'e']);

      expect(result).toEqual(expectedResult);
      expect(obj).not.toEqual(result);
    });
  });

  describe('omitInObjectWithMutation', () => {
    it('should do mutate the original object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      omitInObjectWithMutation(obj, ['b']);
      expect(obj).toEqual({ a: 1, c: 3 });
    });

    it('should remove a property from an object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      const expectedResult: Record<string, number> = { a: 1, c: 3 };
      const result: Omit<typeof obj, 'b'> = omitInObjectWithMutation(obj, ['b']);

      expect(result).toEqual(expectedResult);
      expect(obj).toEqual(result);
    });

    it('should remove multiple properties from an object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      const expectedResult: Record<string, number> = { a: 1, c: 3 };
      const result: Omit<typeof obj, 'b' | 'd' | 'e'> = omitInObjectWithMutation(obj, ['b', 'd', 'e']);

      expect(result).toEqual(expectedResult);
      expect(obj).toEqual(result);
    });
  });

  describe('mergeAll', () => {
    it('should mergeAll same way as Object.assign, but with type safety with many args', () => {
      type TContext = { context: string };
      type TWithGender = Readonly<{ gender: string }>;

      const withGender: TWithGender = { gender: 'female' };

      type TWithAAA = {
        getAAA: () => string;
        // eslint-disable-next-line spellcheck/spell-checker
        setAAA: (aaa: string) => void;
      };

      function withAAA(): TWithAAA {
        let AAA: string = '0';

        return {
          getAAA(): string {
            return AAA;
          },
          // eslint-disable-next-line spellcheck/spell-checker
          setAAA(aaa: string): void {
            // eslint-disable-next-line spellcheck/spell-checker
            AAA = aaa;
          }
        };
      }

      type TWithBBB = {
        getBBB: () => string;
        // eslint-disable-next-line spellcheck/spell-checker
        setBBB: (bbb: string) => void;
      };

      function withBBB(): TWithBBB {
        let BBB: string = '0';

        return {
          getBBB(): string {
            return BBB;
          },
          // eslint-disable-next-line spellcheck/spell-checker
          setBBB(bbb: string): void {
            // eslint-disable-next-line spellcheck/spell-checker
            BBB = bbb;
          }
        };
      }

      type TWithCCC = {
        getCCC: () => string;
        // eslint-disable-next-line spellcheck/spell-checker
        setCCC: (ccc: string) => void;
      };

      function withCCC(): TWithCCC {
        let CCC: string = '0';

        return {
          getCCC(): string {
            return CCC;
          },
          // eslint-disable-next-line spellcheck/spell-checker
          setCCC(ccc: string): void {
            // eslint-disable-next-line spellcheck/spell-checker
            CCC = ccc;
          }
        };
      }

      type TWithDDD = {
        getDDD: () => string;
        setDDD: (ddd: string) => void;
      };

      function withDDD(): TWithDDD {
        let DDD: string = '0';

        return {
          getDDD(): string {
            return DDD;
          },
          setDDD(ddd: string): void {
            DDD = ddd;
          }
        };
      }

      type TWithEEE = {
        getEEE: () => string;
        // eslint-disable-next-line spellcheck/spell-checker
        setEEE: (eee: string) => void;
      };

      function withEEE(): TWithEEE {
        let EEE: string = '0';
        return {
          getEEE(): string {
            return EEE;
          },
          // eslint-disable-next-line spellcheck/spell-checker
          setEEE(eee: string): void {
            // eslint-disable-next-line spellcheck/spell-checker
            EEE = eee;
          }
        };
      }

      const base: TContext = { context: 'base' };

      type TMerged = TContext & TWithGender & TWithAAA & TWithBBB & TWithCCC & TWithDDD & TWithEEE;
      // IMPORTANT: Uncomment the following lines, to make sure that mergeAll will show a TS error (and Object.assign will not):
      // &
      // Readonly<{
      //   some: () => string;
      // }>;

      function getMerged(): TMerged {
        return mergeAll(base, withGender, withAAA(), withBBB(), withCCC(), withDDD(), withEEE());
      }

      // function getMerged2(): TMerged {
      //   // eslint-disable-next-line custom/object-assign-max-args,functional/immutable-data
      //   return Object.assign(base, withGender, withAAA(), withBBB(), withCCC(), withDDD(), withEEE());
      // }

      const merged: TMerged = getMerged();

      expect(merged.gender).toBe('female');
      merged.setAAA('1');
      expect(merged.getAAA()).toBe('1');
      merged.setBBB('2');
      expect(merged.getBBB()).toBe('2');
      merged.setCCC('3');
      expect(merged.getCCC()).toBe('3');
      merged.setDDD('4');
      expect(merged.getDDD()).toBe('4');
      merged.setEEE('5');
      expect(merged.getEEE()).toBe('5');
    });
  });
});
