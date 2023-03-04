import { IAuthSte, IUser } from '../../src/store/auth/interfaces'; 

export const initialState : IAuthSte = {
  user: null,
  error: '',
  status: 'None',
}

export const demoUser : IUser = {
  displayName: 'demo',
  email: 'demo@demo.com',
  errorMessage: '',
  photoURL: 'https://demo.jpg',
  uid: '1233',
}

export const authState : IAuthSte = {
  user: demoUser,
  error: '',
  status: 'Auth',
}

export const nonAuthState : IAuthSte = {
  user: null,
  error: null,
  status: 'None',
}


