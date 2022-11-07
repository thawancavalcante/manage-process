import BuildPage from "../../components/BuildPage";

const BuilderTablePage = ({ title, keys, dataPath, createBtn, formatFn }) => {
  return (
    <BuildPage
      keys={keys}
      title={title}
      dataPath={dataPath}
      createBtn={createBtn}
      formatFn={formatFn}
    />
  );
};

export default BuilderTablePage;
