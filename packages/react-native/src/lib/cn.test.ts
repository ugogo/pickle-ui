import { cn } from './cn';

describe('cn', () => {
  it('drops falsy values and lets later classes win', () => {
    expect(cn('px-2 text-sm', false, null, undefined, 'px-4')).toBe(
      'text-sm px-4',
    );
  });

  it('keeps a type scale size next to a text color', () => {
    expect(cn('text-h1 text-foreground', 'text-muted-foreground')).toBe(
      'text-h1 text-muted-foreground',
    );
  });
});
