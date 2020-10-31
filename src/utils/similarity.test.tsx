import { jaccardSimilarity } from './similarity';

describe('Similarity functions', () => {
  describe('Jaccard similarity', () => {
    test('returns a similarity index between 0 and 1', () => {
      expect(jaccardSimilarity(['a', 'b'], ['c', 'd'])).toEqual(0);
      expect(jaccardSimilarity(['a', 'b'], ['b', 'c'])).toEqual(0.5);
      expect(jaccardSimilarity(['a', 'b'], ['a', 'b'])).toEqual(1);
      expect(jaccardSimilarity(['a', 'b'], ['b', 'a'])).toEqual(1);
      expect(jaccardSimilarity(['a', 'b'], [])).toEqual(0);
      expect(jaccardSimilarity([], [])).toEqual(1);
    });
  });
});
