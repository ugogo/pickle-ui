---
'@pickle-ui/react-native': minor
---

Apply the app's font: every component that renders text (`Text`, `Card.Title` and `Card.Description`, `Badge` and `Button` labels, `Input`, `Textarea`, `InputGroup`, the `Checkbox` and `RadioGroup.Item` labels and the `Form` parts) now uses `--font-sans`, and `h1`, `h2` and `Card.Title` use `--font-heading`, like `@pickle-ui/react`. Set `--font-sans` to one family name and load its faces with expo-font. Without it, text keeps the system font: `styles.css` and `base.css` give the font variables native defaults, so a `font-sans`, `font-heading` or `font-mono` class no longer overflows the stack when the app sets no font.
