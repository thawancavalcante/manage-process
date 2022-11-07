import style from "./style.module.css";

const Checkbox = ({ items, label = "", ...props }) => {
  return (
  <>
    <section {...props}>
    {label}
      <ul className={style.list}>
        {items.map((item) => (
          <li key={item.value} className={style.item}>
            <label className={style.label}>
              <input
                type="checkbox"
                value={item.value}
                className={style.checkbox}
                name={props.name}
                {...(item.checked ? { checked: "on" } : "")}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </section></>
  );
};

export default Checkbox;
