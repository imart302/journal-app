import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React from 'react';
import { purpleTheme } from './purple';

export const AppTheme = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
