# thai-address-autocomplete-react

[![NPM](https://img.shields.io/npm/v/thai-address-autocomplete-react.svg)](https://www.npmjs.com/package/thai-address-autocomplete-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![NPM](https://img.shields.io/badge/BAAC-Library-289548)](https://www.npmjs.com/package/thaidatepicker-react)

## 📘 About

Thai-address-autocomplete-react is an input component for ReactJS, which can auto-complete thailand address with a magic by `just type something`. You can discover more props please see [react-autocomplete](https://www.npmjs.com/package/react-autocomplete), so I hope this component will be a useful thing to you :D. Happy Coding.

## 📋 Features

- `maxResult`: Count of result on Dropdown (default: 10)
- `delimiter`: Delimiter between field value (default: ", ")
- `filter`: A function for filtering for more detail please go to example.
- `style`: Define your beauty.
- `AntdAutoCompleteProps`: for more props, please go to [https://ant.design/components/auto-complete/#API](https://ant.design/components/auto-complete/#API)

## 📝 Example

Please go to `example` directory or click to [App.js](./example/src/App.js)

- Online Demo: [Demo](https://buildingwatsize.github.io/thai-address-autocomplete-react)

## ⚙ Install

```bash
npm install --save thai-address-autocomplete-react
# or just `yarn add thai-address-autocomplete-react`
```

## 📌 Usage

```jsx
import React, { Component } from 'react'
import InputThaiAddress from 'thai-address-autocomplete-react'

class Example extends Component {
  state = {
    subdistrict: "", // tambon
    district: "", // amphoe
    province: "", // jangwat
    zipcode: "", // postal code
  }
  onChange = (targetName) => (targetValue) => {
    console.log(targetName, targetValue);
    this.setState({ [targetName]: targetValue })
  }
  onSelect = (addresses) => {
    const { subdistrict, district, province, zipcode } = addresses
    this.setState({ subdistrict, district, province, zipcode })
    // or this.setState({ ...addresses })
  }
  render() {
    const {
      subdistrict,
      district,
      province,
      zipcode,
    } = this.state
    return (
      <div>
        <label>ตำบล</label>
        <InputThaiAddress
          field={"subdistrict"}
          value={subdistrict}
          onChange={this.onChange("subdistrict")}
          onSelect={this.onSelect}
        />
        <label>อำเภอ</label>
        <InputThaiAddress
          field={"district"}
          value={district}
          onChange={this.onChange("district")}
          onSelect={this.onSelect}
        />
        <label>จังหวัด</label>
        <InputThaiAddress
          field={"province"}
          value={province}
          onChange={this.onChange("province")}
          onSelect={this.onSelect}
        />
        <label>รหัสไปรษณีย์</label>
        <InputThaiAddress
          field={"zipcode"}
          value={zipcode}
          onChange={this.onChange("zipcode")}
          onSelect={this.onSelect}
        />
      </div>
    )
  }
}

export default Example
```

### Filtering

> When you want to filtering, please use `Field in raw data`.

| Meaning   | Field in component | Field in raw data |
|-----------|--------------------|-------------------|
| ตำบล/แขวง | subdistrict        | district          |
| อำเภอ/เขต | district           | amphoe            |
| จังหวัด     | province           | province          |
| รหัสไปรษณีย์ | zipcode            | zipcode           |

## License

MIT © [buildingwatsize](https://github.com/buildingwatsize)

## ⚒ Thanks a lot

- [Ant Design](https://ant.design/)
- [Sellsuki/thai-address-database](https://github.com/Sellsuki/thai-address-database)
- Idea from:
  - [earthchie/jquery.Thailand.js](https://github.com/earthchie/jquery.Thailand.js)
  - [zapkub/react-thailand-address-typeahead](https://github.com/zapkub/react-thailand-address-typeahead)
  - [winChawakorn/react-thailand-address-autocomplete](https://github.com/winChawakorn/react-thailand-address-autocomplete)
