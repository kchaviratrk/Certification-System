import { render, screen } from "@testing-library/react";
import App from "../../src/App.jsx";

test("renderiza el logo de Trackonomy", () => {
  render(<App />);
  expect(screen.getByAltText(/Trackonomy Logo/i)).toBeInTheDocument();
});
