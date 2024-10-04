import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";

import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
