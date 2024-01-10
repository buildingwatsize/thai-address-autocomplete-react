import defaultDatabase from "../database/db.json";
const DEFAULT_CONFIG = {
  database: defaultDatabase,
  maxSearchResult: 10,
};

export interface Address {
  district: string;
  amphoe: string;
  province: string;
  zipcode: string;
}

export interface CompatibleDatabase {
  lookup: string;
  words: string;
  data: any[]; // eslint-disable-line
}

export interface Config {
  database?: CompatibleDatabase;
  maxSearchResult?: number;
}

export class ThaiAddressFinder {
  #config: Config & {
    database: CompatibleDatabase;
    maxSearchResult: number;
  };
  #records: Address[];

  constructor({
    database = DEFAULT_CONFIG.database,
    maxSearchResult = DEFAULT_CONFIG.maxSearchResult,
  }: Config = DEFAULT_CONFIG) {
    this.#config = {
      database: database,
      maxSearchResult: maxSearchResult,
    };
    this.#records = this.preProcess();
  }

  // preProcess: modified with simple typescript from original: https://github.com/earthchie/jquery.Thailand.js/blob/aaa03d6030350e8253dd42dc003ccc2cbf17ad86/jquery.Thailand.js/src/jquery.Thailand.js#L19-L76
  private preProcess = (): Address[] => {
    const { database } = this.#config;
    let lookup: string[] = [];
    let words: string[] = [];
    let data: Array<[string | number, ...any]> = [];
    const expanded: Address[] = [];

    if (database.lookup && database.words) {
      // compact with dictionary and lookup
      lookup = database.lookup.split("|");
      words = database.words.split("|");
      data = database.data;
    }

    const transform = (text: string | number) => {
      const repl = (m: string) => {
        var ch = m.charCodeAt(0);
        return words[ch < 97 ? ch - 65 : 26 + ch - 97];
      };

      if (typeof text === "number") {
        text = lookup[text];
      }
      return text.replace(/[A-Z]/gi, repl);
    };

    // decompacted database in hierarchical form of:
    // [["province",[["amphur",[["district",["zip"...]]...]]...]]...]
    data.map((provinces) => {
      let i = 1;
      if (provinces.length === 3) {
        // geographic database
        i = 2;
      }
      provinces[i].map((amphoes: any[]) => {
        amphoes[i].map((districts: any[]) => {
          districts[i] =
            districts[i] instanceof Array ? districts[i] : [districts[i]];
          districts[i].map((zipcode: string | number) => {
            const entry = {
              district: transform(districts[0]),
              amphoe: transform(amphoes[0]),
              province: transform(provinces[0]),
              zipcode: `${zipcode}`,
            };
            expanded.push(entry);
          });
        });
      });
    });
    return expanded;
  };

  // resolveResultByField: modified with simple typescript from original: https://github.com/Sellsuki/thai-address-database/blob/bc96150da66cfbaf35a886f5e0f2cb6df33210e5/lib/index.js#L78-L109
  private resolveResultByField = (
    scope: keyof Address,
    searchStr: string = "",
    filter?: (value?: Address, index?: number, array?: Address[]) => boolean
  ) => {
    searchStr = searchStr.toString().trim();
    if (searchStr === "") {
      return [];
    }
    let possibles: Address[] = [];
    try {
      possibles = this.#records
        .filter((item) => {
          const regex = new RegExp(searchStr, "g");
          return (item[scope] || "").toString().match(regex);
        })
        .filter(filter || (() => true))
        .slice(0, this.#config.maxSearchResult);
    } catch (e) {
      return [];
    }
    return possibles;
  };

  // GetConfig: get config value
  GetConfig = (): Config => {
    return this.#config;
  };

  // SearchAddressByDistrict: partial search by district scope
  SearchAddressByDistrict = (
    searchStr: string,
    filter?: (value?: Address, index?: number, array?: Address[]) => boolean
  ): Address[] => {
    return this.resolveResultByField("district", searchStr, filter);
  };

  // SearchAddressByAmphoe: partial search by amphoe scope
  SearchAddressByAmphoe = (
    searchStr: string,
    filter?: (value?: Address, index?: number, array?: Address[]) => boolean
  ): Address[] => {
    return this.resolveResultByField("amphoe", searchStr, filter);
  };

  // SearchAddressByProvince: partial search by province scope
  SearchAddressByProvince = (
    searchStr: string,
    filter?: (value?: Address, index?: number, array?: Address[]) => boolean
  ): Address[] => {
    return this.resolveResultByField("province", searchStr, filter);
  };

  // SearchAddressByZipcode: partial search by zipcode scope
  SearchAddressByZipcode = (
    searchStr: string,
    filter?: (value?: Address, index?: number, array?: Address[]) => boolean
  ): Address[] => {
    return this.resolveResultByField("zipcode", searchStr, filter);
  };
}
