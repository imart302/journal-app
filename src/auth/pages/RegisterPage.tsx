import React, { useMemo } from 'react';

import { Google } from '@mui/icons-material';
import { Grid, TextField, Button, Typography, Link, Alert } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkDom } from 'react-router-dom';
import { useForm } from '../../hooks';
import { AppDispatch, RootState, startCreateWithEmailPassword } from '../../store';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authError = useSelector((state: RootState) => state.auth.error);
  const authStatus = useSelector ((state: RootState) => state.auth.status);

  const isInProccesOfAuth = useMemo(() => authStatus == 'Cheking', [authStatus]);

  const form = useForm({
    fields: [
      { 
        name: 'username',
        value: '',
        validation: (value) => {
          return value.length > 4;
        },
        valid: false
      },
      {
        name: 'email',
        value: '',
        validation: (value) => {
          const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
          const result: boolean = expression.test(value);
          return result;
        },
        valid: false,
      },
      {
        name: 'password',
        value: '',
        validation: (value) => {
          return value.length > 4;
        },
        valid: false,
      }
    ]
  });

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      username: form.field('username')?.value || '',
      email: form.field('email')?.value || '' ,
      password: form.field('password')?.value || '',
    }
    dispatch(startCreateWithEmailPassword(user));
  };

  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={onFormSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} display={authError ? '': 'None'}>
            <Alert severity='error'>
              {authError}
            </Alert>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="Your name"
              fullWidth
              name='username'
              onChange={form.onInputChange}
              error={!form.field('username')?.valid}
              helperText={form.field('username')?.valid ? '' : 'Username too short'}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="mail@google.com"
              fullWidth
              name='email'
              onChange={form.onInputChange}
              error={!form.field('email')?.valid}
              helperText={form.field('email')?.valid ? '' : 'Not a valid email'}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name='password'
              onChange={form.onInputChange}
              error={!form.field('password')?.valid}
              helperText={form.field('password')?.valid ? '' : 'Password too short'}
            ></TextField>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 2 }}
            justifyContent="center"
          >
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth type='submit' disabled={isInProccesOfAuth}>
                <Typography sx={{ ml: 1 }}>Sign Up</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography>Already have account?</Typography>
            <Link component={LinkDom} color="inherit" to="/auth/login" sx={{ml:1}}>
              Sing in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
