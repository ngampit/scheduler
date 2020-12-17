import React, {useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterviewerForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];  



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

export default function Application(props) {
// const [day, setDay] = useState("Monday")
// const [days, setDays] = useState([]);
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


 //const dailyAppointments = [];
 const appointments = getAppointmentsForDay(state,state.day)
 //console.log("interviewers", state.interviewers);
 const interviewers = getInterviewerForDay(state, state.day);

  return (
    <main className="layout">
   
      <section className="sidebar">
       <aside>
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
       </aside>
      
      </section>

      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointments.map((appointment)=>{
          const interview = getInterview(state, appointment.interview);
           
       return (
        <Appointment 
          key={appointment.id} 
          id={appointment.id}
          time={appointment.time}
          interview={interview} 
          interviewers={state.interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
        )
      })}  
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
