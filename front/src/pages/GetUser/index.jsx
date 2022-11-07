import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import Header from "../../components/Header";
import * as Swal from "sweetalert2";
import { useAuth } from "../../context/Auth";

import style from "./style.module.css";
import api from "../../services/api";

const GetUser = () => {
  let { id } = useParams();

  const shouldRequest = useRef(true);
  const [user, setUser] = useState(null);

  const onClick = async (e) => {
    e.preventDefault();

    const result = await api
      .put(`/user/${user.status == "ACTIVE" ? "inactivate" : "activate"}/${id}`)
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
      text: "Usuário atualizado com sucesso!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  };

  useEffect(() => {
    const get = async () => {
      api
        .get(`/user/${id}`)
        .then(({ data }) => {
          const createdDate = new Date(data.created_at);
          data.created_at = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;

          setUser(data);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("", "Erro ao buscar processo", "error");
        });
    };

    if (shouldRequest.current) {
      shouldRequest.current = false;
      get();
    }
  }, []);

  return (
    <div className={style.page}>
      <Header />
      <div className={style.container}>
        {user && (
          <div className={style.content}>
            <div className={style.title}>{user.name}</div>
            <div>
              Email: <b>{user.email}</b>
            </div>
            <div>
              Data de criação: <b>{user.created_at}</b>
            </div>
            <div>
              Permissões: <b>{user.roles.join(",")}</b>
            </div>
            <button
              onClick={onClick}
              className={`${style.button} ${
                user.status == "ACTIVE" ? style.redButton : ""
              }`}
            >
              {user.status == "ACTIVE" ? "Desativar" : "Ativar"} usuário
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetUser;
