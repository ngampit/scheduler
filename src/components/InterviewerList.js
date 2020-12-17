import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  ];


export default function InterviewerList(props){

  // InterviewerList.propTypes = {
  //   interviewers : PropTypes.array.isRequired
  // };

    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
    
    {interviewers.map((interviewer,index) =>{
    
    return(
      <InterviewerListItem
        key={index}
        id={interviewer.id}
        name={interviewer.name} 
        url={interviewer.avatar} 
        selected={props.interviewer && interviewer.id === props.interviewer.id}
        setInterviewer={props.setInterviewer}  
      />
    )
                
    })}
        </ul>
      </section>
    )
}
