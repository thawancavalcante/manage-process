import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";

const AuthRoutes = [
  {
    title: "Login",
    path: "/",
    exact: true,
    element: <Login />,
  },
];

export default () => (
  <BrowserRouter>
    <Routes>
      {AuthRoutes.map(({ element, ...route }) => (
        <Route {...route} element={element} key={route.title} />
      ))}
    </Routes>
  </BrowserRouter>
);
