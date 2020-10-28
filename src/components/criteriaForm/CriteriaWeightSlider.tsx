import { Mark, Slider } from '@material-ui/core';
import React, { ChangeEvent, useContext } from 'react';

import { CriteriaFormContext } from '../../context';
import { CriteriaCategories, CriterionCategoryId } from '../../types';
import { getCriteriaCategories } from '../../utils';

type Props = {
  id: keyof CriteriaCategories[CriterionCategoryId];
};

const marks: Mark[] = [
  {
    value: 0,
    label: 'not important',
  },
  {
    value: 1,
    label: 'less important',
  },
  {
    value: 2,
    label: 'more important',
  },
  {
    value: 3,
    label: 'very important',
  },
];

export function CriteriaWeightSlider({ id }: Props) {
  const { activeStep, setWeights, weights } = useContext(CriteriaFormContext);
  const activeCategory = getCriteriaCategories()[activeStep];

  const handleChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    if (weights[activeCategory][id] === value) {
      return;
    }

    setWeights({
      ...weights,
      [activeCategory]: {
        ...weights[activeCategory],
        [id]: value as number,
      },
    });
  };

  return (
    <Slider
      value={weights[activeCategory][id]}
      step={1}
      min={0}
      max={3}
      marks={marks}
      onChange={handleChange}
    />
  );
}
