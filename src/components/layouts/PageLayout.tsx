import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBackIos } from '@material-ui/icons';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  backButton?: boolean;
  children?: ReactNode;
  title?: string;
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

export function PageLayout({
  backButton,
  children,
  description,
  title,
}: Props) {
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
        {backButton && (
          <Box mb={2}>
            <Button
              component={Link}
              color="primary"
              to="/"
              startIcon={<ArrowBackIos />}
            >
              Questions
            </Button>
          </Box>
        )}
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
