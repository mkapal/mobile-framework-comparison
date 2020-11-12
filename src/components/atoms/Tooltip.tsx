import { Theme, Tooltip as MuiTooltip, withStyles } from '@material-ui/core';

export const Tooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.grey.A700,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}))(MuiTooltip);
