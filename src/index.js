import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  searchAddressByDistrict,
  searchAddressByAmphoe,
  searchAddressByProvince,
  searchAddressByZipcode
} from 'thai-address-database'
import { AutoComplete } from 'antd'
const { Option } = AutoComplete

class InputThaiAddress extends Component {
  state = {
    options: []
  }

  finder = (searchBy, txt) => {
    const { maxResult } = this.props
    switch (searchBy) {
      case 'subdistrict':
        return searchAddressByDistrict(txt).slice(0, maxResult)
      case 'district':
        return searchAddressByAmphoe(txt).slice(0, maxResult)
      case 'province':
        return searchAddressByProvince(txt).slice(0, maxResult)
      case 'zipcode':
        return searchAddressByZipcode(txt).slice(0, maxResult)
      default:
        return []
    }
  }

  handleSearch = (value) => {
    const { field, delimiter, filter, onChange } = this.props

    if (onChange) onChange(value)

    const foundData = this.finder(field, value)
    const filtered = filter ? foundData.filter(filter) : foundData
    this.setState({
      options: filtered.map((item, key) => {
        return {
          key,
          label: `${item.district}${delimiter}${item.amphoe}${delimiter}${item.province}${delimiter}${item.zipcode}`
          // ALSO WORK (SLOWER WAY)
          // label: [item.district, item.amphoe, item.province, item.zipcode].join(delimiter)
          // OR SLOWEST WAY
          // label: Object.values(item).join(delimiter)
          // See more bench: https://jsben.ch/NliUb
        }
      })
    })
  }

  handleSelect = (value) => {
    const { delimiter, onSelect } = this.props
    const addresses = value.split(delimiter)
    if (onSelect) {
      onSelect({
        subdistrict: addresses[0],
        district: addresses[1],
        province: addresses[2],
        zipcode: addresses[3]
      })
    }
  }

  render() {
    const { options } = this.state
    const { value, style, AntdAutoCompleteProps } = this.props

    return (
      <div>
        <AutoComplete
          value={value}
          style={{
            width: '100%',
            ...style
          }}
          onSearch={this.handleSearch}
          onSelect={this.handleSelect}
          {...AntdAutoCompleteProps}
        >
          {options.map((el) => (
            <Option key={el.key} value={el.label}>
              {el.label}
            </Option>
          ))}
        </AutoComplete>
      </div>
    )
  }
}

InputThaiAddress.defaultProps = {
  maxResult: 10,
  delimiter: ', ',
  AntdAutoCompleteProps: {},
  filter: (el) => el,
  onChange: () => {},
  onSelect: () => {}
}
InputThaiAddress.propTypes = {
  maxResult: PropTypes.number,
  delimiter: PropTypes.string,
  AntdAutoCompleteProps: PropTypes.shape({}),
  filter: PropTypes.func,
  onChange: PropTypes.func,
  onSelect: PropTypes.func
}
export default InputThaiAddress
