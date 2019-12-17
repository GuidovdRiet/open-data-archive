import styled from 'styled-components';

const DataKeyForm = ({ keys, setCurrentKey }) => {
  if (!keys) return null;

  return (
    <Form>
      {keys &&
        keys.map((key, i) => (
          <div key={i} className="key-wrapper">
            <label>{key}</label>
            <input type="radio" value={key} name="data-key" onChange={() => setCurrentKey(key)} />
          </div>
        ))}
    </Form>
  );
};

export default DataKeyForm;

const Form = styled.form`
  margin: 50px 0;
  .key-wrapper {
    margin: 9px 0;
  }
  label {
    color: white;
    font-size: 0.9rem;
  }
`;
