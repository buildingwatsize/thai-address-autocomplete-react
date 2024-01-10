# Document

This library will have 2 major part:

1. Initialize with `CreateInput`
2. Component Usage

## Table of Contents

- [Document](#document)
  - [Table of Contents](#table-of-contents)
  - [Configuration](#configuration)
    - [Default configuration](#default-configuration)
  - [1. Initialize with `CreateInput`](#1-initialize-with-createinput)
    - [Declare the (Component) variable](#declare-the-component-variable)
  - [2. Component Usage](#2-component-usage)
  - [Full Usage](#full-usage)
  - [Still confuse?](#still-confuse)

## Configuration

to be clear, the config will have 2 properties: `database` and `maxSearchResult` but they are not required. You can leave it empty. For the structure be show as below.

```typescript
interface Config {
  database?: CompatibleDatabase;
  maxSearchResult?: number;
}
```

which type `CompatibleDatabase` is the template of database from earthchie in the segment [#ต้องการปรับปรุงฐานข้อมูล](https://github.com/earthchie/jquery.Thailand.js/tree/master?tab=readme-ov-file#ต้องการปรับปรุงฐานข้อมูล).

### Default configuration

```typescript
// NOTE: defaultDatabase from directory lib/database/db.json
const DEFAULT_CONFIG = {
  database: defaultDatabase,
  maxSearchResult: 10,
};
```

## 1. Initialize with `CreateInput`

### Declare the (Component) variable

```typescript
import { CreateInput } from "thai-address-autocomplete-react";

// declare Input Component name after initialized (maybe define outside the component level)
const InputThaiAddress = CreateInput();
```

Example optional initialize with configuration

```typescript
// ==========
// [Optional]
// ==========

// With config: database
import customDB from "./database/db.json";

// use custom database file
const InputCustom = CreateInput({ database: customDB });

// or With optional config: max search result on input (default: 10)
const InputCustom = CreateInput({ maxSearchResult: 10 });

// or combined together
const InputCustom = CreateInput({ database: customDB, maxSearchResult: 10 });
```

> Note: in current version, I make the library support only json format.

## 2. Component Usage

After initialized, it will return for 4 sub-component:

1. `Component.District` for "ตำบล" data scope
2. `Component.Amphoe` for "อำเภอ" data scope
3. `Component.Province` for "จังหวัด" data scope
4. `Component.Zipcode` for "รหัสไปรษณีย์" data scope

to use, will be show as below

```tsx
...
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

const handleSelect = (addr: Address) => {
  setAddress(addr);
};

return (
  <>
    <InputThaiAddress.District
      value={address["district"]}
      onChange={handleChange("district")}
      onSelect={handleSelect}
    />

    <InputThaiAddress.Amphoe
      value={address["amphoe"]}
      onChange={handleChange("amphoe")}
      onSelect={handleSelect}
    />

    <InputThaiAddress.Province
      value={address["province"]}
      onChange={handleChange("province")}
      onSelect={handleSelect}
    />

    <InputThaiAddress.Zipcode
      value={address["zipcode"]}
      onChange={handleChange("zipcode")}
      onSelect={handleSelect}
    />
  </>
)
...
```

## Full Usage

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

## Still confuse?

Please do not hesitate to contact me If you have any questions or concerns.
