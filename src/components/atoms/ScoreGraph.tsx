import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

export const ScoreGraph = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
      flex: 1,
    },
    colorPrimary: {
      backgroundColor: 'transparent',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.light,
    },
  }),
)(LinearProgress);
