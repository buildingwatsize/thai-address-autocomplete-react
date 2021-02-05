import React, { Component } from 'react'
import InputThaiAddress from 'thai-address-autocomplete-react'

import styles from './App.module.css'
class App extends Component {
  state = {
    subdistrict: "", // tambon
    district: "", // amphoe
    province: "", // jangwat
    zipcode: "", // postal code
    fulladdr: "", // full addr
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
  onSelectFullAddr = (addresses) => {
    this.setState({ fulladdr: Object.values(addresses).join(", ") })
  }
  render() {
    const {
      subdistrict,
      district,
      province,
      zipcode,
      fulladdr,
    } = this.state
    return (
      <div className={styles.paddingDocument}>
        <h2>Example React Component – Thai Auto-complete Address react by <a href="https://github.com/buildingwatsize">buildingwatsize</a></h2>
        <div><code>Try it yourself!</code></div>
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
        <br />
        <h3>More Style</h3>
        <label>Allow Clear When Hover</label>
        <InputThaiAddress
          field={"subdistrict"}
          AntdAutoCompleteProps={{ // for more: https://ant.design/components/auto-complete/#API
            allowClear: true
          }}
        />
        <label>Placeholder + Disabled</label>
        <InputThaiAddress
          AntdAutoCompleteProps={{ // for more: https://ant.design/components/auto-complete/#API
            placeholder: "กรุณากรอกตำบล",
            disabled: true
          }}
        />

        <br />
        <h3>Additional Props</h3>
        <label>`maxResult` is only 5 items (Search by zipcode)</label>
        <InputThaiAddress
          field={"zipcode"}
          maxResult={5}
        />
        <label>`delimiter` with "|" (Search by zipcode)</label>
        <InputThaiAddress
          field={"zipcode"}
          delimiter={"|"}
        />
        <label>`filter` zipcode by Endswith "20"</label>
        <InputThaiAddress
          field={"zipcode"}
          filter={(el) => el?.zipcode?.toString().endsWith("20")}
        />
        <label>Show all data (Search by sub-district(tambon))</label>
        <InputThaiAddress
          field={"subdistrict"}
          value={fulladdr}
          onChange={this.onChange("fulladdr")}
          onSelect={this.onSelectFullAddr}
        />

        <br />
        <br />
        <div style={{ color: "red" }}>
          NOTE: This library have to work with Ant Design `hint: don't forget to import css.`
        </div>
      </div>
    )
  }
}

export default App
