import React from 'react';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as LinkDom } from 'react-router-dom';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, startGoogleSignIn, startLoginWithEmailPassword} from '../../store';

const intialForm = {
  fields: [
    {
      name: 'email',
      value: '',
    },
    {
      name: 'password',
      value: '',
    },
  ],
}

export const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const form = useForm(intialForm);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email =
      form.formFields.find((field) => field.name == 'email')?.value || '';
    const password =
      form.formFields.find((field) => field.name == 'password')?.value || '';
    console.log(email, password);
    dispatch(startLoginWithEmailPassword({email, password}));
  };

  const onGoogleSignIn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log('Google sing in');
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onFormSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              name="email"
              placeholder="mail@google.com"
              value={
                form.formFields.find((field) => field.name == 'email')?.value
              }
              onChange={form.onInputChange}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              value={
                form.formFields.find((field) => field.name == 'password')?.value
              }
              onChange={form.onInputChange}
              fullWidth
            ></TextField>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 2 }}
            justifyContent="center"
          >
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={authStatus == 'Auth' ? true : false}
              >
                <Typography sx={{ ml: 1 }}>Login</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                onClick={onGoogleSignIn}
                fullWidth
                disabled={authStatus == 'Auth' ? true : false}
              >
                <Google></Google>
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={LinkDom} color="inherit" to="/auth/register">
              Create account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
