import { describe, expect, it } from "vitest";

import { ThaiAddressFinder } from "./index";

describe("ThaiAddressFinder", () => {
  const finder = new ThaiAddressFinder();

  describe("constructor", () => {
    it("should instantiate with default config", () => {
      const config = finder.GetConfig();
      expect(config.maxSearchResult).toBe(10);
      expect(config.database).toBeDefined();
    });

    it("should accept custom maxSearchResult", () => {
      const custom = new ThaiAddressFinder({ maxSearchResult: 5 });
      const config = custom.GetConfig();
      expect(config.maxSearchResult).toBe(5);
    });
  });

  describe("SearchAddressByDistrict", () => {
    it("should find districts matching search string", () => {
      const results = finder.SearchAddressByDistrict("คลอง");
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.district.includes("คลอง"))).toBe(true);
    });

    it("should return empty array for empty search string", () => {
      const results = finder.SearchAddressByDistrict("");
      expect(results).toEqual([]);
    });

    it("should return empty array for whitespace search", () => {
      const results = finder.SearchAddressByDistrict("   ");
      expect(results).toEqual([]);
    });

    it("should respect maxSearchResult limit", () => {
      const limited = new ThaiAddressFinder({ maxSearchResult: 3 });
      const results = limited.SearchAddressByDistrict("บ้าน");
      expect(results.length).toBeLessThanOrEqual(3);
    });

    it("should apply custom filter", () => {
      const results = finder.SearchAddressByDistrict(
        "คลอง",
        (addr) => addr?.province === "กรุงเทพมหานคร",
      );
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.province === "กรุงเทพมหานคร")).toBe(true);
    });

    it("should return empty for non-matching search", () => {
      const results = finder.SearchAddressByDistrict("zzznonexist999");
      expect(results).toEqual([]);
    });
  });

  describe("SearchAddressByAmphoe", () => {
    it("should find amphoes matching search string", () => {
      const results = finder.SearchAddressByAmphoe("เมือง");
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.amphoe.includes("เมือง"))).toBe(true);
    });

    it("should return empty for empty string", () => {
      expect(finder.SearchAddressByAmphoe("")).toEqual([]);
    });
  });

  describe("SearchAddressByProvince", () => {
    it("should find provinces matching search string", () => {
      const results = finder.SearchAddressByProvince("เชียงใหม่");
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.province.includes("เชียงใหม่"))).toBe(true);
    });

    it("should return empty for empty string", () => {
      expect(finder.SearchAddressByProvince("")).toEqual([]);
    });
  });

  describe("SearchAddressByZipcode", () => {
    it("should find zipcodes matching search string", () => {
      const results = finder.SearchAddressByZipcode("10100");
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.zipcode.includes("10100"))).toBe(true);
    });

    it("should return empty for empty string", () => {
      expect(finder.SearchAddressByZipcode("")).toEqual([]);
    });
  });

  describe("GetConfig", () => {
    it("should return the config object", () => {
      const config = finder.GetConfig();
      expect(config).toHaveProperty("database");
      expect(config).toHaveProperty("maxSearchResult");
    });
  });

  describe("edge cases", () => {
    it("should handle invalid regex gracefully", () => {
      const results = finder.SearchAddressByDistrict("[invalid(");
      expect(results).toEqual([]);
    });

    it("should handle special regex characters in search", () => {
      const results = finder.SearchAddressByDistrict(".*");
      expect(results.length).toBeGreaterThan(0);
    });
  });
});
