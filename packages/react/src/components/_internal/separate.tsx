import * as React from 'react';

import { Separator } from '../Separator';

export type RenderSeparator = (details: {
  index: number;
  orientation: SeparatorOrientation;
}) => React.ReactNode;

type SeparatorOrientation = 'horizontal' | 'vertical';

const renderSeparator: RenderSeparator = ({ orientation }) => (
  <Separator aria-hidden orientation={orientation} />
);

/**
 * Puts a separator between each two children: a decorative `Separator` for
 * `true`, or what a function returns.
 */
export function separate(
  children: React.ReactNode,
  orientation: SeparatorOrientation,
  separator: boolean | RenderSeparator | undefined,
) {
  if (!separator) return children;
  const render = separator === true ? renderSeparator : separator;

  // `toArray` drops empty children; `map` then keys each fragment by its child.
  return React.Children.map(
    React.Children.toArray(children),
    (child, index) => (
      <React.Fragment>
        {index > 0 && render({ index: index - 1, orientation })}
        {child}
      </React.Fragment>
    ),
  );
}
