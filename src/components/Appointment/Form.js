import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, {
  useState
} from 'react'

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null );
  const [error, setError] = useState("");

  const reset = function () {
    setName("");
    setInterviewer(null);
  }

  const cancel = function () {
    reset()
    props.onCancel()
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank")
      return;
    }
    if (interviewer === null) {
      setError("Interviewer is required")
      return;
    }
    props.onSave(name, interviewer);
  }


const interviewerObject = props.interviewers  && props.interviewers[interviewer] ? props.interviewers[interviewer] : null 


  return ( 
    <main className = "appointment__card appointment__card--create">
      <section className = "appointment__card-left">
        <form autoComplete = "off">
          <input 
            className = "appointment__create-input text--semi-bold"
            name = "name"
            type = "text"
            value = {
              name
            }
            placeholder = "Enter Student Name"

            onChange = {
              (event) => setName(event.target.value)
            }
            data-testid = "student-name-input"
          /> 
        </form> 
      <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers = {props.interviewers} 
          interviewer = {interviewerObject}
          setInterviewer = {setInterviewer}
        /> 
      </section> 
      <section className = "appointment__card-right">
        <section className = "appointment__actions">
          <Button danger onClick = {cancel} > Cancel </Button> 
          {/* <Button confirm onClick = {() => onSave(name, interviewer)} > Save </Button>  */}
          <Button confirm onClick = {validate} > Save </Button> 
        </section> 
      </section> 
    </main>
  )
}