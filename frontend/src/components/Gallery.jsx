import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const Gallery = ({ data }) => {
  const [datau, setDatau] = useState([]);
  const PublicFolder = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setDatau(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="gallery">
      {datau.map((d, index) => (
        <div key={index} className="galleryPost">
          <a href={d.img}>
            <img src={`${PublicFolder}${d.img}`} alt="" />
          </a>
          <div className="content">
            <h4 style={{ textAlign: "center" }}>{d.title}</h4>
            <p style={{ textAlign: "center", margin: "5px" }}>
              {d.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
