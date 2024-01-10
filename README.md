# thai-address-autocomplete-react

[![NPM](https://img.shields.io/npm/v/thai-address-autocomplete-react)](https://www.npmjs.com/package/thai-address-autocomplete-react)
[![NPM](https://img.shields.io/badge/Watsize-Library-289548)](https://www.npmjs.com/package/thai-address-autocomplete-react)
[![Downloads](https://img.shields.io/npm/dm/thai-address-autocomplete-react.svg)](https://npmjs.org/package/thai-address-autocomplete-react)

## 🎉 RELEASE v1 🎉

Get back to active!. I hope this library will be useful for all you guy. Welcome all PR as always. Thanks.

## 📘 About

thai-address-autocomplete-react is an input component for ReactJS that can auto-complete Thai addresses with magic by `just typing something`. Anyway I hope this component will be a useful thing to you. :D Happy Coding.

## ⚙ Install

```bash
npm install thai-address-autocomplete-react
# or just `yarn add thai-address-autocomplete-react`
```

## 📌 Example Usage

```tsx
import { useState } from "react";
import { Address, CreateInput } from "thai-address-autocomplete-react";

const InputThaiAddress = CreateInput();

const App = () => {
  const [address, setAddress] = useState<Address>({
    district: "", // ตำบล tambol
    amphoe: "", // อำเภอ amphoe
    province: "", // จังหวัด changwat
    zipcode: "", // รหัสไปรษณีย์ postal code
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
      />
      <label>อำเภอ</label>
      <InputThaiAddress.Amphoe
        value={address["amphoe"]}
        onChange={handleChange("amphoe")}
        onSelect={handleSelect}
      />
      <label>จังหวัด</label>
      <InputThaiAddress.Province
        value={address["province"]}
        onChange={handleChange("province")}
        onSelect={handleSelect}
      />
      <label>รหัสไปรษณีย์</label>
      <InputThaiAddress.Zipcode
        value={address["zipcode"]}
        onChange={handleChange("zipcode")}
        onSelect={handleSelect}
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

| **Property**          | **Description**                                                                                       | **Type**                                                          | **Default** |
|-----------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|-------------|
| **scope**             | field name from record. Possible value will be "district", "amphoe", "province", and "zipcode".       | _string_                                                          | "province"  |
| **delimiter**         | delimiter between scope values, which will show inside options in the autocomplete.                   | _string_                                                          | ", "        |
| **value**             | value by scope.                                                                                       | _string_                                                          | ""          |
| **filter**            | array filter function, used for fine grain result of options or fixed something on the result.        | _(value?: Address, index?: number, array?: Address[]) => boolean_ | () => true  |
| **onChange**          | function callback, trigger on input changes.                                                          | _(value: string) => void_                                         | () => null  |
| **onSelect**          | function callback, trigger on select the option.                                                      | _(address: Address) => void_                                      | () => null  |
| **style**             | "Fashions fade, style is eternal." — Yves Saint Laurent                                               | _CSS.Properties_                                                  | {}          |
| **className**         | css class...name.                                                                                     | _string_                                                          | ""          |
| **autoCompleteProps** | the override properties of AutoComplete: check out `https://ant.design/components/auto-complete#api`. | _AutoCompleteProps_                                               | {}          |

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

## 📝 Need More Example?

- Example Project: [./example](./example)
- more Document: [./docs](./docs/README.md)
- Online Demo: [Demo](https://thai-address-autocomplete-react-watsize.vercel.app)
- or Online Editor (JavaScript): [StackBlitz](https://stackblitz.com/edit/thai-address-autocomplete-react-demo-javascript?file=src%2FApp.jsx)
- or Online Editor (TypeScript): [StackBlitz](https://stackblitz.com/edit/thai-address-autocomplete-react-demo-typescript?file=src%2FApp.jsx)

## 🙋 FAQ?

FAQ 1: **Can I use custom database ?**

Yes, but to use custom database (in this version). It supports only `JSON format` file that output from [Database Tools by earthchie](https://github.com/earthchie/jquery.Thailand.js/tree/master?tab=readme-ov-file#ต้องการปรับปรุงฐานข้อมูล).

```typescript
// 1. import json
import customDB from "./database/db.json";

// 2. used by put in the configuration before initialize component
const InputCustom = CreateInput({ database: customDB });
```

FAQ 2: **I want to ask you more.**

I provide a simple document on [./docs](./docs/README.md) to describe how to use this library.

But if you're not found what you want to know, please feel free to create an issue on GitHub. I would love to answer all of the questions, and I am also welcome for all the PR. ❤️

## 𝌡 Changelog

Please see more [CHANGELOG.md](CHANGELOG.md)

## License

MIT © [buildingwatsize](https://github.com/buildingwatsize)

## ⚒ Thanks a lot

- Base component:
  - [ant-design/auto-complete](https://ant.design/components/auto-complete)
- Amazing ideas:
  - [earthchie/jquery.Thailand.js](https://github.com/earthchie/jquery.Thailand.js)
  - [Sellsuki/thai-address-database](https://github.com/Sellsuki/thai-address-database)
  - [zapkub/react-thailand-address-typeahead](https://github.com/zapkub/react-thailand-address-typeahead)
  - [winChawakorn/react-thailand-address-autocomplete](https://github.com/winChawakorn/react-thailand-address-autocomplete)
  - [saintent/react-thailand-address](https://github.com/saintent/react-thailand-address)
