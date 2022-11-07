import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

const Table = ({ keys, items, ...props }) => {
  const navigate = useNavigate();

  return (
    <>
      {items.length === 0 && "Nenhum resultado encontrado"}

      <table className={style.table}>
        <thead>
          <tr>
            {Object.keys(keys).map((key) => (
              <th key={key}>{keys[key]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onClick={() => navigate(item.goTo)}>
              {Object.keys(keys).map((key) => (
                <td key={`${key}-${item.id}`}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
