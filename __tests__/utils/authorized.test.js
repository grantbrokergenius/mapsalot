import { auth, authWithUser } from '../../src/utils/authorized';

describe('auth', () => {

});

describe('authWithUser', () => {
  test('with user', () => {
    const fn = jest.fn();
    const ctx = { session: { user: true } };

    const authFunc = authWithUser(fn);
    authFunc(ctx, authFunc);
    expect(fn).toHaveBeenCalled();
  });

  test('without user', () => {
    const fn = jest.fn();
    const ctx = { session: {} };

    const authFunc = authWithUser(fn);
    authFunc(ctx, authFunc);
    expect(fn).not.toHaveBeenCalled();
  });
});
