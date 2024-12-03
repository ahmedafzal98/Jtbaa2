import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51H8R8KH8GKrhT52KpANq9cN6L3diPzls9viXDEXO0AXWlcpgfiu5uZCb7vdZOiBr9GgbiRkq7acILx0Jd1cXQ9HA00zt66FBga"
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>
);
