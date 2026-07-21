# thai-address-autocomplete-react

[![NPM](https://img.shields.io/npm/v/thai-address-autocomplete-react)](https://www.npmjs.com/package/thai-address-autocomplete-react)
[![NPM](https://img.shields.io/badge/Watsize-Library-289548)](https://www.npmjs.com/package/thai-address-autocomplete-react)
[![Downloads](https://img.shields.io/npm/dm/thai-address-autocomplete-react.svg)](https://npmjs.org/package/thai-address-autocomplete-react)

## ⭐️ v2.0.0 -- New UI Combobox + Tailwind

Major rewrite: removed `antd` dependency entirely. Now powered by `@base-ui/react` Combobox primitives (auto-installed as dependency) with Tailwind CSS default styling, clear button, auto-highlight, province grouping, Portal-based positioning, and full WAI-ARIA compliance.

## 📘 About

thai-address-autocomplete-react is an input component for ReactJS that can auto-complete Thai addresses with magic by `just typing something`. Happy Coding. :D

## ⚙ Install

```bash
npm install thai-address-autocomplete-react
# or
yarn add thai-address-autocomplete-react
```

> **Note:** `antd` is no longer required. `@base-ui/react` is included as a dependency and installed automatically.

## Styling

The component renders with built-in default styles (inline) -- **no CSS configuration required**. It works out-of-the-box without any CSS framework.

You can customize appearance via the `style`, `className`, `inputProps.style`, and `listClassName` props.

### Custom Theme (Optional)

To override default colors, define CSS variables on `:root` or any parent element:

```css
:root {
  --color-background: #f7f5f2;
  --color-foreground: #2d2a26;
  --color-input: #e8e4e0;
  --color-ring: #b8afa6;
  --color-popover: #ffffff;
  --color-popover-foreground: #2d2a26;
  --color-accent: #b8afa6;
  --color-accent-foreground: #2d2a26;
  --color-muted-foreground: #8a8380;
}
```

> **Note for Tailwind CSS 4 users:** `@theme` variables are only available to Tailwind utilities, not to inline styles. You must also declare them in `:root` for the library to pick them up.

## 📌 Example Usage

```tsx
import { useState } from "react";
import { Address, CreateInput } from "thai-address-autocomplete-react";

const InputThaiAddress = CreateInput();

const App = () => {
  const [address, setAddress] = useState<Address>({
    district: "",
    amphoe: "",
    province: "",
    zipcode: "",
  });

  const handleChange = (scope: string) => (value: string) => {
    setAddress((oldAddr: Address) => ({
      ...oldAddr,
      [scope]: value,
    }));
  };

  const handleSelect = (address: Address) => {
    setAddress(address);
  };

  return (
    <div>
      <label>ตำบล</label>
      <InputThaiAddress.District
        value={address["district"]}
        onChange={handleChange("district")}
        onSelect={handleSelect}
        inputProps={{ placeholder: "type something..." }} // NOTE: Optional
      />
      <label>อำเภอ</label>
      <InputThaiAddress.Amphoe
        value={address["amphoe"]}
        onChange={handleChange("amphoe")}
        onSelect={handleSelect}
        inputProps={{ placeholder: "type something..." }}
      />
      <label>จังหวัด</label>
      <InputThaiAddress.Province
        value={address["province"]}
        onChange={handleChange("province")}
        onSelect={handleSelect}
        inputProps={{ placeholder: "type something..." }}
      />
      <label>รหัสไปรษณีย์</label>
      <InputThaiAddress.Zipcode
        value={address["zipcode"]}
        onChange={handleChange("zipcode")}
        onSelect={handleSelect}
        inputProps={{ placeholder: "type something..." }}
      />
    </div>
  );
};

export default App;
```

## 📋 Properties

### Label description

| Data label | Data field name |
|------------|-----------------|
| ตำบล/แขวง  | district        |
| อำเภอ/เขต  | amphoe          |
| จังหวัด      | province        |
| รหัสไปรษณีย์  | zipcode         |

### Component properties

| **Property**    | **Description**                                                                                 | **Type**                                                          | **Default** |
|-----------------|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|-------------|
| **scope**       | field name from record. Possible value: "district", "amphoe", "province", "zipcode".            | _string_                                                          | "province"  |
| **delimiter**   | delimiter between scope values, shown inside options.                                           | _string_                                                          | ", "        |
| **value**       | controlled input value by scope.                                                                | _string_                                                          | ""          |
| **filter**      | array filter function for fine-grained result filtering.                                        | _(value?: Address, index?: number, array?: Address[]) => boolean_ | () => true  |
| **onChange**    | callback triggered on input changes.                                                            | _(value: string) => void_                                         | () => null  |
| **onSelect**   | callback triggered on option selection.                                                         | _(address: Address) => void_                                      | () => null  |
| **style**       | inline styles for the container `<div>`.                                                        | _React.CSSProperties_                                             | {}          |
| **className**   | CSS class for the container `<div>`.                                                            | _string_                                                          | ""          |
| **inputProps**  | pass-through HTML input attributes (placeholder, disabled, etc.).                               | _React.InputHTMLAttributes\<HTMLInputElement\>_                    | undefined   |
| **listClassName** | override Tailwind classes for the dropdown list.                                              | _string_                                                          | undefined   |
| **clearable**   | show a clear (X) button when the input has a value.                                             | _boolean_                                                         | true        |
| **autoHighlight** | automatically highlight the first matching item in the dropdown.                              | _boolean_                                                         | true        |
| **grouped**     | group dropdown items by province with headers and separators.                                   | _boolean_                                                         | true        |

### Data record (also named `Address`)

> the data record can be found `onSelect`.

```typescript
interface Address {
  district: string;
  amphoe: string;
  province: string;
  zipcode: number;
}
```

## Migrating from v1 to v2

### Breaking Changes

1. **antd is no longer required** -- remove `antd` from your dependencies
2. **Tailwind CSS is not required** -- component uses inline styles with built-in defaults (but className function `cn` is supported)
3. **`autoCompleteProps` removed** -- use `inputProps` (standard HTML input attributes) instead
4. **DOM structure changed** -- native `<input>` + `<ul>` listbox instead of antd widget

### Before (v1)

```bash
npm install thai-address-autocomplete-react antd
```

```tsx
<InputThaiAddress.District
  value={address["district"]}
  onChange={handleChange("district")}
  onSelect={handleSelect}
  autoCompleteProps={{ placeholder: "type something..." }}
/>
```

### After (v2)

```bash
npm install thai-address-autocomplete-react
```

```tsx
<InputThaiAddress.District
  value={address["district"]}
  onChange={handleChange("district")}
  onSelect={handleSelect}
  inputProps={{ placeholder: "type something..." }}
/>
```

## Headless Hook: `useThaiAddress`

For full UI control, use the headless hook -- it provides search logic only, no UI rendering.

```tsx
import { useThaiAddress, Address } from "thai-address-autocomplete-react";

const App = () => {
  const [value, setValue] = useState("");
  const [address, setAddress] = useState<Address>({ district: "", amphoe: "", province: "", zipcode: "" });

  const { suggestions, groupedSuggestions, search, select, clear, isOpen } = useThaiAddress({
    scope: "district",
  });

  const handleChange = (text: string) => {
    setValue(text);
    search(text);
  };

  const handleSelect = (addr: Address) => {
    setAddress(addr);
    setValue(addr.district);
    select(addr);
  };

  return (
    <div>
      <input value={value} onChange={(e) => handleChange(e.target.value)} placeholder="ตำบล" />
      {isOpen && (
        <ul>
          {groupedSuggestions.map((group) => (
            <li key={group.province}>
              <strong>{group.province}</strong>
              <ul>
                {group.items.map((item) => (
                  <li key={`${item.district}-${item.zipcode}`} onClick={() => handleSelect(item)}>
                    {item.district}, {item.amphoe}, {item.zipcode}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### Hook Options

| **Option**   | **Description**                                          | **Type**   | **Default** |
|--------------|----------------------------------------------------------|------------|-------------|
| **scope**    | search scope: "district", "amphoe", "province", "zipcode" | _Scope_    | (required)  |
| **config**   | custom database config                                    | _Config_   | undefined   |
| **filter**   | filter function for results                               | _Function_ | undefined   |
| **grouped**  | compute grouped suggestions by province                   | _boolean_  | true        |
| **delimiter**| delimiter string (for display purposes)                   | _string_   | ", "        |

### Hook Return

| **Property**           | **Type**                | **Description**                     |
|------------------------|-------------------------|-------------------------------------|
| **suggestions**        | _Address[]_             | flat list of matching addresses     |
| **groupedSuggestions** | _GroupedSuggestions[]_  | results grouped by province         |
| **search**             | _(text: string) => void_ | trigger a search                  |
| **select**             | _(address: Address) => void_ | mark selection (clears results) |
| **clear**              | _() => void_            | clear all results                   |
| **isOpen**             | _boolean_               | true when suggestions are available |

### Using with shadcn/ui

```tsx
import { useThaiAddress } from "thai-address-autocomplete-react";
import { Input } from "@/components/ui/input";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

const { groupedSuggestions, search, select, isOpen } = useThaiAddress({ scope: "district" });

<Input value={value} onChange={(e) => { setValue(e.target.value); search(e.target.value); }} />
{isOpen && (
  <Command>
    <CommandList>
      {groupedSuggestions.map((g) => (
        <CommandGroup key={g.province} heading={g.province}>
          {g.items.map((addr) => (
            <CommandItem key={addr.district + addr.zipcode} onSelect={() => select(addr)}>
              {addr.district}, {addr.amphoe}, {addr.zipcode}
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </CommandList>
  </Command>
)}
```

## Need More Example?

- Example Project: [./example](./example)
- more Document: [./docs](./docs/README.md)
- Online Demo: [Demo](https://thai-address-autocomplete-react-watsize.vercel.app)

## FAQ?

FAQ 1: **Can I use custom database ?**

Yes, it supports `JSON format` file that output from [Database Tools by earthchie](https://github.com/earthchie/jquery.Thailand.js/tree/master?tab=readme-ov-file#ต้องการปรับปรุงฐานข้อมูล).

```typescript
import customDB from "./database/db.json";
const InputCustom = CreateInput({ database: customDB });
```

FAQ 2: **I want to ask you more.**

Please feel free to create an issue on GitHub. I would love to answer all questions, and PRs are always welcome.

## Changelog

Please see more [CHANGELOG.md](CHANGELOG.md)

## License

MIT © [buildingwatsize](https://github.com/buildingwatsize)

## Thanks a lot

- Amazing ideas:
  - [earthchie/jquery.Thailand.js](https://github.com/earthchie/jquery.Thailand.js)
  - [Sellsuki/thai-address-database](https://github.com/Sellsuki/thai-address-database)
  - [zapkub/react-thailand-address-typeahead](https://github.com/zapkub/react-thailand-address-typeahead)
  - [winChawakorn/react-thailand-address-autocomplete](https://github.com/winChawakorn/react-thailand-address-autocomplete)
  - [saintent/react-thailand-address](https://github.com/saintent/react-thailand-address)
