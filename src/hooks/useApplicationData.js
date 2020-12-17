import React, {
  useState,
  useEffect
} from "react";
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({
    ...prev,
    day
  }))

  useEffect(() => {
    Promise.all([
        axios.get(("http://localhost:8001/api/days")),
        axios.get(("http://localhost:8001/api/appointments")),
        axios.get(("http://localhost:8001/api/interviewers")),
      ])
      .then((all) => {
        // console.log("days", all[0])
        // console.log("appointment",all[1])
        // console.log("interviewers",all[2])
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
      .catch((err) => {
        console.log("retrieve data error", err)
      });
  }, [])
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview
      }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = spotsRemaining()

    //filter state to get the info for specific day 
    // update spots remaining for that day
    const days = [...state.days]
    const day = days.find(day => day.name === state.day)
    day.spots = spots - 1

    const url = `http://localhost:8001/api/appointments/${id}`
    return axios.put(url, {
        ...appointment
      })

      .then(() => {
        setState(prev => ({
          ...prev,
          appointments
        }));
        setState(prev => ({
          ...prev,
          days
        }))
      })
      .catch((err) => {
        console.log("catch with create appointment", err)
      })
  }



  // cancelInterview Function
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = spotsRemaining()
    const days = [...state.days]
    const day = days.find(day => day.name === state.day)
    console.log("day", day)
    day.spots = spots + 1

    const url = `http://localhost:8001/api/appointments/${id}`
    return axios.delete(url)
      .then((res) => {
        setState({
          ...state,
          appointments
        });
        //       setState({...prev => ({...prev,days})})
      })
      .catch((err) => {
        console.log("catch with cancel appointment", err)
      })
  }



  // ** Below two functions get an up to day spots remaining **
  const getObject = () => {
    const appDay = state.day;
    const appWeek = state.days;
    let obj = {};
    for (let i = 0; i < appWeek.length; i++) {
      if (appWeek[i].name === appDay) {
        obj = appWeek[i];
      }
    }
    return obj;
  }

  function spotsRemaining() {
    const spot = getObject()
    return spot.spots;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}