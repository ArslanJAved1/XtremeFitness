import { useState } from "react";
import "./supplements.css";
import { useEffect } from "react";
import rand from "../../images/3.jpg";
import { Buffer } from "buffer";
import axios from "axios";

export function Supplements() {
  const [supps, setSupps] = useState([]);
  const [showModel, setShowModel] = useState(false);
  useEffect(() => {
    getSupps();
  }, []);

  const getSupps = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/supp/all", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setSupps(data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="container">
      <h1 className="title">Supplements</h1>
      <button className="button" onClick={() => setShowModel(true)}>
        Add Supplements
      </button>
      {showModel && <Model show={setShowModel} update={getSupps} />}
      <div className="supp_container">
        {supps.map((data, index) => {
          let _buffer = Buffer.from(data.image).toString();
          return (
            <div className="supp_card" key={index}>
              <img className="supp_image" src={_buffer} />
              <h3>Supplements</h3>
              <h1>{data.title}</h1>
              <p>{data.details}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Model(props) {
  const { show, update } = props;
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const [preview, setPreview] = useState();

  const getImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const addSupplement = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/supp/add",
        {
          title: title,
          details: details,
          image: preview,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        update();
        show(false);
        alert("New Supplement added");
      }
    } catch (error) {
      console.log(error.response);
      alert("error adding Supplement");
    }
  };

  return (
    <div className="model_background">
      <div className="model_container">
        <button
          className="model_close"
          onClick={() => {
            console.log("Here");
            show(false);
          }}
        >
          X
        </button>
        <h1 className="mode_title">Add Supplement</h1>
        <div className="model_text">
          <div className="model_input">
            <h3>Title</h3>
            <input
              className="input-text"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="model_input">
            <h3>Details</h3>
            <input
              className="input-text"
              type="text"
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        </div>
        <img className="model_preview" src={preview} />
        <input
          className="button"
          type="file"
          id="image"
          name="Upload image"
          onChange={getImage}
        />
        <button className="button" onClick={() => addSupplement()}>
          Add Supplement
        </button>
      </div>
    </div>
  );
}

export default Supplements;
