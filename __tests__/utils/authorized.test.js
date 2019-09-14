import { auth, authWithUser } from '../../src/utils/authorized';

describe('authWithUser', () => {
  test('with user', () => {
    const fn = jest.fn();
    const user = { name: 'grant' };
    const ctx = { session: { user } };

    const authFunc = authWithUser(fn);
    authFunc(ctx, 'hey');
    expect(fn).toHaveBeenCalledWith(user, 'hey');
  });

  test('without user', () => {
    const fn = jest.fn();
    const ctx = { session: {} };

    const authFunc = authWithUser(fn);
    authFunc(ctx, authFunc);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('auth', () => {
  test('with user', () => {
    const fn = jest.fn();
    const user = { name: 'grant' };
    const ctx = { session: { user } };

    const authFunc = auth(fn);
    authFunc(ctx, 'hey');
    expect(fn).toHaveBeenCalledWith('hey');
  });

  test('without user', () => {
    const fn = jest.fn();
    const ctx = { session: {} };

    const authFunc = auth(fn);
    authFunc(ctx, authFunc);
    expect(fn).not.toHaveBeenCalled();
  });
});
