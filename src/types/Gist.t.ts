export interface PublicGistsResObjI {
  id: string;
  created_at: Date;
  description: string;
  owner: {
    id: string;
    login: string;
    avatar_url: string;
  };
  forks: [];
  files: {
    [key: string]: {
      filename: string;
      raw_url: string;
      content: string;
    };
  };
}

export type PublicGistsQueryKey = [string, { page: number; limit: number }];
export type PublicSingleGistQueryKey = [
  string,
  { gistId: string; accessToken: string | null }
];
export type UserGistsQueryKey = [string, { accessToken: string }];
export type CreateGistQueryKey = {
  accessToken: string;
  body: {
    description: string;
    public: boolean;
    files: { [key: string]: { content: string } };
  };
};

export interface CreateGistI {
  name: string;
  content: string;
}

export type GistFilesI = CreateGistI[] | [];
export type StarGistQueryKey = {
  accessToken: string;
  gistId: string;
};
