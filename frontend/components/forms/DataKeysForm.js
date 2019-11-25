const DataKeyForm = ({ keys, setCurrentKey }) => {
  if (!keys) return null;

  return (
    <form>
      {keys &&
        keys.map((key, i) => (
          <div key={i}>
            <label>{key}</label>
            <input
              type="radio"
              value={key}
              name="data-key"
              onChange={() => setCurrentKey(key)}
            />
          </div>
        ))}
    </form>
  );
};

export default DataKeyForm;
