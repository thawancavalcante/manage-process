import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Swal from "sweetalert2";

import style from "./style.module.css";
import Header from "../../components/Header";
import PlusIcon from "../../components/PlusIcon";
import api from "../../services/api";
import Table from "../../components/Table";
import Paginate from "../../components/Paginate";

const BuildPage = ({ title, dataPath, keys, createBtn, formatFn }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const getData = async (page) => {
    const result = await api
      .get(`${dataPath}?page=${page}`)
      .then(({ data: result }) => {
        if (formatFn) {
          result = formatFn(result);
        }
        return result;
      })
      .catch(({ response: { data: error } }) => {
        if (error) {
          Swal.fire("", error.message || error.data[0].message, "error");
        }
        return;
      });

    if (!result) {
      return;
    }

    setData(result);
  };

  useEffect(() => {
    getData(1);

    return () => setData({});
  }, [navigate]);

  return (
    <div className={style.page}>
      <Header />
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.title}>
            {title}
            <b className={style.count}>({data && data?.meta?.total})</b>
          </div>

          {createBtn && (
            <button
              className={style.createBtn}
              onClick={() => navigate(createBtn.goTo)}
            >
              {createBtn.title}
              <PlusIcon />
            </button>
          )}

          {data.data && (
            <>
              <Table keys={keys} items={data.data} />
              <Paginate onClick={getData} meta={data.meta} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildPage;
