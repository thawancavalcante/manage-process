import React, { useContext } from "react";
import "./global.css";

import { AuthProvider } from "./context/Auth";

import Routes from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
