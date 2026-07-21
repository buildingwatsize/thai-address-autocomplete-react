import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CreateInput } from "./index";

describe("CreateInput", () => {
  const InputThaiAddress = CreateInput();

  describe("factory", () => {
    it("should return District, Amphoe, Province, Zipcode components", () => {
      expect(InputThaiAddress.District).toBeDefined();
      expect(InputThaiAddress.Amphoe).toBeDefined();
      expect(InputThaiAddress.Province).toBeDefined();
      expect(InputThaiAddress.Zipcode).toBeDefined();
    });

    it("should accept custom config", () => {
      const custom = CreateInput({ maxSearchResult: 5 });
      expect(custom.District).toBeDefined();
    });
  });

  describe("District component", () => {
    it("should render an input element", () => {
      render(
        <InputThaiAddress.District
          inputProps={{ "data-testid": "district-input", placeholder: "ตำบล" }}
        />,
      );

      const input = screen.getByTestId("district-input");
      expect(input).toBeDefined();
      expect(input.getAttribute("placeholder")).toBe("ตำบล");
    });

    it("should call onChange when user types", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <InputThaiAddress.District
          value=""
          onChange={handleChange}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const input = screen.getByTestId("district-input");
      await user.click(input);
      await user.type(input, "บ");

      expect(handleChange).toHaveBeenCalled();
    });

    it("should call onSelect when an option is selected", async () => {
      const handleSelect = vi.fn();
      const handleChange = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <InputThaiAddress.District
          value=""
          onChange={handleChange}
          onSelect={handleSelect}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const input = screen.getByTestId("district-input");
      await user.click(input);
      await user.type(input, "บ้านฝาง");

      rerender(
        <InputThaiAddress.District
          value="บ้านฝาง"
          onChange={handleChange}
          onSelect={handleSelect}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      await waitFor(() => {
        const options = screen.queryAllByRole("option");
        expect(options.length).toBeGreaterThan(0);
      });

      const options = screen.getAllByRole("option");
      await user.click(options[0]);

      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          district: expect.any(String),
          amphoe: expect.any(String),
          province: expect.any(String),
          zipcode: expect.any(String),
        }),
      );
    });

    it("should show clear button when clearable and value present", () => {
      render(
        <InputThaiAddress.District
          value="test"
          clearable={true}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const clearBtn = screen.getByLabelText("Clear");
      expect(clearBtn).toBeDefined();
    });

    it("should not show clear button when value is empty", () => {
      render(
        <InputThaiAddress.District
          value=""
          clearable={true}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const clearBtn = screen.queryByLabelText("Clear");
      expect(clearBtn).toBeNull();
    });

    it("should not show clear button when clearable is false", () => {
      render(
        <InputThaiAddress.District
          value="test"
          clearable={false}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const clearBtn = screen.queryByLabelText("Clear");
      expect(clearBtn).toBeNull();
    });

    it("should call onChange with empty string when clear button clicked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <InputThaiAddress.District
          value="test"
          clearable={true}
          onChange={handleChange}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const clearBtn = screen.getByLabelText("Clear");
      await user.click(clearBtn);

      expect(handleChange).toHaveBeenCalledWith("");
    });
  });

  describe("Amphoe component", () => {
    it("should render with amphoe scope", () => {
      render(
        <InputThaiAddress.Amphoe
          inputProps={{ "data-testid": "amphoe-input" }}
        />,
      );

      expect(screen.getByTestId("amphoe-input")).toBeDefined();
    });
  });

  describe("Province component", () => {
    it("should render with province scope", () => {
      render(
        <InputThaiAddress.Province
          inputProps={{ "data-testid": "province-input" }}
        />,
      );

      expect(screen.getByTestId("province-input")).toBeDefined();
    });
  });

  describe("Zipcode component", () => {
    it("should render with zipcode scope", () => {
      render(
        <InputThaiAddress.Zipcode
          inputProps={{ "data-testid": "zipcode-input" }}
        />,
      );

      expect(screen.getByTestId("zipcode-input")).toBeDefined();
    });
  });

  describe("styling", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <InputThaiAddress.District
          className="custom-class"
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const wrapper = container.querySelector(".custom-class");
      expect(wrapper).not.toBeNull();
    });

    it("should apply custom style to container", () => {
      render(
        <InputThaiAddress.District
          style={{ maxWidth: "300px" }}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const wrapper = screen.getByTestId("district-input").parentElement;
      expect(wrapper?.style.maxWidth).toBe("300px");
    });

    it("should apply inputProps className to input element", () => {
      render(
        <InputThaiAddress.District
          inputProps={{ "data-testid": "district-input", className: "input-custom" }}
        />,
      );

      const input = screen.getByTestId("district-input");
      expect(input.className).toContain("input-custom");
    });

    it("should apply inputProps style to input element", () => {
      render(
        <InputThaiAddress.District
          inputProps={{
            "data-testid": "district-input",
            style: { fontSize: "1.5rem" },
          }}
        />,
      );

      const input = screen.getByTestId("district-input") as HTMLInputElement;
      expect(input.style.fontSize).toBe("1.5rem");
    });
  });

  describe("grouped prop", () => {
    it("should render group labels when grouped=true and results shown", async () => {
      const user = userEvent.setup();

      const { rerender } = render(
        <InputThaiAddress.District
          value=""
          grouped={true}
          onChange={() => {}}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const input = screen.getByTestId("district-input");
      await user.click(input);
      await user.type(input, "บ้าน");

      rerender(
        <InputThaiAddress.District
          value="บ้าน"
          grouped={true}
          onChange={() => {}}
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      await waitFor(() => {
        const options = screen.queryAllByRole("option");
        expect(options.length).toBeGreaterThan(0);
      });

      const groups = screen.queryAllByRole("group");
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe("focus state", () => {
    it("should apply focus ring on input focus", async () => {
      const user = userEvent.setup();

      render(
        <InputThaiAddress.District
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const input = screen.getByTestId("district-input") as HTMLInputElement;
      await user.click(input);

      expect(input.style.boxShadow).toContain("0 0 0 2px");
    });

    it("should remove focus ring on blur", async () => {
      const user = userEvent.setup();

      render(
        <InputThaiAddress.District
          inputProps={{ "data-testid": "district-input" }}
        />,
      );

      const input = screen.getByTestId("district-input") as HTMLInputElement;
      await user.click(input);
      expect(input.style.boxShadow).toContain("0 0 0 2px");

      await user.tab();
      expect(input.style.boxShadow).not.toContain("0 0 0 2px");
    });
  });
});
