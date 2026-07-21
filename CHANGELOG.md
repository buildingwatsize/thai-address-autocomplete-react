# Changelog

## Version

### [v2.0.0] - `2025-07-21`

#### ⭐️ BREAKING CHANGES

- Removed `antd` dependency entirely -- no longer required as a peer dependency
- Replaced `autoCompleteProps` prop with `inputProps` (standard `React.InputHTMLAttributes<HTMLInputElement>`)
- Added `listClassName` prop for customizing dropdown styling
- Uses inline styles with sensible defaults -- no CSS/Tailwind configuration required but supported `cn` className function
- Some tests were added

#### New Features

- Built on `@base-ui/react` Combobox (included as dependency -- auto-installed, no manual setup needed)
- `clearable` prop (default: `true`) -- built-in clear button
- `autoHighlight` prop (default: `true`) -- first matching item highlighted automatically
- `grouped` prop (default: `true`) -- group dropdown items by province with headers and separators
- Default CSS variable theme values injected inline -- works out-of-the-box without `@theme` configuration
- Full keyboard navigation (ArrowDown/Up, Enter, Escape, Home, End)
- Smooth open/close animations with `data-open` / `data-closed` attributes
- Default Tailwind CSS styling using shadcn/ui-compatible design tokens
- Added `clsx` + `tailwind-merge` for className composition
- Significantly smaller bundle size vs antd-based v1
- `useThaiAddress` headless hook -- use the search logic with any UI framework (shadcn, antd, custom)

#### Migration from v1 to v2

1. Remove `antd` from your dependencies
2. Replace `autoCompleteProps={{ placeholder: "..." }}` with `inputProps={{ placeholder: "..." }}`
3. If you targeted antd CSS class names, update selectors or use the `style`/`className` props
4. No CSS configuration needed -- component uses built-in inline styles

### [v1.2.2] - `2025-09-15`

- Updated dependecies

### [v1.2.1] - `2025-08-08`

- Updated dependecies

### [v1.2.0] - `2025-02-13`

- On-boarding `React 19` ✨
- Updated dependecies

### [v1.1.3] - `2024-11-19`

- Updated dependencies

### [v1.1.2] - `2024-08-15`

- Updated dependencies

### [v1.1.1] - `2024-06-26`

- Updated dependencies version

### [v1.1.0] - `2024-04-19`

- Updated deps
- Migrated FlatConfig (`eslint@^9.0.0`)
- Added clear all button for ease demo

### [v1.0.1] - `2024-01-10`

- Edited return sub-component type React.JSX.Element for be more restrictive.

### [v1.0.0] - `2024-01-10`

- Redesign all of code (like the new one) `NOTE: not compatible with the legacy v0.2.0`.
- Thai address database can be configurable, default database is available on install.
- Update dependencies.
- Add new example project (powered by Vite + React + TSX + SWC) with some document.
- Legacy version maintenance support is depends on how important case.

### [v0.2.0] - `2023-07-06`

- Edited keywords and README.md
- Updated dependencies and support antd v5

### [v0.1.0] - `2021-02-05`

- Initialized Project

[v2.0.0]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v2.0.0
[v1.2.2]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v1.2.2
[v1.2.1]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v1.2.1
[v1.2.0]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v1.2.0
[v1.1.3]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v1.1.3
[v1.1.2]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v1.1.2
[v1.1.1]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v1.1.1
[v1.1.0]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v1.1.0
[v1.0.1]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v1.0.1
[v1.0.0]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v1.0.0
[v0.2.0]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v0.2.0
[v0.1.0]: https://github.com/buildingwatsize/thai-address-autocomplete-react/releases/tag/v0.1.0
