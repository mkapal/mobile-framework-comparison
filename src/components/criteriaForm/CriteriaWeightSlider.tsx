import { Slider } from '@material-ui/core';
import React, { ChangeEvent, useContext } from 'react';

import { CriteriaFormData } from '../../types';

import { CriteriaWeightsContext } from './CriteriaWeightsContext';

type Props = {
  id: keyof CriteriaFormData;
};

const marks = [
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
  const { setWeights, weights } = useContext(CriteriaWeightsContext);

  const handleChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    if (weights[id] === value) {
      return;
    }

    setWeights({
      ...weights,
      [id]: value as number,
    });
  };

  return (
    <Slider
      defaultValue={0}
      value={weights[id] || 0}
      valueLabelDisplay="auto"
      step={1}
      min={0}
      max={3}
      marks={marks}
      onChange={handleChange}
    />
  );
}
