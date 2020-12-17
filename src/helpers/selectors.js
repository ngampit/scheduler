/*** Dummy data ***/
// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },

//   interviewers : {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };




// getAppointmentsForDay function
export function getAppointmentsForDay(state, name) {
  let theAppointmentArray = [];
  if (state.days.length === 0) {
    return state.days;
  }

  const filteredDays = state.days.filter(day => day.name === name);
  if (filteredDays.length === 0) {
    return [];
  }

  for (let idAppointment of filteredDays[0].appointments) {
    for (let key of (Object.keys(state.appointments))) {
      if (Number(key) === idAppointment) {
        theAppointmentArray.push(state.appointments[key])
      }
    }
  }
  return theAppointmentArray;
}


// getInterview function
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  };
  const returnObj = {
    student: interview.student,
    interviewer: {
      id: state.interviewers[interview.interviewer].id,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  };
  return returnObj;
};


// getInterviewerForDay function
export function getInterviewerForDay(state, name) {
  let theAppointmentArray = getAppointmentsForDay(state, name);

  let result = [];
  let appointments = []
  if (state.days.length === 0) {
    return state.days;
  }

  const filteredDays = state.days.filter(day => day.name === name);
  if (filteredDays.length === 0) {
    return [];
  }

  for (let appointment of theAppointmentArray) {
    if (appointment.interview !== null) {
      appointments.push(appointment.interview.interviewer);
    }
  }
  // push to result
  for (let interviewer of appointments) {
    result.push(state.interviewers[interviewer])
  }

  // Return array of interviewers from appointments that happen on monday.
  return result;
}

//console.log(getInterviewerForDay(state,"Monday"));