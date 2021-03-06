import React, {useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterviewerForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    bookInterviewE
  } = useApplicationData();

 const appointments = getAppointmentsForDay(state,state.day)
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
          bookInterviewE={bookInterviewE}
          cancelInterview={cancelInterview}
        />
        )
      })}  
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
