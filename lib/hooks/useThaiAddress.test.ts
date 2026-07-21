import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useThaiAddress } from "./useThaiAddress";
import type { Address } from "../logic";

describe("useThaiAddress", () => {
  describe("initial state", () => {
    it("should return empty suggestions initially", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      expect(result.current.suggestions).toEqual([]);
      expect(result.current.groupedSuggestions).toEqual([]);
      expect(result.current.isOpen).toBe(false);
    });

    it("should return stable function references", () => {
      const { result, rerender } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      const firstSearch = result.current.search;
      const firstSelect = result.current.select;
      const firstClear = result.current.clear;

      rerender();

      expect(result.current.search).toBe(firstSearch);
      expect(result.current.select).toBe(firstSelect);
      expect(result.current.clear).toBe(firstClear);
    });
  });

  describe("search", () => {
    it("should return results when searching by district", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("บ้านฝาง");
      });

      expect(result.current.suggestions.length).toBeGreaterThan(0);
      expect(result.current.isOpen).toBe(true);
      expect(
        result.current.suggestions.every((s) => s.district.includes("บ้านฝาง")),
      ).toBe(true);
    });

    it("should return results when searching by amphoe", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "amphoe" }),
      );

      act(() => {
        result.current.search("เมือง");
      });

      expect(result.current.suggestions.length).toBeGreaterThan(0);
      expect(result.current.isOpen).toBe(true);
      expect(
        result.current.suggestions.every((s) => s.amphoe.includes("เมือง")),
      ).toBe(true);
    });

    it("should return results when searching by province", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "province" }),
      );

      act(() => {
        result.current.search("กรุงเทพ");
      });

      expect(result.current.suggestions.length).toBeGreaterThan(0);
      expect(
        result.current.suggestions.every((s) =>
          s.province.includes("กรุงเทพ"),
        ),
      ).toBe(true);
    });

    it("should return results when searching by zipcode", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "zipcode" }),
      );

      act(() => {
        result.current.search("10100");
      });

      expect(result.current.suggestions.length).toBeGreaterThan(0);
      expect(
        result.current.suggestions.every((s) => s.zipcode.includes("10100")),
      ).toBe(true);
    });

    it("should return empty results for empty string", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("บ้านฝาง");
      });
      expect(result.current.suggestions.length).toBeGreaterThan(0);

      act(() => {
        result.current.search("");
      });
      expect(result.current.suggestions).toEqual([]);
      expect(result.current.isOpen).toBe(false);
    });

    it("should return empty results for whitespace-only string", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("   ");
      });

      expect(result.current.suggestions).toEqual([]);
      expect(result.current.isOpen).toBe(false);
    });

    it("should return empty for non-matching query", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("xyznonexistent999");
      });

      expect(result.current.suggestions).toEqual([]);
      expect(result.current.isOpen).toBe(false);
    });

    it("should return empty array for unknown scope", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "unknown" as any }),
      );

      act(() => {
        result.current.search("กรุงเทพ");
      });

      expect(result.current.suggestions).toEqual([]);
    });
  });

  describe("select", () => {
    it("should clear suggestions on select", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("บ้านฝาง");
      });
      expect(result.current.suggestions.length).toBeGreaterThan(0);

      const addr = result.current.suggestions[0];
      act(() => {
        result.current.select(addr);
      });

      expect(result.current.suggestions).toEqual([]);
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe("clear", () => {
    it("should clear all suggestions", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("บ้านฝาง");
      });
      expect(result.current.suggestions.length).toBeGreaterThan(0);

      act(() => {
        result.current.clear();
      });

      expect(result.current.suggestions).toEqual([]);
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe("grouped option", () => {
    it("should group suggestions by province when grouped=true", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district", grouped: true }),
      );

      act(() => {
        result.current.search("บ้าน");
      });

      expect(result.current.groupedSuggestions.length).toBeGreaterThan(0);

      for (const group of result.current.groupedSuggestions) {
        expect(group.province).toBeTruthy();
        expect(group.items.length).toBeGreaterThan(0);
        expect(group.items.every((item) => item.province === group.province)).toBe(true);
      }
    });

    it("should return empty groupedSuggestions when grouped=false", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district", grouped: false }),
      );

      act(() => {
        result.current.search("บ้าน");
      });

      expect(result.current.suggestions.length).toBeGreaterThan(0);
      expect(result.current.groupedSuggestions).toEqual([]);
    });

    it("should default grouped to true", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("บ้าน");
      });

      expect(result.current.groupedSuggestions.length).toBeGreaterThan(0);
    });

    it("should have all suggestions represented in groups", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district", grouped: true }),
      );

      act(() => {
        result.current.search("บ้าน");
      });

      const totalGrouped = result.current.groupedSuggestions.reduce(
        (sum, g) => sum + g.items.length,
        0,
      );
      expect(totalGrouped).toBe(result.current.suggestions.length);
    });
  });

  describe("filter", () => {
    it("should filter results using custom filter function", () => {
      const filterFn = (addr?: Address) => addr?.province === "ขอนแก่น";

      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district", filter: filterFn }),
      );

      act(() => {
        result.current.search("บ้าน");
      });

      expect(result.current.suggestions.length).toBeGreaterThan(0);
      expect(
        result.current.suggestions.every((s) => s.province === "ขอนแก่น"),
      ).toBe(true);
    });

    it("should return empty when filter excludes all results", () => {
      const filterFn = () => false;

      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district", filter: filterFn }),
      );

      act(() => {
        result.current.search("บ้าน");
      });

      expect(result.current.suggestions).toEqual([]);
    });
  });

  describe("config", () => {
    it("should accept custom config with maxSearchResult", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district", config: { maxSearchResult: 3 } }),
      );

      act(() => {
        result.current.search("บ้าน");
      });

      expect(result.current.suggestions.length).toBeLessThanOrEqual(3);
    });
  });

  describe("isOpen", () => {
    it("should be false when no suggestions", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );
      expect(result.current.isOpen).toBe(false);
    });

    it("should be true when suggestions exist", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("บ้านฝาง");
      });

      expect(result.current.isOpen).toBe(true);
    });

    it("should become false after clear", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("บ้านฝาง");
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.clear();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it("should become false after select", () => {
      const { result } = renderHook(() =>
        useThaiAddress({ scope: "district" }),
      );

      act(() => {
        result.current.search("บ้านฝาง");
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.select(result.current.suggestions[0]);
      });
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe("scope changes", () => {
    it("should search with new scope when scope prop changes", () => {
      const { result, rerender } = renderHook(
        ({ scope }: { scope: "district" | "amphoe" | "province" | "zipcode" }) => useThaiAddress({ scope }),
        { initialProps: { scope: "district" as const } },
      );

      act(() => {
        result.current.search("กรุงเทพ");
      });

      const districtResults = [...result.current.suggestions];

      rerender({ scope: "province" });

      act(() => {
        result.current.search("กรุงเทพ");
      });

      expect(result.current.suggestions).not.toEqual(districtResults);
      expect(
        result.current.suggestions.every((s) =>
          s.province.includes("กรุงเทพ"),
        ),
      ).toBe(true);
    });
  });
});
