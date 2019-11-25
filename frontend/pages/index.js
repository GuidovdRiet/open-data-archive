import { useState } from "react";
import axios from "axios";

// Components
import BarChart from "../components/D3/BarChart";
import DataKeysForm from "../components/forms/DataKeysForm";

const index = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
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
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:7777/upload-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setDataKeys([...Object.keys(res.data[0])]);
      setJsonDataResponse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" onChange={onChange} />
          <label>{filename}</label>
        </div>
        <input type="submit" value="Upload" />
      </form>
      {dataKeys && (
        <DataKeysForm keys={dataKeys} setCurrentKey={setCurrentKey} />
      )}
      {jsonDataResponse && currentKey && (
        <BarChart data={jsonDataResponse} currentKey={currentKey} />
      )}
    </>
  );
};

export default index;
