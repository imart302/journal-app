
export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessage: string;
} 

export interface IAuthSte {
  status: 'None' | 'Auth' | 'Cheking';
  user: IUser | null;
  error: string | null;
}

export interface ILoginEmailPassword {
  email: string;
  password: string;
}

export interface ILoginAction {
  type: string;
  payload: IUser;
}

export interface ICheckingAuthPayload extends ILoginEmailPassword {
  username: string;
}

export interface IChekedAuthPayload {

}

export interface IGoogleResponsePayload {
  ok: boolean,
  displayName?: string,
  email?: string,
  photoURL?: string, 
  uid?: string,
  error?: any,
}