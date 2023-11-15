export interface GitHubUserI {
  id: number;
  name: string;
  avatar_url: string;
  bio: string;
  email: string;
  login: string;
  url: string;
}

export interface AuthStateI {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: null | GitHubUserI;
}
