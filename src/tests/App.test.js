import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import ReactDOM from 'react-dom/client';

test("renders learn react link", () => {
  const container = document.createElement("div")
  container.id = "root"
  document.body.appendChild(container)
  
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Comptabilité/i);
  expect(linkElement).toBeInTheDocument();
});
