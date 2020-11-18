import {
  CriteriaData,
  FrameworkCriteriaData,
  SimilarityFunctions,
  Weights,
} from '../../types';
import { getFrameworkRankings } from '../ranking';

describe('Ranking utilities', () => {
  describe('getFrameworkRankings', () => {
    it('uses the similarity function of each criterion to calculate the criteria similarities', () => {
      const formData: CriteriaData = {
        category1: {
          quality: 'good',
        },
      };

      const frameworkData: FrameworkCriteriaData = {
        goodFramework: {
          category1: {
            quality: 'good',
          },
        },
        badFramework: {
          category1: {
            quality: 'bad',
          },
        },
      };

      const weights: Weights = {
        category1: {
          quality: 1,
        },
      };

      const similarityFunctions: SimilarityFunctions = {
        category1: {
          quality: (userValue, frameworkValue): number =>
            userValue === frameworkValue ? 1 : 0,
        },
      };

      expect(
        getFrameworkRankings(
          formData,
          frameworkData,
          weights,
          similarityFunctions,
        ),
      ).toEqual([
        {
          criteria: {
            category1: {
              quality: 1,
            },
          },
          framework: 'goodFramework',
          totalSimilarity: 1,
        },
        {
          criteria: {
            category1: {
              quality: 0,
            },
          },
          framework: 'badFramework',
          totalSimilarity: 0,
        },
      ]);
    });

    it('takes the weights into account when calculating the criteria similarities', () => {
      const formData: CriteriaData = {
        category1: {
          quality: 'good',
          support: true,
        },
      };

      const frameworkData: FrameworkCriteriaData = {
        goodFramework: {
          category1: {
            quality: 'good',
            support: false,
          },
        },
        bestFramework: {
          category1: {
            quality: 'good',
            support: true,
          },
        },
        badFramework: {
          category1: {
            quality: 'bad',
            support: false,
          },
        },
      };

      const weights: Weights = {
        category1: {
          quality: 3,
          support: 2,
        },
      };

      const similarityFunctions: SimilarityFunctions = {
        category1: {
          quality: (userValue, frameworkValue): number =>
            userValue === frameworkValue ? 1 : 0,
          support: (userValue, frameworkValue): number =>
            userValue === frameworkValue ? 1 : 0,
        },
      };

      expect(
        getFrameworkRankings(
          formData,
          frameworkData,
          weights,
          similarityFunctions,
        ),
      ).toEqual([
        {
          criteria: {
            category1: {
              quality: 3,
              support: 2,
            },
          },
          framework: 'bestFramework',
          totalSimilarity: 1,
        },
        {
          criteria: {
            category1: {
              quality: 3,
              support: 0,
            },
          },
          framework: 'goodFramework',
          totalSimilarity: 0.6,
        },
        {
          criteria: {
            category1: {
              quality: 0,
              support: 0,
            },
          },
          framework: 'badFramework',
          totalSimilarity: 0,
        },
      ]);
    });

    it('returns total similarity of 0 of the weights add up to 0', () => {
      const formData: CriteriaData = {
        category1: {
          quality: 'good',
        },
      };

      const frameworkData: FrameworkCriteriaData = {
        goodFramework: {
          category1: {
            quality: 'good',
          },
        },
        badFramework: {
          category1: {
            quality: 'bad',
          },
        },
      };

      const weights: Weights = {
        category1: {
          quality: 0,
        },
      };

      const similarityFunctions: SimilarityFunctions = {
        category1: {
          quality: (userValue, frameworkValue): number =>
            userValue === frameworkValue ? 1 : 0,
        },
      };

      expect(
        getFrameworkRankings(
          formData,
          frameworkData,
          weights,
          similarityFunctions,
        ),
      ).toEqual([
        {
          criteria: {
            category1: {
              quality: 0,
            },
          },
          framework: 'goodFramework',
          totalSimilarity: 0,
        },
        {
          criteria: {
            category1: {
              quality: 0,
            },
          },
          framework: 'badFramework',
          totalSimilarity: 0,
        },
      ]);
    });

    it('passes correct data in similarity functions', () => {
      const formData: CriteriaData = {
        category1: {
          booleanCriterion: true,
          arrayCriterion: ['a', 'b'],
        },
        category2: {
          stringCriterion: 'good',
          numberCriterion: 2,
        },
      };
      const frameworkData: FrameworkCriteriaData = {
        goodFramework: {
          category1: {
            booleanCriterion: true,
            arrayCriterion: ['a'],
          },
          category2: {
            stringCriterion: 'good',
            numberCriterion: 5,
          },
        },
        badFramework: {
          category1: {
            booleanCriterion: false,
            arrayCriterion: [],
          },
          category2: {
            stringCriterion: 'bad',
            numberCriterion: 1,
          },
        },
      };

      const weights: Weights = {
        category1: {
          booleanCriterion: 1,
          arrayCriterion: 2,
        },
        category2: {
          stringCriterion: 4,
          numberCriterion: 3,
        },
      };

      const booleanSimilarityMock = jest.fn().mockImplementation(() => 1);
      const arraySimilarityMock = jest.fn().mockImplementation(() => 1);
      const stringSimilarityMock = jest.fn().mockImplementation(() => 1);
      const numberSimilarityMock = jest.fn().mockImplementation(() => 1);

      const similarityFunctions: SimilarityFunctions = {
        category1: {
          booleanCriterion: booleanSimilarityMock,
          arrayCriterion: arraySimilarityMock,
        },
        category2: {
          stringCriterion: stringSimilarityMock,
          numberCriterion: numberSimilarityMock,
        },
      };

      getFrameworkRankings(
        formData,
        frameworkData,
        weights,
        similarityFunctions,
      );

      expect(booleanSimilarityMock).toHaveBeenCalledTimes(2);
      expect(booleanSimilarityMock).toHaveBeenNthCalledWith(1, true, true);
      expect(booleanSimilarityMock).toHaveBeenNthCalledWith(2, true, false);

      expect(arraySimilarityMock).toHaveBeenCalledTimes(2);
      expect(arraySimilarityMock).toHaveBeenNthCalledWith(1, ['a', 'b'], ['a']);
      expect(arraySimilarityMock).toHaveBeenNthCalledWith(2, ['a', 'b'], []);

      expect(stringSimilarityMock).toHaveBeenCalledTimes(2);
      expect(stringSimilarityMock).toHaveBeenNthCalledWith(1, 'good', 'good');
      expect(stringSimilarityMock).toHaveBeenNthCalledWith(2, 'good', 'bad');

      expect(numberSimilarityMock).toHaveBeenCalledTimes(2);
      expect(numberSimilarityMock).toHaveBeenNthCalledWith(1, 2, 5);
      expect(numberSimilarityMock).toHaveBeenNthCalledWith(2, 2, 1);
    });
  });
});
