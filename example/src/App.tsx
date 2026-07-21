import { useEffect, useState } from "react";
import { Address, CreateInput } from "thai-address-autocomplete-react";
import customDB from "./database/custom-db.json";

import "./App.css";
import GithubMarkLogo from "./assets/github-mark.svg";

const InputThaiAddress = CreateInput();
const InputCustomDB = CreateInput({ database: customDB });
const DELIMITER = ", "; // Default delimiter (can be used with <Input /> as props "delimiter")

const App = () => {
  const [isDefaultMode, setIsDefaultMode] = useState(true); // swappable mode default / custom database
  const [fulladdr, setFulladdr] = useState(""); // full address
  const [address, setAddress] = useState<Address>({
    district: "", // ตำบล tambol
    amphoe: "", // อำเภอ amphoe
    province: "", // จังหวัด changwat
    zipcode: "", // รหัสไปรษณีย์ postal code
  });

  const handleClearAll = () => {
    setAddress({
      district: "",
      amphoe: "",
      province: "",
      zipcode: "",
    });
  };

  const handleChange = (scope: string) => (value: string) => {
    console.log({ scope, value });
    setAddress((oldAddr: Address) => ({
      ...oldAddr,
      [scope]: value,
    }));
  };

  const handleSelect = (address: Address) => {
    console.log({ address });
    setAddress(address);
  };

  useEffect(() => {
    const { district, amphoe, province, zipcode } = address;
    setFulladdr([district, amphoe, province, zipcode].join(DELIMITER));
  }, [address]);

  return (
    <main>
      <div className="header-area">
        <a
          href="https://github.com/buildingwatsize/thai-address-autocomplete-react"
          target="_blank"
          rel="noopener"
        >
          <span className="pill-btn">
            <img src={GithubMarkLogo} alt="buildingwatsize" className="h-4" />
            <span>buildingwatsize - thai-address-autocomplete-react</span>
          </span>
        </a>
      </div>

      <div className="content-area">
        <div className="glass-card">
          <div className="card-label">Input</div>
          {isDefaultMode ? (
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground">
                  ตำบล
                </label>
                <InputThaiAddress.District
                  value={address["district"]}
                  onChange={handleChange("district")}
                  onSelect={handleSelect}
                  inputProps={{ placeholder: "type something..." }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground">
                  อำเภอ
                </label>
                <InputThaiAddress.Amphoe
                  value={address["amphoe"]}
                  onChange={handleChange("amphoe")}
                  onSelect={handleSelect}
                // inputProps={{ placeholder: "type something..." }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground">
                  จังหวัด
                </label>
                <InputThaiAddress.Province
                  value={address["province"]}
                  onChange={handleChange("province")}
                  onSelect={handleSelect}
                  inputProps={{ placeholder: "type something..." }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground">
                  รหัสไปรษณีย์
                </label>
                <InputThaiAddress.Zipcode
                  value={address["zipcode"]}
                  onChange={handleChange("zipcode")}
                  onSelect={handleSelect}
                  inputProps={{ placeholder: "type something..." }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground">
                  ตำบล (custom)
                </label>
                <InputCustomDB.District
                  value={address["district"]}
                  onChange={handleChange("district")}
                  onSelect={handleSelect}
                  inputProps={{ placeholder: "type something..." }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground">
                  อำเภอ (custom)
                </label>
                <InputCustomDB.Amphoe
                  value={address["amphoe"]}
                  onChange={handleChange("amphoe")}
                  onSelect={handleSelect}
                  inputProps={{ placeholder: "type something..." }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground">
                  จังหวัด (custom)
                </label>
                <InputCustomDB.Province
                  value={address["province"]}
                  onChange={handleChange("province")}
                  onSelect={handleSelect}
                  inputProps={{ placeholder: "type something..." }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground">
                  รหัสไปรษณีย์ (custom)
                </label>
                <InputCustomDB.Zipcode
                  value={address["zipcode"]}
                  onChange={handleChange("zipcode")}
                  onSelect={handleSelect}
                  inputProps={{ placeholder: "type something..." }}
                />
              </div>
            </div>
          )}

          <button
            type="button"
            className="pill-btn mt-4"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>

        <div className="glass-card">
          <div className="card-label">Result</div>
          <p className="text-sm font-medium text-foreground">
            Address:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-foreground">
            <li>district: {address["district"]}</li>
            <li>amphoe: {address["amphoe"]}</li>
            <li>province: {address["province"]}</li>
            <li>zipcode: {address["zipcode"]}</li>
          </ul>
          <p className="mt-4 text-sm font-medium text-foreground">
            Full Address:
          </p>
          <p className="mt-1 rounded-md bg-cloud-dancer px-3 py-2 text-sm text-foreground">
            {fulladdr || "—"}
          </p>
        </div>
      </div>

      <div className="footer-area">
        <button
          type="button"
          className="pill-btn"
          onClick={() => setIsDefaultMode((oldState) => !oldState)}
        >
          Switch to {isDefaultMode ? "Custom DB" : "Default DB"}
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="swatch-circle" />
          <a
            href="https://www.pantone.com/eu/en/color-of-the-year/2026"
            target="_blank"
            rel="noopener"
            className="text-xs"
          >
            Pantone 2026 — Cloud Dancer
          </a>
        </div>
      </div>
    </main>
  );
};

export default App;
