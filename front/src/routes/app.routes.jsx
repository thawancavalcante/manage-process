import { BrowserRouter, Routes, Route } from "react-router-dom";

import BuilderTablePage from "../pages/BuilderTablePage";
import CreateProcess from "../pages/CreateProcess";
import CreateUser from "../pages/CreateUser";
import GetProcess from "../pages/GetProcess";
import GetUser from "../pages/GetUser";

const UserPage = {
  title: "Usuários",
  keys: {
    name: "Nome",
    email: "E-mail",
    pendingCount: "Pendentes",
    completedCount: "Completos",
  },
  formatFn: (res) => {
    res.data = res.data.map((item) => {
      item.goTo = "/user/" + item.id;
      let pendingCount = 0;
      let completedCount = 0;

      for (let advise of item.advise) {
        if (!!advise.description) {
          completedCount++;
          continue;
        }
        pendingCount++;
      }
      item.pendingCount = pendingCount;
      item.completedCount = completedCount;
      return item;
    });
    return res;
  },
  createBtn: {
    goTo: "/create-user",
    title: "Criar usuário",
  },
  dataPath: "/user",
};

const ProcessPage = {
  title: "Processos",
  keys: {
    title: "Titulo",
    created_by_name: "Criado Por",
    created_at: "Data de criação",
  },
  formatFn: (res) => {
    res.data = res.data.map((item) => {
      item.goTo = "/process/" + item.id;
      item.created_by_name = item.created_by.name;
      const createdDate = new Date(item.created_at);
      item.created_at = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
      return item;
    });
    return res;
  },
  createBtn: {
    goTo: "/create-process",
    title: "Criar processo",
  },
  dataPath: "/process",
};

const PendingProcessPage = {
  title: "Processos pendentes",
  keys: {
    title: "Titulo",
    created_by_name: "Criado Por",
    created_at: "Data de criação",
  },
  formatFn: (res) => {
    res.data = res.data.map((item) => {
      item.goTo = "/process/" + item.id;
      item.created_by_name = item.created_by.name;
      const createdDate = new Date(item.created_at);
      item.created_at = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
      return item;
    });
    return res;
  },
  createBtn: null,
  dataPath: "/advise/pending-process",
};

const createRoute = (path = "/", props) => ({
  title: props.title,
  path: path,
  exact: true,
  element: <BuilderTablePage {...props} />,
});

export default ({ user }) => {
  let AppRoutes = [];
  let defaultRoute = null;
  let createGetProcessRoute = null;
  if (user.roles.indexOf("ADMIN") != -1) {
    defaultRoute = createRoute("/", UserPage);
    AppRoutes.push(createRoute("/user", UserPage));

    AppRoutes.push({
      title: "Criar Usuário",
      path: "create-user",
      exact: true,
      element: <CreateUser />,
    });

    AppRoutes.push({
      title: "Visualizar Usuário",
      path: "user/:id",
      exact: true,
      element: <GetUser />,
    });
  }

  if (user.roles.indexOf("SORTING") != -1) {
    if (!defaultRoute) {
      defaultRoute = createRoute("/", ProcessPage);
    }

    if (!createGetProcessRoute) {
      createGetProcessRoute = true;
      AppRoutes.push({
        title: "Visualizar Processo",
        path: "process/:id",
        exact: true,
        element: <GetProcess />,
      });
    }
    AppRoutes.push(createRoute("/process", ProcessPage));
    AppRoutes.push({
      title: "Criar processo",
      path: "create-process",
      exact: true,
      element: <CreateProcess />,
    });
  }

  if (user.roles.indexOf("ADVISER") != -1) {
    if (!defaultRoute) {
      defaultRoute = createRoute("/", PendingProcessPage);
    }

    if (!createGetProcessRoute) {
      createGetProcessRoute = true;
      AppRoutes.push({
        title: "Visualizar Processo",
        path: "process/:id",
        exact: true,
        element: <GetProcess />,
      });
    }
    AppRoutes.push(createRoute("/pending-process", PendingProcessPage));
  }

  AppRoutes.push(defaultRoute);

  return (
    <BrowserRouter>
      <Routes>
        {AppRoutes.map(({ element, ...route }) => (
          <Route {...route} element={element} key={route.title} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
