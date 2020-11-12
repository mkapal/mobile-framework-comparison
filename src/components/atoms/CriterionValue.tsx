import { Box, Chip, styled } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { CheckCircle, Cancel } from '@material-ui/icons';
import { utils } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';
import React from 'react';

import { getCriteriaSchema } from '../../utils';

import { RatingIndicator } from './RatingIndicator';

type Props = {
  category: string;
  criterion: string;
  value: unknown;
};

const StyledChip = styled(Chip)({
  width: 'fit-content',
  marginBottom: 2,
});

const schema = getCriteriaSchema();

export function CriterionValue({ category, criterion, value }: Props) {
  const schemaType = utils.getSchemaType(
    schema[category].properties![criterion] as JSONSchema7,
  );

  const renderValue = () => {
    switch (schemaType) {
      case 'array': {
        const optionsList = utils.optionsList(
          (schema[category].properties![criterion] as JSONSchema7).items,
        );

        return (
          <Box display="flex" flexDirection="column" alignItems="center">
            {(value as string[]).map((v) => {
              const displayString = optionsList.find(
                (option) => option.value === v,
              ).label;

              return <StyledChip key={v} size="small" label={displayString} />;
            })}
          </Box>
        );
      }

      case 'integer': {
        return (
          <RatingIndicator
            rating={value as number}
            label={`Rating: ${(value as number).toFixed(0)}`}
          />
        );
      }

      case 'boolean': {
        return (value as boolean) ? (
          <CheckCircle htmlColor={green['400']} titleAccess="Yes" />
        ) : (
          <Cancel htmlColor={red['400']} titleAccess="No" />
        );
      }

      default: {
        return (value as string).toString();
      }
    }
  };

  return <>{renderValue()}</>;
}
