import {
  booleanConverseSimilarity,
  booleanSimilarity,
  jaccardSimilarity,
} from './similarity';

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

  describe('Boolean similarity', () => {
    test('returns a similarity index for boolean values', () => {
      expect(booleanSimilarity(true, true)).toEqual(1);
      expect(booleanSimilarity(true, false)).toEqual(0);
      expect(booleanSimilarity(false, true)).toEqual(1);
      expect(booleanSimilarity(false, false)).toEqual(0);
    });
  });

  describe('Boolean converse similarity', () => {
    test('returns a converse similarity index for boolean values', () => {
      expect(booleanConverseSimilarity(true, true)).toEqual(1);
      expect(booleanConverseSimilarity(true, false)).toEqual(1);
      expect(booleanConverseSimilarity(false, true)).toEqual(0);
      expect(booleanConverseSimilarity(false, false)).toEqual(1);
    });
  });
});
