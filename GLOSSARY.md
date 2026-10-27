# Pickle UI

A design system shipped for two platforms, the web and React Native, from one
set of tokens and one vocabulary of components.

## Language

**Platform**:
One of the two targets Pickle ships components for: the web (`@pickle-ui/react`) or React Native (`@pickle-ui/react-native`).
_Avoid_: target, runtime, flavor

**Token**:
A named design value, such as a color, a radius or a text size, that every platform reads under the same name.
_Avoid_: design variable, theme value

**Type scale**:
The named text sizes (`h1` … `h4`, `lead`, `body`, `small`, `code`) behind `Text`'s variants, shared by both platforms.
_Avoid_: font sizes, typography tokens

**Theme**:
A light and a dark set of token values derived from one brand color, applied over the default tokens.
_Avoid_: palette, color scheme, skin

**Variant spec**:
The platform-free description of a component's variant, size and tone names, their defaults and its part names, which each platform's styling must cover.
_Avoid_: component contract, variant config, schema
