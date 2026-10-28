import { createContext } from 'react';

/**
 * Lets a wrapper mark the frame `disabled` or `invalid` when its input isn't
 * a direct `InputGroup.Input` child, like `Form.InputGroup` does with
 * `Form.Input`, whose invalid state comes from the form.
 */
export const InputGroupStateContext = createContext<null | {
  disabled?: boolean;
  invalid?: boolean;
}>(null);
