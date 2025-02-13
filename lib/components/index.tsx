import { AutoComplete, AutoCompleteProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import CSS from "csstype";
import { ReactNode, useState } from "react";

import { Address, Config, ThaiAddressFinder } from "../logic";

export interface Props {
  scope?: string;
  delimiter?: string;
  value?: string;
  filter?: (value?: Address, index?: number, array?: Address[]) => boolean;
  onChange?: (value: string) => void;
  onSelect?: (address: Address) => void;
  style?: CSS.Properties;
  className?: string;
  autoCompleteProps?: AutoCompleteProps;
}

const DefaultProps = {
  scope: "province",
  delimiter: ", ",
  value: "",
  filter: () => true,
  onChange: () => null,
  onSelect: () => null,
  style: {},
  className: "",
  autoCompleteProps: {},
};

// hoc for config wrapped
export const CreateInput = (config?: Config) => {
  // utilities
  const finder = new ThaiAddressFinder(config);

  // component
  const InputThaiAddress = ({
    scope = DefaultProps.scope,
    delimiter = DefaultProps.delimiter,
    value = DefaultProps.value,
    filter = DefaultProps.filter,
    onChange = DefaultProps.onChange,
    onSelect = DefaultProps.onSelect,
    style = DefaultProps.style,
    className = DefaultProps.className,
    autoCompleteProps = DefaultProps.autoCompleteProps,
  }: Props = DefaultProps): React.ReactNode => {
    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    const findAndFilter = (txt: string) => {
      let result: Address[] = [];
      switch (scope) {
        case "district":
          result = finder.SearchAddressByDistrict(txt, filter);
          break;
        case "amphoe":
          result = finder.SearchAddressByAmphoe(txt, filter);
          break;
        case "province":
          result = finder.SearchAddressByProvince(txt, filter);
          break;
        case "zipcode":
          result = finder.SearchAddressByZipcode(txt, filter);
          break;
        default:
          break;
      }
      return result;
    };

    const handleSearch = (value: string) => {
      if (onChange) onChange(value);
      const filtered = findAndFilter(value);
      const optionsWithFilter = filtered.map((item) => {
        const label = `${item.district}${delimiter}${item.amphoe}${delimiter}${item.province}${delimiter}${item.zipcode}`;
        return {
          key: label,
          label: label,
          value: label,
        };
      });
      setOptions(optionsWithFilter);
    };

    const handleSelect = (value: string) => {
      const addresses = value.split(delimiter);
      if (onSelect) {
        onSelect({
          district: addresses[0],
          amphoe: addresses[1],
          province: addresses[2],
          zipcode: addresses[3],
        });
      }
    };

    return (
      <AutoComplete
        value={value}
        style={{ width: "100%", ...style }}
        className={className}
        options={options}
        onSearch={handleSearch}
        onSelect={handleSelect}
        {...autoCompleteProps}
      />
    );
  };

  // return with sub components (by scope)
  return {
    District: (props: Props = DefaultProps): ReactNode => (
      <InputThaiAddress {...props} scope="district" />
    ),
    Amphoe: (props: Props = DefaultProps): ReactNode => (
      <InputThaiAddress {...props} scope="amphoe" />
    ),
    Province: (props: Props = DefaultProps): ReactNode => (
      <InputThaiAddress {...props} scope="province" />
    ),
    Zipcode: (props: Props = DefaultProps): ReactNode => (
      <InputThaiAddress {...props} scope="zipcode" />
    ),
  };
};
