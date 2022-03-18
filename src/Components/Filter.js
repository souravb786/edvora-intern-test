import React, { useEffect, useState } from "react";
import "../Styles/Filter.css";
import useFilter from "../hook/useFilter";
function Filter({ regions, open }) {
  const { setFilter } = useFilter();
  const [status, setStatus] = useState(true);
  const [states, setStates] = useState([]);
  const [currentState, setCurrentState] = useState(-1);
  const [currentCity, setCurrentCity] = useState(-1);
  const [cities, setCities] = useState([]);

  // this useEffect generating the states array from the regions which contains state and city
  useEffect(() => {
    setStates(
      regions.map(({ state }, idx) => {
        return { id: idx, value: state };
      })
    );
  }, [regions]);

  // based on the selected state this useEffect generating array of cities
  useEffect(() => {
    if (currentState == -1) {
      setCities([]);
      setCurrentCity(-1);
    } else {
      setCities(
        regions[currentState].city.map((ele, idx) => {
          return { value: ele, id: idx };
        })
      );
      setCurrentCity(-1);
    }
  }, [currentState]);

  // this useEffect for updating the filter options based on the options that user have selected
  useEffect(() => {
    setFilter({
      state: currentState == -1 ? "" : states[currentState].value,
      city: currentCity == -1 ? "" : cities[currentCity].value,
    });
  }, [currentCity, currentState]);
  return (
    <div className="Filter" style={{ visibility: open ? "visible" : "hidden" }}>
      <h2>Filters</h2>
      <hr />

      {/* select compnent for selecting the state */}
      <select
        name="state"
        onChange={(e) => {
          setCurrentState(e.target.value);
          setStatus(true);
        }}
        className="dd__state"
        defaultValue={-1}
      >
        <option selected value={-1}>
          States
        </option>
        {states.map((item, idx) => {
          return (
            <option className="dd__option" value={item.id} key={idx}>
              {item.value}
            </option>
          );
        })}
      </select>

      {/* select component for selecting city */}
      <select
        name="city"
        onChange={(e) => {
          setCurrentCity(e.target.value);
          setStatus(false);
        }}
        className="dd__state"
        defaultValue={-1}
      >
        <option selected={status} value={-1}>
          City
        </option>
        {cities.map((item, idx) => {
          return (
            <option value={item.id} key={idx}>
              {item.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Filter;
