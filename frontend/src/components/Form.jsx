import axios from "axios";
import { useState } from "react";
// import httpClient from "../axiosInstance";

export const Form = () => {
  const userId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(undefined);
  const [error, setError] = useState("");

  const onUploadImage = (e) => {
    setFile(e.target.files[0]);
    // console.log(file);
  };

  const upload = async (e) => {
    e.preventDefault();
    const newPost = {
      userId,
      title,
      description,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://192.168.83.2:5000/api/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const res = await axios.post(
          "http://192.168.83.2:5000/api/posts",
          newPost
        );
        console.log(res.data);
        window.location.reload();
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    // try {
    //   const res = await httpClient.post(
    //     "http://192.168.83.2:5000/api/posts",
    //     newPost
    //   );
    //   console.log(res.data);
    //   // window.location.reload();
    // } catch (err) {
    //   setError(true);
    // }
  };

  // const postToGallery = async (e) => {};

  return (
    <form style={{ padding: "10px" }}>
      <h5>Create Post</h5>
      {error && (
        <div className="text-danger">
          Error, something went wrong, please try again
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          id=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Image
        </label>
        <input
          type="file"
          className="form-control"
          placeholder="Description"
          id=""
          // value={file}
          onChange={onUploadImage}
        />
      </div>

      <button type="submit" onClick={upload} className="btn btn-primary">
        Post
      </button>
    </form>
  );
};
