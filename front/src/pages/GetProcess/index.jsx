import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import Header from "../../components/Header";
import * as Swal from "sweetalert2";
import { useAuth } from "../../context/Auth";

import style from "./style.module.css";
import api from "../../services/api";

const ProcessSchema = Yup.object().shape({
  description: Yup.string().required(),
});

const GetProcess = () => {
  let { id } = useParams();
  const { user } = useAuth();

  const shouldRequest = useRef(true);
  const [process, setProcess] = useState(null);
  const [shouldAdvise, setShouldAdvise] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      description: e.target["description"].value,
      process_id: id,
    };

    const isValid = await ProcessSchema.validate(data).catch((err) => {
      Swal.fire("", err.errors[0], "error");
      return false;
    });

    if (!isValid) {
      return;
    }

    const result = await api
      .put(`/advise`, data)
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
      text: "Parecer criado com sucesso!",
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
        .get(`/process/${id}`)
        .then(({ data }) => {
          const createdDate = new Date(data.created_at);
          data.created_at = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
          data.advisesToShow = [];
          for (let advise of data.advise) {
            if (advise.adviser.id == user.id && advise.description == null) {
              setShouldAdvise(true);
              continue;
            }

            if (advise.updated_at) {
              const createdDate = new Date(advise.updated_at);
              advise.created_at = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
            }
            data.advisesToShow.push(advise);
          }

          setProcess(data);
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
        {process && (
          <div className={style.content}>
            <div className={style.title}>{process.title}</div>
            <div className={style.imgContainer}>
              <img src={process.content_url} />
            </div>
            <div>
              Criado por: <b>{process.created_by.name}</b>
            </div>
            <div>
              Data de criação: <b>{process.created_at}</b>
            </div>
            <div className={style.line}></div>

            <div className={style.title}>Parecer:</div>

            {shouldAdvise && (
              <>
                <form className={style.form} onSubmit={submit}>
                  <div className={style.inputContainer}>
                    <textarea
                      name="description"
                      placeholder="Digite seu parecer"
                    />
                  </div>
                  <button type="submit">Enviar parecer</button>
                </form>
                <div className={style.line}></div>
              </>
            )}

            {process.advisesToShow.map((advise) => (
              <div key={advise.adviser.id} style={{ marginBottom: "1rem" }}>
                <b>
                  {advise.adviser.name}
                  {advise.description ? `(${advise.created_at})` : ""}
                </b>
                <p>{advise.description || "Não foi realizado o parecer"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProcess;
