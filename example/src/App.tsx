import { useEffect, useState } from "react";
import { Address, CreateInput } from "thai-address-autocomplete-react";
import customDB from "./database/custom-db.json";

import "./App.css";
import GithubMarkLogo from "./assets/github-mark-white.svg";

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
          href="https://github.com/buildingwatsize"
          target="_blank"
          rel="noopener"
        >
          <button>
            <img src={GithubMarkLogo} alt="buildingwatsize" height={48} />
            <div>buildingwatsize</div>
          </button>
        </a>
      </div>

      <div className="content-area">
        <div className="border-container">
          <span className="border-label">Input</span>
          {isDefaultMode ? (
            <div>
              <label>ตำบล</label>
              <InputThaiAddress.District
                value={address["district"]}
                onChange={handleChange("district")}
                onSelect={handleSelect}
              />
              <label>อำเภอ</label>
              <InputThaiAddress.Amphoe
                value={address["amphoe"]}
                onChange={handleChange("amphoe")}
                onSelect={handleSelect}
              />
              <label>จังหวัด</label>
              <InputThaiAddress.Province
                value={address["province"]}
                onChange={handleChange("province")}
                onSelect={handleSelect}
              />
              <label>รหัสไปรษณีย์</label>
              <InputThaiAddress.Zipcode
                value={address["zipcode"]}
                onChange={handleChange("zipcode")}
                onSelect={handleSelect}
                // filter={(el) => !!el?.zipcode?.toString().endsWith("20")} // when typing in zipcode field then filter by zipcode which endswith "20"
              />
            </div>
          ) : (
            <div>
              <label>ตำบล (custom) "ไม่พบในฐานข้อมูล" will be found</label>
              <InputCustomDB.District
                value={address["district"]}
                onChange={handleChange("district")}
                onSelect={handleSelect}
              />
              <label>อำเภอ (custom)</label>
              <InputCustomDB.Amphoe
                value={address["amphoe"]}
                onChange={handleChange("amphoe")}
                onSelect={handleSelect}
              />
              <label>จังหวัด (custom)</label>
              <InputCustomDB.Province
                value={address["province"]}
                onChange={handleChange("province")}
                onSelect={handleSelect}
              />
              <label>รหัสไปรษณีย์ (custom)</label>
              <InputCustomDB.Zipcode
                value={address["zipcode"]}
                onChange={handleChange("zipcode")}
                onSelect={handleSelect}
              />
            </div>
          )}
        </div>

        <div className="border-container">
          <span className="border-label">Result</span>
          <strong>Address:</strong>
          <ul>
            <li>district: {address["district"]}</li>
            <li>amphoe: {address["amphoe"]}</li>
            <li>province: {address["province"]}</li>
            <li>zipcode: {address["zipcode"]}</li>
          </ul>
          <strong>Full Address:</strong>
          <ul>
            <li>{fulladdr}</li>
          </ul>
        </div>
      </div>

      <div className="footer-area">
        <div className="flex">
          <div
            className="mini-border"
            onClick={() => setIsDefaultMode((oldState) => !oldState)}
          >
            Switch to {isDefaultMode ? "Custom DB" : "Default DB"}
          </div>
        </div>
        <div className="flex item-center gap-4px">
          <div className="color-pixel" />
          <a
            href="https://www.pantone.com/color-of-the-year/2024"
            target="_blank"
            rel="noopener"
          >
            Pantone Color of the Year 2024 - Peach Fuzz
          </a>
        </div>
      </div>
    </main>
  );
};

export default App;
