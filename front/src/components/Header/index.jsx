import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./style.module.css";
import logo from "../../assets/logo.png";
import MenuIcon from "../../components/MenuIcon";

import { useAuth } from "../../context/Auth";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    return setOpen(false);
  }, []);

  const routesPath = {};

  if (user.roles.indexOf("ADMIN") != -1) {
    routesPath.setDefault = true;
    routesPath.user = "/";
  }

  if (user.roles.indexOf("SORTING") != -1) {
    if (!routesPath.setDefault) {
      routesPath.setDefault = true;
      routesPath.process = "/";
    } else {
      routesPath.process = "/process";
    }
  }

  if (user.roles.indexOf("ADVISER") != -1) {
    routesPath.pendingProcess = !routesPath.setDefault
      ? "/"
      : "/pending-process";
  }

  const goTo = (page) => {
    setOpen(false);
    navigate(page);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.logoContainer} onClick={() => goTo("/")}>
          <img src={logo} />
        </div>
        <MenuIcon className={style.menuIcon} onClick={() => setOpen(!open)} />
      </div>
      <div
        className={`${style.contentContainer} ${
          open ? style.contentContainerOpen : ""
        }`}
      >
        <div className={style.content}>
          <div
            className={style.logoContentContainer}
            onClick={() => history.go("/")}
          >
            <img src={logo} />
          </div>
          <div className={style.line}></div>
          <div className={style.welcomeTitle}>
            Olá, <b>{user.name}</b>
          </div>

          {user.roles.indexOf("ADMIN") != -1 && (
            <button className={style.btn} onClick={() => goTo(routesPath.user)}>
              Usuários
            </button>
          )}

          {user.roles.indexOf("SORTING") != -1 && (
            <button
              className={style.btn}
              onClick={() => goTo(routesPath.process)}
            >
              Processos
            </button>
          )}

          {user.roles.indexOf("ADVISER") != -1 && (
            <button
              className={style.btn}
              onClick={() => goTo(routesPath.pendingProcess)}
            >
              Pendências
            </button>
          )}
        </div>
        <b className={style.disconnect} onClick={() => logout()}>
          Desconectar
        </b>
      </div>
    </>
  );
};

export default Header;
