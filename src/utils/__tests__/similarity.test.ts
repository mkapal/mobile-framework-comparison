import {
  booleanConverseSimilarity,
  booleanSimilarity,
  jaccardSimilarity,
  normalizedRating,
  pricingSimilarity,
} from '../similarity';

describe('Similarity functions', () => {
  describe('Jaccard similarity', () => {
    it('returns a similarity index between 0 and 1', () => {
      expect(jaccardSimilarity(['a', 'b', 'c', 'd'], ['a'])).toEqual(0.25);
      expect(jaccardSimilarity(['a', 'b', 'c', 'd'], ['e', 'f'])).toEqual(0);
      expect(jaccardSimilarity(['a', 'b', 'c', 'd'], ['c', 'd', 'e'])).toEqual(
        0.5,
      );
      expect(jaccardSimilarity(['a', 'b'], ['a', 'b'])).toEqual(1);
      expect(jaccardSimilarity(['a', 'b'], ['b', 'a'])).toEqual(1);
      expect(jaccardSimilarity(['a', 'b'], [])).toEqual(0);
      expect(jaccardSimilarity([], [])).toEqual(1);
    });
  });

  describe('Boolean similarity', () => {
    it('returns a similarity index for boolean values', () => {
      expect(booleanSimilarity(true, true)).toEqual(1);
      expect(booleanSimilarity(true, false)).toEqual(0);
      expect(booleanSimilarity(false, true)).toEqual(1);
      expect(booleanSimilarity(false, false)).toEqual(0);
    });
  });

  describe('Boolean converse similarity', () => {
    it('returns a converse similarity index for boolean values', () => {
      expect(booleanConverseSimilarity(true, true)).toEqual(1);
      expect(booleanConverseSimilarity(true, false)).toEqual(1);
      expect(booleanConverseSimilarity(false, true)).toEqual(0);
      expect(booleanConverseSimilarity(false, false)).toEqual(1);
    });
  });

  describe('Rating similarity', () => {
    it('returns a normalized rating', () => {
      expect(normalizedRating(1, 2)).toEqual(0.6666666666666666);
      expect(normalizedRating(3, 2, 10)).toEqual(0.2);
      expect(normalizedRating(3, 2, 0)).toEqual(0);
    });
  });

  describe('Pricing similarity', () => {
    it('returns a similarity for pricing policy', () => {
      expect(pricingSimilarity('free', 'free')).toEqual(1);
      expect(pricingSimilarity('free', 'free-paid')).toEqual(0.5);
      expect(pricingSimilarity('free', 'paid')).toEqual(0);
      expect(pricingSimilarity('free-paid', 'free')).toEqual(0.5);
      expect(pricingSimilarity('free-paid', 'free-paid')).toEqual(1);
      expect(pricingSimilarity('free-paid', 'paid')).toEqual(0.5);
      expect(pricingSimilarity('paid', 'free')).toEqual(0);
      expect(pricingSimilarity('paid', 'free-paid')).toEqual(0.5);
      expect(pricingSimilarity('paid', 'paid')).toEqual(1);
    });
  });
});
