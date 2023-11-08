export interface PublicGistsResObjI {
  created_at: Date;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  files: {
    [key: string]: {
      filename: string;
    };
  };
}
