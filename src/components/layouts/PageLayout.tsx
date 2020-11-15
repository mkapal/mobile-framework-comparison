import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';

type Props = {
  header?: ReactNode;
  children?: ReactNode;
  title?: string;
  description?: string;
};

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
}));

export function PageLayout({ children, description, header, title }: Props) {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="inherit"
      padding={4}
    >
      <Container maxWidth="xl">
        {header && <Box mb={2}>{header}</Box>}
        {title && (
          <Typography variant="h1" className={classes.title}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" className={classes.description}>
            {description}
          </Typography>
        )}
        <Box pb={4}>{children}</Box>
      </Container>
    </Box>
  );
}
