import { Combobox } from "@base-ui/react/combobox";
import { clsx } from "clsx";
import {
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

import { type Address, type Config } from "../logic";
import { type Scope, useThaiAddress } from "../hooks/useThaiAddress";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface Props {
  scope?: string;
  delimiter?: string;
  value?: string;
  filter?: (value?: Address, index?: number, array?: Address[]) => boolean;
  onChange?: (value: string) => void;
  onSelect?: (address: Address) => void;
  style?: CSSProperties;
  className?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement> & Record<string, unknown>;
  listClassName?: string;
  clearable?: boolean;
  autoHighlight?: boolean;
  grouped?: boolean;
}

interface OptionItem {
  key: string;
  label: string;
  value: string;
}

interface GroupedOptionItems {
  province: string;
  items: OptionItem[];
}

const THEME = {
  input: "#e2e8f0",
  ring: "#3b82f6",
  bg: "#ffffff",
  fg: "#0f172a",
  popover: "#ffffff",
  popoverFg: "#0f172a",
  accent: "#f1f5f9",
  accentFg: "#0f172a",
  muted: "#64748b",
  separator: "rgba(15, 23, 42, 0.1)",
};

const inputStyle: CSSProperties = {
  width: "100%",
  borderRadius: "0.375rem",
  border: `1px solid var(--color-input, ${THEME.input})`,
  backgroundColor: `var(--color-background, ${THEME.bg})`,
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: `var(--color-foreground, ${THEME.fg})`,
  outline: "none",
};

const inputFocusRing = `0 0 0 2px var(--color-ring, ${THEME.ring})`;

const listStyle: CSSProperties = {
  maxHeight: "15rem",
  overflow: "auto",
  borderRadius: "0.375rem",
  backgroundColor: `var(--color-popover, ${THEME.popover})`,
  padding: "0.25rem",
  color: `var(--color-popover-foreground, ${THEME.popoverFg})`,
  boxShadow: `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1), 0 0 0 1px ${THEME.separator}`,
};

const optionStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  cursor: "pointer",
  userSelect: "none",
  alignItems: "center",
  borderRadius: "0.125rem",
  padding: "0.375rem 0.5rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
};

const HIGHLIGHT_CSS_ID = "thai-addr-highlight-css";

function ensureHighlightCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById(HIGHLIGHT_CSS_ID)) return;
  const style = document.createElement("style");
  style.id = HIGHLIGHT_CSS_ID;
  style.textContent = `[data-thai-addr-option][data-highlighted]{background-color:var(--color-accent,${THEME.accent});color:var(--color-accent-foreground,${THEME.accentFg})}`;
  document.head.appendChild(style);
}

const groupLabelStyle: CSSProperties = {
  padding: "0.375rem 0.5rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: `var(--color-muted-foreground, ${THEME.muted})`,
};

const separatorStyle: CSSProperties = {
  margin: "0.25rem 0",
  height: "1px",
  backgroundColor: THEME.separator,
};

const clearBtnStyle: CSSProperties = {
  position: "absolute",
  right: "0.5rem",
  top: "50%",
  transform: "translateY(-50%)",
  display: "inline-flex",
  width: "1.25rem",
  height: "1.25rem",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9999px",
  border: "none",
  backgroundColor: "transparent",
  color: `var(--color-muted-foreground, ${THEME.muted})`,
  cursor: "pointer",
  padding: 0,
};

const DefaultProps: Required<
  Omit<Props, "inputProps" | "listClassName" | "clearable" | "autoHighlight" | "grouped">
> = {
  scope: "province",
  delimiter: ", ",
  value: "",
  filter: () => true,
  onChange: () => null,
  onSelect: () => null,
  style: {},
  className: "",
};

export const CreateInput = (config?: Config) => {
  const InputThaiAddress = ({
    scope = DefaultProps.scope,
    delimiter = DefaultProps.delimiter,
    value = DefaultProps.value,
    filter = DefaultProps.filter,
    onChange = DefaultProps.onChange,
    onSelect = DefaultProps.onSelect,
    style = DefaultProps.style,
    className = DefaultProps.className,
    inputProps,
    listClassName,
    clearable = true,
    autoHighlight = true,
    grouped = true,
  }: Props): ReactNode => {
    const { groupedSuggestions, search, clear, isOpen } = useThaiAddress({
      scope: scope as Scope,
      config,
      filter,
      grouped: true,
      delimiter,
    });

    const [focused, setFocused] = useState(false);

    ensureHighlightCSS();

    const handleInputValueChange = (
      inputValue: string,
      eventDetails: { reason: string },
    ) => {
      if (eventDetails.reason === "input-change") {
        onChange(inputValue);
        search(inputValue);
      } else if (eventDetails.reason === "clear-press") {
        onChange("");
        clear();
      }
    };

    const handleValueChange = (selected: string | null) => {
      if (!selected) return;
      clear();
      const addresses = selected.split(delimiter);
      onSelect({
        district: addresses[0],
        amphoe: addresses[1],
        province: addresses[2],
        zipcode: addresses[3],
      });
    };

    const handleClear = () => {
      onChange("");
      clear();
    };

    const handleOpenChange = (nextOpen: boolean) => {
      if (!nextOpen) {
        clear();
      }
    };

    const optionItems: GroupedOptionItems[] = groupedSuggestions.map((group) => ({
      province: group.province,
      items: group.items.map((item) => ({
        key: [item.district, item.amphoe, item.province, item.zipcode].join(delimiter),
        label: [item.district, item.amphoe, item.zipcode].join(delimiter),
        value: [item.district, item.amphoe, item.province, item.zipcode].join(delimiter),
      })),
    }));

    const { className: inputClassName, style: inputStyleOverride, ...restInputProps } = inputProps ?? {};

    return (
      <Combobox.Root<string>
        value={null}
        onValueChange={handleValueChange}
        inputValue={value}
        onInputValueChange={handleInputValueChange}
        autoHighlight={autoHighlight}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <div
          className={cn(className)}
          style={{ position: "relative", display: "flex", alignItems: "center", ...style }}
        >
          <Combobox.Input
            className={cn(inputClassName)}
            style={{
              ...inputStyle,
              ...(focused ? { boxShadow: inputFocusRing } : {}),
              ...(clearable && value ? { paddingRight: "2rem" } : {}),
              ...inputStyleOverride,
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...restInputProps}
          />
          {clearable && value && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Clear"
              style={clearBtnStyle}
              onMouseDown={(e) => {
                e.preventDefault();
                handleClear();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={14}
                height={14}
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
        <Combobox.Portal>
          <Combobox.Positioner side="bottom" sideOffset={4} align="start" style={{ zIndex: 50 }}>
            <Combobox.Popup className={cn(listClassName)} style={listStyle}>
              <Combobox.List>
                {grouped
                  ? optionItems.map((group, groupIdx) => (
                      <Combobox.Group key={group.province}>
                        {groupIdx > 0 && (
                          <Combobox.Separator style={separatorStyle} />
                        )}
                        <Combobox.GroupLabel style={groupLabelStyle}>
                          {group.province}
                        </Combobox.GroupLabel>
                        {group.items.map((opt) => (
                          <Combobox.Item
                            key={opt.key}
                            value={opt.value}
                            style={optionStyle}
                            data-thai-addr-option=""
                          >
                            {opt.label}
                          </Combobox.Item>
                        ))}
                      </Combobox.Group>
                    ))
                  : optionItems.flatMap((group) =>
                      group.items.map((opt) => (
                        <Combobox.Item
                          key={opt.key}
                          value={opt.value}
                          style={optionStyle}
                          data-thai-addr-option=""
                        >
                          {opt.label}
                        </Combobox.Item>
                      )),
                    )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    );
  };

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
