import { cn } from './cn';

describe('cn', () => {
  it('drops falsy values and lets later classes win', () => {
    expect(cn('px-2 text-sm', false, null, undefined, 'px-4')).toBe(
      'text-sm px-4',
    );
  });
});
