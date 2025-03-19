import App from "../../App";
import { render } from "@testing-library/react";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders DefaultLocationComponent correctly", () => {
  render(<App />);
  //expect(true).toBeTruthy();
});
