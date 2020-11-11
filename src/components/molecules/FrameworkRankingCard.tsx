import {
  Accordion,
  AccordionActions as AccordionActionsBase,
  AccordionDetails,
  AccordionSummary as AccordionSummaryBase,
  Button,
  Theme,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { ExpandMore, Language as WebsiteIcon } from '@material-ui/icons';
import React from 'react';

import { ScoreGraph } from '../atoms';

type Props = {
  id: string;
  name: string;
  score: number;
  expanded: boolean;
  onToggleExpand: (e: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  url: string;
};

const FrameworkTitle = withStyles(() =>
  createStyles({
    root: {
      minWidth: '200px',
      fontSize: '18px',
    },
  }),
)(Typography);

const AccordionSummary = withStyles(() =>
  createStyles({
    content: {
      alignItems: 'center',
    },
  }),
)(AccordionSummaryBase);

const AccordionActions = withStyles(() =>
  createStyles({
    root: {
      justifyContent: 'flex-start',
    },
  }),
)(AccordionActionsBase);

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    height: '26px',
    marginRight: theme.spacing(1),
  },
}));

export function FrameworkRankingCard({
  expanded,
  id,
  name,
  onToggleExpand,
  score,
  url,
}: Props) {
  const classes = useStyles();
  const logo = require(`../../assets/logos/${id}.svg`);

  return (
    <Accordion key={name} expanded={expanded} onChange={onToggleExpand}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${name}-content`}
        id={`${name}-header`}
      >
        <img src={logo.default} alt={name} className={classes.logo} />
        <FrameworkTitle>{name}</FrameworkTitle>
        <ScoreGraph variant="determinate" value={score} />
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
          Aliquam eget maximus est, id dignissim quam.
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button
          size="small"
          color="primary"
          startIcon={<WebsiteIcon />}
          href={url}
          target="_blank"
          rel="noopener"
        >
          Visit website
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
