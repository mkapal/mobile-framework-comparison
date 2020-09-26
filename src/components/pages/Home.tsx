import { Box, Button, Typography } from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors';
import {
  Android,
  Apple,
  PhoneAndroidTwoTone,
  PhoneIphoneTwoTone,
} from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

import { HomeLayout } from '../../layouts/HomeLayout';

export function Home() {
  return (
    <HomeLayout>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Box>
          <Apple style={{ color: grey[500], fontSize: 40 }} />
          <PhoneIphoneTwoTone style={{ color: grey[900], fontSize: 100 }} />
          <PhoneAndroidTwoTone style={{ color: grey[900], fontSize: 100 }} />
          <Android style={{ color: green['A400'], fontSize: 40 }} />
        </Box>
        <Typography variant="subtitle1">
          Mobile Framework Recommendation System
        </Typography>
        <Box mb={4}>
          <Typography variant="body1">
            Get a ranked list of recommended cross-platform mobile frameworks
          </Typography>
        </Box>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/questions"
        >
          Start answering questions
        </Button>
      </Box>
    </HomeLayout>
  );
}
