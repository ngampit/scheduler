import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "components/Appointment/Error";

export default function Index(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const DELETING = "DELETING";
  const SAVING = "SAVING";
  const CREATE = "CREATE"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

const { mode, transition, back} = useVisualMode(
  props.interview? SHOW : EMPTY
);

//saving function
function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);
  props.bookInterview(props.id, interview)
  .then(()=>transition(SHOW))
  .catch(()=>{
          console.log('error')
          transition(ERROR_SAVE, true)
  });
  
}

//Edit Save
function saveEdit(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);
  props.bookInterviewE(props.id, interview)
  .then(()=>transition(SHOW))
  .catch(()=>{
          console.log('error')
          transition(ERROR_SAVE, true)
  });
  
}

// deleting function
function deleteApp(){
  transition(DELETING)
  props.cancelInterview(props.id)
  .then(()=>transition(EMPTY))
  .catch(()=>{
           console.log('error')
           transition(ERROR_DELETE,true)})
}


// editing function 
function editApp() {
  transition(EDIT)  
}

 return (
     <article className="appointment" data-testid="appointment">
      <Header time = {props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
        <Show 
        onDelete={()=>transition(CONFIRM)}
        onEdit={editApp}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        />
      }
      {mode === CREATE && 
        <Form interviewers={props.interviewers} onCancel={()=>back()}
              onSave={save}></Form>
      }
      {mode === DELETING &&
        <Status message = "DELETING" />
      }
      {mode === SAVING &&
        <Status message = "SAVING" />
      }
      
      {mode === CONFIRM &&
       <Confirm message = "CONFIRM"  onConfirm={deleteApp} onCancel={()=>back()}/>
      }

      {mode === EDIT && 
      <section>
        <Form interviewers = {props.interviewers}   onCancel={()=>back()}
              onSave={saveEdit} name = {props.interview.student} interviewer={props.interview.interviewer.id}/>
      </section>        
      }
     
      {mode === ERROR_SAVE &&
        <Error message = "ERROR_SAVE" onClose={()=>back()}/>
      }

      {mode === ERROR_DELETE &&
        <Error message = "ERROR_DELETE" onClose={()=>back()}/>
      }

     </article> 
  )
}


