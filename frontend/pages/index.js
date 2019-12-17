import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Components
import BarChart from '../components/D3/BarChart';
import DataKeysForm from '../components/forms/DataKeysForm';
import PageLayout from '../components/layout/PageLayout';

const index = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [dataKeys, setDataKeys] = useState(false);
  const [jsonDataResponse, setJsonDataResponse] = useState(false);
  const [currentKey, setCurrentKey] = useState(null);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const getCurrentKey = currentKey => {
    console.log({ currentKey });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:7777/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setDataKeys([...Object.keys(res.data[0])]);
      setJsonDataResponse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageLayout>
      <Form onSubmit={onSubmit}>
        <div>
          <input className="file-input" id="file-upload" type="file" onChange={onChange} />
          <label className="file-label" htmlFor="file-upload">
            {filename}
          </label>
        </div>
        <input className="button secondary" type="submit" value="Upload" />
      </Form>
      {dataKeys && <DataKeysForm keys={dataKeys} setCurrentKey={setCurrentKey} />}
      {jsonDataResponse && currentKey && (
        <BarChart data={jsonDataResponse} currentKey={currentKey} />
      )}
    </PageLayout>
  );
};

export default index;

const Form = styled.form`
  .file-input {
    display: none;
  }
  .file-label {
    background-color: #f2c953;
    border-radius: 5px;
    padding: 10px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 120px;
  }
`;
