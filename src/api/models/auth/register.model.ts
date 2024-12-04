interface UserCreateRequest {
  isSubscribed: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface UserCreateResponse {
  success: boolean;
  subscribed: boolean;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export type { UserCreateRequest, UserCreateResponse}