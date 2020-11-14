import { blue } from '@material-ui/core/colors';
import { Brightness1 } from '@material-ui/icons';
import React from 'react';

import { Tooltip } from './Tooltip';

type Props = {
  similarity: number;
};

const getSimilarityColor = (similarity: number): string => {
  const colors: {
    [a: number]: string;
  } = {
    0: blue['100'],
    25: blue['300'],
    50: blue['500'],
    75: blue['700'],
  };

  return Object.keys(colors).reduce((acc, percentage) => {
    const num = Number(percentage);

    if (similarity >= num / 100) {
      return colors[num];
    }

    return acc;
  }, blue['100']);
};

export function SimilarityIndicator({ similarity }: Props) {
  const title = `Similarity: ${(similarity * 100).toFixed(0)} %`;

  return (
    <Tooltip title={title} aria-label={title}>
      <Brightness1
        style={{
          fontSize: 8 + 16 * similarity,
          color: getSimilarityColor(similarity),
        }}
      />
    </Tooltip>
  );
}
