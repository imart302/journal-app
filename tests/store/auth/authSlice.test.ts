import { authSlice, login, logout } from '../../../src/store';
import { initialState, authState, demoUser, nonAuthState } from '../../fixtures/authFixture';

describe('tests on AuthSlice', () => {
  test('should set the initial state', () => {
    const state = authSlice.reducer(initialState, {
      type: undefined,
    });

    expect(authSlice.name).toBe('auth');
    expect(state).toEqual(initialState);

  });

  test('should do the authentication', () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual(authState);
  });

  test('should do the logout and show a message error', () => {
    const state = authSlice.reducer(authState, logout());
    expect(state).toEqual(nonAuthState);
  });
});
