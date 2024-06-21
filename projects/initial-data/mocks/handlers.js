import { http, HttpResponse } from 'msw';

export const releaseDateHandler = http.get('https://api.github.com/*', () => {
  return HttpResponse.json({
    repository: 'octocat/hello-world',
    names: 'python, json, json-schema, docker, postgresql',
    date_first_commit: '2019-02-09T15:42:36Z',
    created_at: '2019-02-23T15:08:34Z',
    date_first_release: '2019-03-11T09:49:01Z',
  });
});

export const handlers = [releaseDateHandler];
