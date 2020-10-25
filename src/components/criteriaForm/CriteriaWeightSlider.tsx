import { Mark, Slider } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

type Props = {
  id: string;
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
  // const { setWeights, weights } = useContext(CriteriaFormContext);

  const handleChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    // if (weights[id] === value) {
    //   return;
    // }
    // setWeights({
    //   ...weights,
    //   [id]: value as number,
    // });
  };

  return (
    <Slider
      defaultValue={0}
      value={0}
      step={1}
      min={0}
      max={3}
      marks={marks}
      onChange={handleChange}
    />
  );
}
