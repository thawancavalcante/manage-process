import React from "react";

import { useAuth } from "../context/Auth";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

const Routes = () => {
  const { user } = useAuth();
  return user ? <AppRoutes user={user} /> : <AuthRoutes />;
};

export default Routes;
