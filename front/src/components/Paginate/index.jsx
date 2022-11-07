import style from "./style.module.css";

const Paginate = ({ meta, onClick, ...props }) => {
  const { currentPage, lastPage: maxPages, next, prev } = meta;
  let items = [];

  let leftSide = currentPage == 1 ? 1 : currentPage - 1;
  let rightSide = leftSide + 2 > maxPages ? maxPages : leftSide + 2;
  if (currentPage == maxPages) leftSide -= 1;

  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={`${style.roundEffect} 
          ${number === currentPage ? style.active : ""}
        `}
        onClick={() => {
          onClick(number);
        }}
      >
        {number}
      </div>
    );
  }
  const nextPage = () => {
    if (next) {
      onClick(next);
    }
  };

  const prevPage = () => {
    if (prev) {
      onClick(prev);
    }
  };

  if (maxPages === 0) {
    return "";
  }

  return (
    <div className={style.flexContainer}>
      <div className={style.paginateCtn}>
        <div className={style.roundEffect} onClick={prevPage}>
          {" "}
          &lsaquo;{" "}
        </div>
        {items}
        <div className={style.roundEffect} onClick={nextPage}>
          {" "}
          &rsaquo;{" "}
        </div>
      </div>
    </div>
  );
};

export default Paginate;
