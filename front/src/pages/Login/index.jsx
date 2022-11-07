import * as Yup from "yup";
import * as Swal from "sweetalert2";

import style from "./style.module.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/Auth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const Login = () => {
  const { login, loading } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    const isValid = await LoginSchema.validate(loginData).catch((err) => {
      Swal.fire("", err.errors[0], "error");
      return false;
    });

    if (!isValid) {
      return;
    }

    const error = await login(loginData);
    if (error) {
      Swal.fire("", error.message || error.data[0].message, "error");
    }
  };

  return (
    <div className={style.page}>
      <div className={style.logoContainer}>
        <img src={logo} />
      </div>
      <div className={style.title}>Bem-vindo</div>
      <div className={style.subtitle}>Faça seu login</div>
      <form className={style.form} onSubmit={submit}>
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder="Email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
          />
          <input type="password" placeholder="Senha" autoCapitalize="off" />
        </div>
        <button type="submit" disabled={loading}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
