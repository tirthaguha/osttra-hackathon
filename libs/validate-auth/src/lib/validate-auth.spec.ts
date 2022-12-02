import { validateAuth } from './validate-auth';

describe('validateAuth', () => {
  it('should work', () => {
    expect(validateAuth()).toEqual('validate-auth');
  });
});
