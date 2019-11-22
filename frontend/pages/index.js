import { useState } from "react";
import axios from "axios";

// Components
import BarChart from "../components/D3/BarChart";

const index = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [jsonDataResponse, setJsonDataResponse] = useState([]);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
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

      setJsonDataResponse(res.data);

      setUploadedFile({ fileName, filePath });
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
      {jsonDataResponse.length && <BarChart data={jsonDataResponse} />}
    </>
  );
};

export default index;
