import { startGoogleSignIn } from '../../../../src/store/auth';
import { signInWithGoogle } from '../../../../src/firebase/providers';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { vi } from 'vitest';
import { createTestStore } from '../../../fixtures/store';
import { RootState, store } from '../../../../src/store';
import { AnyAction } from '@reduxjs/toolkit';
import EventEmmiter from 'events';

vi.mock('../../../../src/firebase/providers');

describe('Test on startGoogleSignIn', () => {
  let testStore = createTestStore();
  const mockuserfirebase = {
    ok: true,
    error: null,
    displayName: 'test',
    email: 'test@email.com',
    photoURL: 'url',
    uid: 'fake',
  };

  beforeEach(() => {
    testStore = createTestStore();
  });

  // TESTING ALL THE PHASES NOT GOOD BUT THIS WORKS
  // it('Should Login with Google and set the correct state', async () => {
  //   const mockuser = {
  //     ok: true,
  //     error: null,
  //     displayName: 'test',
  //     email: 'test@email.com',
  //     photoURL: 'url',
  //     uid: 'fake',
  //   };
  //   const mockuserstate = {
  //     displayName: 'test',
  //     email: 'test@email.com',
  //     photoURL: 'url',
  //     uid: 'fake',
  //     errorMessage: null,
  //   };

  //   const initialState = testStore.getState();

  //   const googleFinishSingIn = new EventEmmiter();

  //   const promise = new Promise<typeof mockuser>((resolve) => {
  //     googleFinishSingIn.on('finish', () => {
  //       resolve(mockuser);
  //     });
  //   });

  //   vi.mocked(signInWithGoogle).mockImplementation((): Promise<typeof mockuser> => {
  //     return promise;
  //   });

  //   const dispachProm = testStore.dispatch(startGoogleSignIn());
  //   const pendingState = testStore.getState();

  //   googleFinishSingIn.emit('finish');

  //   await dispachProm;
  //   const state = testStore.getState();

  //   expect(initialState.auth.user).toBe(null);
  //   expect(initialState.auth.status).toBe('None');
  //   expect(pendingState.auth.status).toBe('Cheking');
  //   expect(state.auth.user).toEqual(mockuserstate);
  //   expect(state.auth.status).toBe('Auth');
  // });

  test('Should set the auth state to pending when thunk is pending', () => {
    const initialState = store.getState();

    vi.mocked(signInWithGoogle).mockImplementation(
      (): Promise<typeof mockuserfirebase> => {
        return new Promise(() => {});
      }
    );

    const prom = store.dispatch(startGoogleSignIn());

    const pendingState = store.getState();
    expect(initialState.auth.status).toBe('None');
    expect(initialState.auth.user).toBe(null);
    expect(pendingState.auth.status).toBe('Cheking');
    prom.abort();
  });

  it('Should set the auth state to Auth and set the user when thunk is resolved', async () => {
    const mockuserstate = {
      displayName: 'test',
      email: 'test@email.com',
      photoURL: 'url',
      uid: 'fake',
      errorMessage: null,
    };

    const initialState = testStore.getState();

    vi.mocked(signInWithGoogle).mockResolvedValue(mockuserfirebase);
    await testStore.dispatch(startGoogleSignIn());

    const state = testStore.getState();

    expect(initialState.auth.user).toBe(null);
    expect(initialState.auth.status).toBe('None');
    expect(state.auth.user).toEqual(mockuserstate);
    expect(state.auth.status).toBe('Auth');
  });

  it('Should set an auth error when sign in fail', async () => {
    const prevState = testStore.getState();

    vi.mocked(signInWithGoogle).mockRejectedValue({});

    await testStore.dispatch(startGoogleSignIn());

    const state = testStore.getState();

    expect(prevState.auth.status).toBe('None');
    expect(prevState.auth.user).toBe(null);
    expect(state.auth.user).toBe(null);
    expect(state.auth.error).toEqual('Error on SignInWithGoogle');
  });
});
