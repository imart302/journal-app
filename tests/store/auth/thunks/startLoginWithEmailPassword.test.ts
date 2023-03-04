import { startLoginWithEmailPassword } from '../../../../src/store/auth';
import { signInWithEmailPassword } from '../../../../src/firebase/providers';

import { vi } from 'vitest';
import { createTestStore } from '../../../fixtures/store';

vi.mock('../../../../src/firebase/providers');


describe('SignIn with Email and password', () => {
  const mockuserfirebase = {
    ok: true,
    error: null,
    displayName: 'test',
    email: 'test@email.com',
    photoURL: 'url',
    uid: 'fake',
  };
  const mockuserstate = {
    displayName: 'test',
    email: 'test@email.com',
    photoURL: 'url',
    uid: 'fake',
    errorMessage: '',
  };
  const mockcredentials = {
    email: 'test@email.com',
    password: 'test',
  };

  let store = createTestStore();

  beforeEach(() => {
    store = createTestStore();
  });

  test('Should set the auth state to pending when thunk is pending', () => {
    const initialState = store.getState();

    vi.mocked(signInWithEmailPassword).mockImplementation(
      (): Promise<typeof mockuserfirebase> => {
        return new Promise(() => {});
      }
    );

    const prom = store.dispatch(startLoginWithEmailPassword(mockcredentials));

    const pendingState = store.getState();
    expect(initialState.auth.status).toBe('None');
    expect(initialState.auth.user).toBe(null);
    expect(pendingState.auth.status).toBe('Cheking');
    prom.abort();
  });

  it('Should set auth state to Auth and set the correct user', async () => {

    const prevState = store.getState();

    vi.mocked(signInWithEmailPassword).mockImplementation(
      async ({ email, password }: { email: string; password: string }) => {
        if (
          mockcredentials.email === email &&
          mockcredentials.password === password
        ) {
          return mockuserfirebase;
        } else {
          return Promise.reject();
        }
      }
    );

    await store.dispatch(startLoginWithEmailPassword(mockcredentials));

    const state = store.getState();
    
    expect(prevState.auth.user).toBe(null);
    expect(prevState.auth.status).toBe('None');
    expect(state.auth.user).toEqual(mockuserstate);
    expect(state.auth.status).toBe('Auth');
  });


  it('Should reject with incorrect credentials and set the correct state', async () => {

    vi.mocked(signInWithEmailPassword).mockImplementation(
      async ({ email, password }: { email: string; password: string }) => {
        if (
          mockcredentials.email === email &&
          mockcredentials.password === password
        ) {
          return mockuserfirebase;
        } else {
          return Promise.reject();
        }
      }
    );

    const prevState = store.getState();

    await store.dispatch(
      startLoginWithEmailPassword({
        email: 'email',
        password: 'password',
      })
    );

    const state = store.getState();
    expect(prevState.auth.user).toBe(null);
    expect(prevState.auth.status).toBe('None');
    expect(state.auth.user).toBe(null);
    expect(state.auth.error).toBe('Rejected');
  });
});
