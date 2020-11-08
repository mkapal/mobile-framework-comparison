import { getTotalWeights } from '../criteria';

describe('Criteria utilities', () => {
  describe('getTotalWeights', () => {
    it('returns the sum of all weights', () => {
      expect(
        getTotalWeights({
          category1: {
            criterion1: 2,
            criterion2: 1,
            criterion3: 3,
          },
          category2: {
            criterion4: 5,
            criterion5: 5,
            criterion6: 4,
          },
        }),
      ).toEqual(20);
    });

    it('returns 0 for an empty object', () => {
      expect(getTotalWeights({})).toEqual(0);
    });

    it('returns 0 for an empty category', () => {
      expect(
        getTotalWeights({
          category1: {},
        }),
      ).toEqual(0);
    });
  });
});
