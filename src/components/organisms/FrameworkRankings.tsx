import { Box } from '@material-ui/core';
import React, { useState } from 'react';

import { FrameworkData, FrameworkSimilarity } from '../../types';
import { FrameworkRankingCard } from '../molecules/FrameworkRankingCard';

type Props = {
  rankings: FrameworkSimilarity[];
  frameworkData: FrameworkData;
};

export function FrameworkRankings({ frameworkData, rankings }: Props) {
  const [expandedFramework, setExpandedFramework] = useState<string | null>(
    null,
  );

  const handleToggleExpandFramework = (framework: string) => (
    e: React.ChangeEvent<{}>,
    isExpanded: boolean,
  ) => setExpandedFramework(isExpanded ? framework : null);

  return (
    <>
      {rankings.map(({ framework, totalSimilarity }) => (
        <Box mb={1} key={framework}>
          <FrameworkRankingCard
            id={framework}
            name={frameworkData[framework].name}
            similarity={totalSimilarity}
            expanded={expandedFramework === framework}
            onToggleExpand={handleToggleExpandFramework(framework)}
            url={frameworkData[framework].url}
          />
        </Box>
      ))}
    </>
  );
}
