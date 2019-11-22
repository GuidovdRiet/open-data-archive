import { useState } from "react";
import axios from "axios";

const index = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

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

      const { fileName, filePath } = res.data;

      console.log({ res: res.data });

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
      {uploadedFile ? (
        <div>
          <h3>{uploadedFile.fileName}</h3>
        </div>
      ) : null}
    </>
  );
};

export default index;
