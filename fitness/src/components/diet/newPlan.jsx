import { useEffect, useState } from "react";
import axios from "axios";
import "./newPlan.css";

export function NewPlan() {
  const [newWeek, setNewWeek] = useState("");
  const [newDayTime, setNewDayTime] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [weeks, setWeeks] = useState([]);
  const [diets, setDiets] = useState([]);
  const [dayTime, setDayTime] = useState([]);
  const [week, setWeek] = useState(-1);
  const [daytimeS, setDayTimeS] = useState(-1);
  const [diet, setDiet] = useState(-1);

  useEffect(() => {
    getWeeks();
    getDayTime();
    getDiets();
  }, []);
  const getWeeks = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/diet/weeks", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setWeeks(data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const getDayTime = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/diet/dayTime",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setDayTime(data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDiets = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/diet/diets", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setDiets(data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const addWeek = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/diet/addWeek",
        {
          week: newWeek,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        getWeeks();
        alert("New Week added");
      }
    } catch (error) {
      console.log(error.response);
      alert("error adding week");
    }
  };

  const addDayTime = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/diet/addDayTime",
        {
          daytime: newDayTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        getDayTime();
        alert("New Time added");
      }
    } catch (error) {
      console.log(error.response);
      alert("error adding Time");
    }
  };

  const addDiet = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/diet/addDiet",
        {
          name: name,
          details: details,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        getDiets();
        alert("New Diet added");
      }
    } catch (error) {
      console.log(error.response);
      alert("error adding Diet" + error.response);
    }
  };

  const createPlan = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/diet/createPlan",
        {
          week: week,
          daytime: daytimeS,
          diet: diet,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        getDiets();
        alert("New Diet added");
      }
    } catch (error) {
      console.log(error.response);
      alert("error adding Diet" + error.response);
    }
  };
  return (
    <div className="np_container">
      <div className="np_sub_container">
        <h1>Add new week</h1>
        <div className="np_inner_contaner">
          <h3>Name</h3>
          <input
            className="input-text"
            type="text"
            onChange={(e) => setNewWeek(e.target.value)}
          />
          <button className="button" onClick={addWeek}>
            Add Week
          </button>
        </div>
        <h1>Add new Time</h1>
        <div className="np_inner_contaner">
          <h3>Name</h3>
          <input
            className="input-text"
            type="text"
            onChange={(e) => setNewDayTime(e.target.value)}
          />
          <button className="button" onClick={addDayTime}>
            Add Time
          </button>
        </div>
      </div>
      <div className="np_sub_container">
        <h1>Add new Diet</h1>
        <div className="np_inner_contaner">
          <h3>Name</h3>
          <input
            className="input-text"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <h3>Details(line seperated)</h3>
          <textarea
            className="input-text"
            name="diet details"
            rows="4"
            cols="50"
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
          <button className="button" onClick={addDiet}>
            Add Diet
          </button>
        </div>
      </div>
      <div className="np_sub_container">
        <h1>Create new Plan</h1>
        <div className="np_inner_contaner">
          <h3>Select Week</h3>
          <select
            className="input-text"
            type="text"
            onChange={(e) => setWeek(e.target.value)}
          >
            {weeks.map((week, index) => {
              return (
                <option
                  className="select"
                  key={index}
                  value={week.id}
                  label={week.week}
                />
              );
            })}
          </select>

          <h3>Select Time</h3>
          <select
            className="input-text"
            type="text"
            onChange={(e) => setDayTimeS(e.target.value)}
          >
            {dayTime.map((dt, index) => {
              return (
                <option
                  className="select"
                  key={index}
                  value={dt.id}
                  label={dt.dayTime}
                />
              );
            })}
          </select>

          <h3>Select Diet</h3>
          <select
            className="input-text"
            type="text"
            onChange={(e) => setDiet(e.target.value)}
          >
            {diets.map((d, index) => {
              return (
                <option
                  className="select"
                  key={index}
                  value={d.id}
                  label={d.name}
                />
              );
            })}
          </select>
          <button className="button" onClick={createPlan}>
            Create Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPlan;
