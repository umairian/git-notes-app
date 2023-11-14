export interface PublicGistsResObjI {
  id: string;
  created_at: Date;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  files: {
    [key: string]: {
      filename: string;
      raw_url: string;
      content: string;
    };
  };
}

export type PublicGistsQueryKey = [string, { page: number; limit: number }];
export type PublicSingleGistQueryKey = [string, { gistId: string }];
