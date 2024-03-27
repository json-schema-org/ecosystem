/* eslint-disable no-undef */
import { server } from './mocks/server';
import { vol } from 'memfs';
beforeAll(() => server.listen());
beforeEach(() => {
  vol.reset();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());