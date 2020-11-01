import { Mark, Slider } from '@material-ui/core';
import React, { ChangeEvent, useContext } from 'react';

import { CriteriaFormContext } from '../../context';
import { CriteriaCategories, CriterionCategoryId } from '../../types';

type Props = {
  categoryId: CriterionCategoryId;
  criterionId: keyof CriteriaCategories[CriterionCategoryId];
};

const marks: Mark[] = [
  {
    value: 0,
    label: 'not important',
  },
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
    label: 'very important',
  },
];

export function CriteriaWeightSlider({ categoryId, criterionId }: Props) {
  const { setWeights, weights } = useContext(CriteriaFormContext);

  const handleChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    if (weights[categoryId][criterionId] === value) {
      return;
    }

    setWeights({
      ...weights,
      [categoryId]: {
        ...weights[categoryId],
        [criterionId]: value as number,
      },
    });
  };

  return (
    <Slider
      value={weights[categoryId][criterionId]}
      step={1}
      min={0}
      max={3}
      marks={marks}
      onChange={handleChange}
    />
  );
}
