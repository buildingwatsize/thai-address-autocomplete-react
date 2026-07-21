import { useCallback, useMemo, useRef, useState } from "react";

import { type Address, type Config, ThaiAddressFinder } from "../logic";

export type Scope = "district" | "amphoe" | "province" | "zipcode";

export interface GroupedSuggestions {
  province: string;
  items: Address[];
}

export interface UseThaiAddressOptions {
  scope: Scope;
  config?: Config;
  filter?: (value?: Address, index?: number, array?: Address[]) => boolean;
  grouped?: boolean;
  delimiter?: string;
}

export interface UseThaiAddressReturn {
  suggestions: Address[];
  groupedSuggestions: GroupedSuggestions[];
  search: (text: string) => void;
  select: (address: Address) => void;
  clear: () => void;
  isOpen: boolean;
}

export function useThaiAddress({
  scope,
  config,
  filter,
  grouped = true,
}: UseThaiAddressOptions): UseThaiAddressReturn {
  const finderRef = useRef<ThaiAddressFinder | null>(null);
  if (finderRef.current == null) {
    finderRef.current = new ThaiAddressFinder(config);
  }

  const [suggestions, setSuggestions] = useState<Address[]>([]);

  const searchByScope = useCallback(
    (finder: ThaiAddressFinder, text: string): Address[] => {
      switch (scope) {
        case "district":
          return finder.SearchAddressByDistrict(text, filter);
        case "amphoe":
          return finder.SearchAddressByAmphoe(text, filter);
        case "province":
          return finder.SearchAddressByProvince(text, filter);
        case "zipcode":
          return finder.SearchAddressByZipcode(text, filter);
        default:
          return [];
      }
    },
    [scope, filter],
  );

  const search = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setSuggestions([]);
        return;
      }
      const results = searchByScope(finderRef.current!, text);
      setSuggestions(results);
    },
    [searchByScope],
  );

  const select = useCallback((_address: Address) => {
    setSuggestions([]);
  }, []);

  const clear = useCallback(() => {
    setSuggestions([]);
  }, []);

  const groupedSuggestions = useMemo((): GroupedSuggestions[] => {
    if (!grouped) return [];
    const groups = new Map<string, Address[]>();
    for (const item of suggestions) {
      const existing = groups.get(item.province);
      if (existing) {
        existing.push(item);
      } else {
        groups.set(item.province, [item]);
      }
    }
    const result: GroupedSuggestions[] = [];
    for (const [province, items] of groups) {
      result.push({ province, items });
    }
    return result;
  }, [suggestions, grouped]);

  const isOpen = suggestions.length > 0;

  return {
    suggestions,
    groupedSuggestions,
    search,
    select,
    clear,
    isOpen,
  };
}
