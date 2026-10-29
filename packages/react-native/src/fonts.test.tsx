/// <reference types="node" />
import {
  render,
  renderHook,
  type RenderHookOptions,
  screen,
} from '@testing-library/react-native';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { useForm } from 'react-hook-form';
import { type StyleProp, StyleSheet, type TextStyle } from 'react-native';
import { ScopedVariables, useResolveClassNames } from 'uniwind';

import { Badge } from './components/Badge';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Checkbox } from './components/form/Checkbox';
import { Form } from './components/form/Form';
import { Input } from './components/form/Input';
import { InputGroup } from './components/form/InputGroup';
import { RadioGroup } from './components/form/RadioGroup';
import { Textarea } from './components/form/Textarea';
import { Text } from './components/Text';

// Resolves the components' classes the way an app does: `styles.css`
// compiled by Uniwind for iOS, followed by the app's own CSS, then loaded
// into Uniwind's runtime.

type HostElement = { props: { className?: string; style?: TextStyle } };

/** The family the element renders with: its classes, then its `style`. */
async function fontFamily(
  element: HostElement,
  options?: RenderHookOptions<unknown>,
) {
  const { result } = await renderHook(
    () => useResolveClassNames(element.props.className ?? ''),
    options,
  );
  // Uniwind's components render `style={[classNameStyle, props.style]}`.
  const style: StyleProp<TextStyle> = [result.current, element.props.style];
  return StyleSheet.flatten(style)?.fontFamily;
}

function FormFields() {
  const form = useForm({ defaultValues: { email: '', name: '' } });

  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Field
        description="Field description"
        label="Field label"
        name="name"
      >
        <Form.Input placeholder="Form input" />
      </Form.Field>
      <Form.Field error="Field error" name="email">
        <Form.Input />
      </Form.Field>
    </Form>
  );
}

/** Compiles `styles.css` and `css` as an app's `global.css` and loads them. */
function loadStyles(css: string) {
  // Inside the package, so the compiled module's `require('uniwind')` resolves.
  const cache = join(__dirname, '../node_modules/.cache');
  mkdirSync(cache, { recursive: true });
  const dir = mkdtempSync(join(cache, 'pickle-fonts-'));
  const file = join(dir, 'global.css');
  writeFileSync(file, `@import '${join(__dirname, 'styles.css')}';\n${css}`);
  try {
    const code = execFileSync(
      process.execPath,
      [join(__dirname, '../test/compile-uniwind.mjs'), file, 'ios'],
      { encoding: 'utf8' },
    );
    writeFileSync(join(dir, 'styles.js'), code);
    jest.requireActual(join(dir, 'styles.js'));
  } finally {
    rmSync(dir, { force: true, recursive: true });
  }
}

async function renderComponents() {
  await render(
    <>
      <Text>Body text</Text>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="code">pnpm test</Text>
      <Card>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
          <Card.Description>Card description</Card.Description>
        </Card.Header>
      </Card>
      <Badge>Badge label</Badge>
      <Button>Button label</Button>
      <Input placeholder="Input" />
      <Textarea placeholder="Textarea" />
      <InputGroup>
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Group input" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>.com</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup>
      <Checkbox label="Checkbox label" />
      <RadioGroup>
        <RadioGroup.Item label="Radio label" value="a" />
      </RadioGroup>
      <FormFields />
    </>,
  );
}

const SANS_TEXT = [
  'Body text',
  'Heading 3',
  'Card description',
  'Badge label',
  'Button label',
  '@',
  '.com',
  'Checkbox label',
  'Radio label',
  'Field label',
  'Field description',
  'Field error',
];
const HEADING_TEXT = ['Heading 1', 'Heading 2', 'Card title'];
const FIELDS = ['Input', 'Textarea', 'Group input', 'Form input'];

function elements(names: string[]) {
  return names.map((name) => ({
    element: FIELDS.includes(name)
      ? screen.getByPlaceholderText(name)
      : screen.getByText(name),
    name,
  }));
}

function every(names: string[], value: unknown) {
  return Object.fromEntries(names.map((name) => [name, value]));
}

/** Finds every element first: `renderHook` replaces what `screen` queries. */
async function fontFamilies(
  names: string[],
  options?: RenderHookOptions<unknown>,
) {
  const families: Record<string, unknown> = {};
  for (const { element, name } of elements(names)) {
    families[name] = await fontFamily(element, options);
  }
  return families;
}

const ALL = [...SANS_TEXT, ...HEADING_TEXT, ...FIELDS];

describe('fonts', () => {
  describe('when the app sets no font', () => {
    beforeAll(() => loadStyles(''), 60_000);

    it('sets no family, so text keeps the system font', async () => {
      await renderComponents();

      expect(await fontFamilies(ALL)).toEqual(every(ALL, undefined));
    });

    it('keeps the monospace font for code', async () => {
      await renderComponents();

      expect(await fontFamily(screen.getByText('pnpm test'))).toBe('Menlo');
    });
  });

  describe('when the app sets --font-sans', () => {
    beforeAll(() => loadStyles("@theme { --font-sans: 'Nunito'; }"), 60_000);

    it('applies it to every component, headings included', async () => {
      await renderComponents();

      expect(await fontFamilies(ALL)).toEqual(every(ALL, 'Nunito'));
    });

    it('keeps the monospace font for code', async () => {
      await renderComponents();

      expect(await fontFamily(screen.getByText('pnpm test'))).toBe('Menlo');
    });
  });

  describe('when the app sets --font-sans and --font-heading', () => {
    beforeAll(
      () =>
        loadStyles("@theme { --font-sans: 'Nunito'; --font-heading: 'Lora'; }"),
      60_000,
    );

    it('applies --font-heading to h1, h2 and Card.Title', async () => {
      await renderComponents();

      expect(await fontFamilies(ALL)).toEqual({
        ...every([...SANS_TEXT, ...FIELDS], 'Nunito'),
        ...every(HEADING_TEXT, 'Lora'),
      });
    });
  });

  describe('when the app sets --font-sans in a :root rule', () => {
    beforeAll(
      () => loadStyles("@layer theme { :root { --font-sans: 'Nunito'; } }"),
      60_000,
    );

    it('applies it', async () => {
      await renderComponents();

      expect(await fontFamilies(ALL)).toEqual(every(ALL, 'Nunito'));
    });
  });

  describe('when the app sets --font-sans at runtime', () => {
    beforeAll(() => loadStyles(''), 60_000);

    it('applies it inside ScopedVariables, headings included', async () => {
      await renderComponents();

      expect(
        await fontFamilies(ALL, {
          wrapper: ({ children }) => (
            <ScopedVariables variables={{ '--font-sans': 'Nunito' }}>
              {children}
            </ScopedVariables>
          ),
        }),
      ).toEqual(every(ALL, 'Nunito'));
    });
  });
});
