import { Navbar } from "../components/Navbar";
import { Form } from "../components/Form";
import { Gallery } from "../components/Gallery";
import { useState } from "react";
import Image1 from "../assets/chat.png";

export const Home = () => {
  const token = localStorage.getItem("token");

  const galaryDetails = [
    {
      image: Image1,
      title: "Awesome First Image",
      description: "Awesome sample description",
    },
    {
      image: Image1,
      title: "Awesome First Image",
      description: "Awesome sample description",
    },
    {
      image: Image1,
      title: "Awesome Third Image",
      description: "Awesome sample description",
    },
    {
      image: Image1,
      title: "Awesome Fourth Image",
      description: "Awesome sample description",
    },
    {
      image: Image1,
      title: "Awesome Fourth Image",
      description: "Awesome sample description",
    },
  ];

  const [data, setData] = useState(galaryDetails);

  return (
    <div className="appWrapper">
      <div className="main">
        <Navbar />
        <Gallery data={data} setData={setData} />
        {token ? <Form /> : null}
      </div>
    </div>
  );
};
