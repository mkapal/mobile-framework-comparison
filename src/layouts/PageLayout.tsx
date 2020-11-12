import { Box, Container, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
type Props = {
  children?: ReactNode;
  title: string;
  description?: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
}));

export function PageLayout({ children, description, title }: Props) {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="inherit"
      padding={4}
    >
      <Container maxWidth="md">
        <Box component="nav" mb={4} className={classes.root}>
          <Link component={RouterLink} to="/">
            Home
          </Link>
          <Link component={RouterLink} to="/questions">
            Questions
          </Link>
        </Box>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
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
