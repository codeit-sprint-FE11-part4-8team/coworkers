export interface FormData {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
  };
  message: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    image: string | null;
    teamId: string;
  };
}
