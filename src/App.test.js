import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "./App";
import data from "../server/db.json";

describe("Laptop customiser", () => {
  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        json: () => Promise.resolve(data.components),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(data.price),
      });
  });

  it("should show the correct price when processor a is selected", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId(`Processor_a`));
    })
    expect(getByTestId("total-price")).toHaveTextContent(`₹239900`);
  });

  it("should show the correct price when processor b is selected", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId(`Processor_b`));
    });
    expect(getByTestId("total-price")).toHaveTextContent(`₹259900`);
  });

  it("should show the list of processors", async () => {
    const { getByTestId } = render(<App />);
    await waitFor( () => {
      expect(getByTestId(`Processor_a`)).toBeVisible();
      expect(getByTestId(`Processor_b`)).toBeVisible();
    }) ;
  });

  it("should get the first processor selected when page is loaded", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId("Processor_a")).toHaveClass("variant--selected");
    });
  });

  it("should get the processor b selected when processor b is clicked", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId(`Processor_b`));
      expect(getByTestId("Processor_b")).toHaveClass("variant--selected");
    });
  });

  it("should get the first processor description when page is loaded", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId("processor_desc")).toHaveTextContent("2.3GHz 8-core 9th-generation Intel Core processor, Turbo Boost up to 4.8GHz");
    });
  });

  it("should get the selected processor b description when processor b is clicked", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId(`Processor_b`));
        expect(getByTestId("processor_desc")).toHaveTextContent("2.4GHz 8-core 9th-generation Intel Core processor, Turbo Boost up to 5.0GHz");
    });
  });

  it("should match snapshot after processor_a is clicked", async () => {
    const { container, getByTestId } = render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId(`Processor_a`));
    });
    expect(container).toMatchSnapshot();
  });
});
