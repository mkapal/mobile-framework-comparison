import { Mark, Slider } from '@material-ui/core';
import React, { ChangeEvent, useContext } from 'react';

import { CriteriaFormContext } from '../../context';

type Props = {
  category: string;
  criterion: string;
};

// TODO: DEFAULT_MAX_RATING
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
  },
  {
    value: 4,
  },
  {
    value: 5,
    label: 'very important',
  },
];

export function CriteriaWeightSlider({ category, criterion }: Props) {
  const { setWeights, weights } = useContext(CriteriaFormContext);

  const handleChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    if (weights[category][criterion] === value) {
      return;
    }

    setWeights({
      ...weights,
      [category]: {
        ...weights[category],
        [criterion]: value as number,
      },
    });
  };

  return (
    <Slider
      value={weights[category][criterion]}
      step={1}
      min={0}
      max={5}
      marks={marks}
      onChange={handleChange}
    />
  );
}
