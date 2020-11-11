import { Mark, Slider } from '@material-ui/core';
import range from 'lodash/range';
import React, { ChangeEvent, useContext } from 'react';

import { DEFAULT_MAX_RATING } from '../../config';
import { CriteriaFormContext } from '../../context';

type Props = {
  category: string;
  criterion: string;
  maxRating?: number;
};

export function CriteriaWeightSlider({
  category,
  criterion,
  maxRating = DEFAULT_MAX_RATING,
}: Props) {
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

  const marks: Mark[] = range(maxRating + 1).map((value, idx, { length }) => ({
    value,
    ...(idx === 0 ? { label: 'not important' } : {}),
    ...(idx === length - 1 ? { label: 'very important' } : {}),
  }));

  return (
    <Slider
      value={weights[category][criterion]}
      step={1}
      min={0}
      max={maxRating}
      marks={marks}
      onChange={handleChange}
    />
  );
}
