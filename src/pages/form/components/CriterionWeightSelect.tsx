import { Mark, styled } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React, { useContext } from 'react';

import { CriteriaFormContext } from '../../../context';

type Props = {
  category: string;
  criterion: string;
};

const MARKS: Mark[] = [
  {
    value: 0,
    label: 'unimportant',
  },
  {
    value: 1,
    label: 'neutral',
  },
  {
    value: 2,
    label: 'important',
  },
];
const FixedToggleButton = styled(ToggleButton)({
  width: 120,
});

export function CriterionWeightSelect({ category, criterion }: Props) {
  const { setWeights, weights } = useContext(CriteriaFormContext);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newWeight: number,
  ) => {
    if (weights[category][criterion] === newWeight) {
      return;
    }

    setWeights({
      ...weights,
      [category]: {
        ...weights[category],
        [criterion]: newWeight,
      },
    });
  };

  return (
    <>
      Weight:{' '}
      <ToggleButtonGroup
        value={weights[category][criterion]}
        exclusive
        onChange={handleChange}
        aria-label="Weight"
      >
        {MARKS.map(({ label, value }) => (
          <FixedToggleButton key={value} size="small" value={value}>
            {label}
          </FixedToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
}
