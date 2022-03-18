import "./Styles/App.css";
import Header from "./Components/Header";
import { useEffect, useState } from "react";
import Ride from "./Components/Ride";
import useAuth from "./hook/useAuth";
import Filter from "./Components/Filter";
import useFilter from "./hook/useFilter";
import useRides from "./hook/useRides";
import { changeDateFormat, ApplyFilter } from "./utils/util";

// date object which gives the current time
const d = new Date();

function App() {
  // this useState for the selcted option for eg:- Nearest Ride, Upcoming Ride, Past Ride
  const [selected, setSelected] = useState(0);

  // this useState for the checking the openState of the filter section
  const [open, setOpen] = useState(false);

  // global user state
  const { auth } = useAuth();
  // global filter state
  const { filter } = useFilter();
  // global rides and setGlobalRide function
  const { globalRide, setGlobalRide } = useRides();

  // these states for the rides and region(contains all the the unique states and cities corresponding to them)
  const [rides, setRides] = useState([]);
  const [region, setRegion] = useState([]);

  const toggle = () => setOpen(!open);

  // this useEffect fetching the ride data and modifing it for future processing tasks
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://assessment.api.vweb.app/rides");
      const jsonData = await res.json();
      const data = jsonData.map((item, idx) => {
        let str = "[ ";
        item.station_path.forEach((num, id) => {
          str = str + `${num}, `;
        });
        str = str + "]";

        // calculating the minimum distance of the ride
        const MinDistance = Math.min(
          ...item.station_path.map((num) => Math.abs(num - auth.station_code))
        );

        // modifying the dates according to the need
        const { dateString, dateDisplay } = changeDateFormat(item.date);
        return {
          ...item,
          path: str,
          distance: MinDistance,
          date: dateString,
          dateDisplay: dateDisplay,
        };
      });

      // sorting the rides based on the distance
      data.sort((a, b) => {
        return a.distance - b.distance;
      });

      // making regions array
      const states = [...new Set(data.map(({ state }) => state))];
      const dd = [...Array(states.length)].map((item, idx) => {
        return {
          state: states[idx],
          city: [],
        };
      });

      data.forEach(({ state, city }) => {
        dd[states.indexOf(state)].city.push(city);
      });
      setRegion(
        dd.map(({ state, city }) => {
          const cities = [...new Set(city)];
          return { state: state, city: cities };
        })
      );

      setGlobalRide(data);
      setRides(data);
    };
    getData();
  }, [auth]);

  // this useEffect for applying the filter on the global ride state and assign to the rides

  useEffect(() => {
    const filterArray = [];
    if (filter.state !== "") filterArray.push(filter.state);
    if (filter.city !== "") filterArray.push(filter.city);

    // if Nearest Ride is selected
    if (!(selected ^ 0)) setRides(ApplyFilter(filterArray, globalRide));
    // if Upcoming Ride is selected
    else if (!(selected ^ 1))
      setRides(
        ApplyFilter(
          filterArray,
          globalRide.filter(({ date }) => {
            const d1 = new Date(date);
            return d1.getTime() - d.getTime() > 0;
          })
        )
      );
    // if Past Rides are selected
    else if (!(selected ^ 2))
      setRides(
        ApplyFilter(
          filterArray,
          globalRide.filter(({ date }) => {
            const d1 = new Date(date);
            return d1.getTime() - d.getTime() < 0;
          })
        )
      );
  }, [filter, selected]);
  return (
    <div className="App">
      <Header />
      <div
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          zIndex: 10,
        }}
      >
        <div className="filter__section">
          <div className="filter__left">
            <h2
              role={"button"}
              className={`${!(selected ^ 0) ? "filter__active" : ""}`}
              onClick={() => setSelected(0)}
            >
              Nearest rides
            </h2>
            <h2
              role={"button"}
              className={`${!(selected ^ 1) ? "filter__active" : ""}`}
              onClick={() => setSelected(1)}
            >
              Upcoming rides
            </h2>
            <h2
              role={"button"}
              className={`${!(selected ^ 2) ? "filter__active" : ""}`}
              onClick={() => setSelected(2)}
            >
              Past rides
            </h2>
          </div>
          <div className="filter__right">
            <button onClick={toggle}>
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-6.10352e-05 12.0001H5.99994V10.0001H-6.10352e-05V12.0001ZM-6.10352e-05 9.15527e-05V2.00009H17.9999V9.15527e-05H-6.10352e-05ZM-6.10352e-05 7.00009H11.9999V5.00009H-6.10352e-05V7.00009Z"
                  fill="white"
                  fill-opacity="0.8"
                />
              </svg>
              Filters
            </button>
            <Filter regions={region} open={open} />
          </div>
        </div>
      </div>

      <section
        style={{
          width: "100%",
          position: "absolute",
          minHeight: "80%",
          maxHeight: "80%",
          overflowY: "scroll",
          paddingBlock: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          bottom: "0%",
          zIndex: 1,
        }}
      >
        {rides.length === 0 ? (
          <div className="sorry__section">Sorry No Rides are available</div>
        ) : (
          rides.map((item, idx) => {
            return <Ride item={item} key={idx} />;
          })
        )}
      </section>
    </div>
  );
}

export default App;
