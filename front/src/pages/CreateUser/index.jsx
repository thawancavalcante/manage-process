import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

import Checkbox from "../../components/Checkbox";
import Header from "../../components/Header";
import * as Swal from "sweetalert2";

import style from "./style.module.css";
import api from "../../services/api";

const UserSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  name: Yup.string().required(),
  password: Yup.string()
    .min(8)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1)
    .required(),
  roles: Yup.array().min(1).required(),
});

const CreateUser = () => {
  const navigate = useNavigate();

  const roles = [
    { label: "Administrador", value: "ADMIN", checked: false },
    { label: "Triagem", value: "SORTING", checked: false },
    { label: "Finalizador", value: "ADVISER", checked: false },
  ];

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target["email"].value,
      password: e.target["password"].value,
      name: e.target["name"].value,
      roles: Object.values(e.target["roles"]).flatMap((el) =>
        el.checked ? el.value : []
      ),
    };

    const isValid = await UserSchema.validate(data).catch((err) => {
      Swal.fire("", err.errors[0], "error");
      return false;
    });

    if (!isValid) {
      return;
    }

    const result = await api
      .post(`/user`, data)
      .then(({ data: res }) => res)
      .catch(({ response: { data: error } }) => {
        if (error) {
          Swal.fire("", error.message || error.data[0].message, "error");
        }
        return;
      });

    if (!result) {
      return;
    }

    Swal.fire({
      title: "Sucesso",
      text: "Usuário criado com sucesso!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  return (
    <div className={style.page}>
      <Header />
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.title}>Criar usuário</div>
          <form className={style.form} onSubmit={submit}>
            <div className={style.inputContainer}>
              <input
                name="email"
                type="text"
                placeholder="Email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="off"
              />
              <input
                type="text"
                placeholder="Nome"
                autoComplete="name"
                name="name"
              />
              <input type="password" placeholder="Senha" name="password" />
              <Checkbox items={roles} name="roles" label="Permissões" />
            </div>
            <button type="submit">Criar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
