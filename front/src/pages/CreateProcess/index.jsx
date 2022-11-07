import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
import axios from "axios";
import AsyncSelect from "react-select/async";

import Header from "../../components/Header";
import * as Swal from "sweetalert2";

import style from "./style.module.css";
import api from "../../services/api";
import { useEffect, useRef, useState } from "react";

const ProcessSchema = Yup.object().shape({
  title: Yup.string().required(),
  content_url: Yup.string().required(),
  adviserIds: Yup.array().min(1).required(),
});

const CreateProcess = () => {
  const navigate = useNavigate();
  const shouldRequest = useRef(true);
  const selectElement = useRef();
  const [contentUrl, setContentUrl] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      title: e.target["title"].value,
      content_url: contentUrl,
      adviserIds: selectElement.current.getValue().map((el) => el.value),
    };

    const isValid = await ProcessSchema.validate(data).catch((err) => {
      Swal.fire("", err.errors[0], "error");
      return false;
    });

    if (!isValid) {
      return;
    }

    const result = await api
      .post(`/process`, data)
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
      text: "Processo criado com sucesso!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  useEffect(() => {
    const get = async () => {
      axios
        .get("https://picsum.photos/500/300")
        .then((response) => {
          setContentUrl(response.request["responseURL"]);
        })
        .catch((err) => {
          Swal.fire("", "Erro ao buscar imagem, recarregue a pagina", "error");
        });
    };

    if (shouldRequest.current) {
      shouldRequest.current = false;
      get();
    }
  }, []);

  const loadOptions = (inputValue, callback) => {
    api
      .get(`/advise/advisers?name=${inputValue}`)
      .then(({ data }) => {
        let options = [];
        options = data.advisers.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        console.log(options);

        callback(options);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("", "Erro ao buscar usuário", "error");
      });
  };
  return (
    <div className={style.page}>
      <Header />
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.title}>Criar processo</div>
          <form className={style.form} onSubmit={submit}>
            <div className={style.inputContainer}>
              <input name="title" type="text" placeholder="Titulo" />
              <div
                className={style.loadingImage}
                style={
                  contentUrl
                    ? {
                        backgroundImage: `url(${contentUrl})`,
                        color: "transparent",
                      }
                    : {}
                }
              >
                Carregando...
              </div>
              <AsyncSelect
                placeholder="Pesquise por usuários para o parecer"
                isMulti
                name="adviserIds"
                cacheOptions
                ref={selectElement}
                loadOptions={loadOptions}
              />
            </div>
            <button type="submit">Criar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProcess;
