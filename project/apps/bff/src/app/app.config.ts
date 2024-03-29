export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/auth',
  Blog = 'http://localhost:3334/api/posts',
  Tags = 'http://localhost:3334/api/tags',
  Comments = 'http://localhost:3334/api/comments'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;