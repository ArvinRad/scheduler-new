import React from 'react'
import useVisualMode from "hooks/useVisualMode"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

// Define deiffernt operation modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {


 const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  // Book a new appointment/ Save changes to an existing appointment

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((err) => {
      transition(ERROR_SAVE, true)
      });
  };


  // Delete a new appointment

  function deleteAnInterview() {
    transition(DELETING, true);
    props
    .deletedInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((err) => transition(ERROR_DELETE, true));
};

  return (
      <article className="appointment">
        <Header {...props}/>
        {mode === EMPTY &&
          <Empty
          onAdd={() => transition(CREATE)} {...props}
          />}
        {mode === SHOW &&
           <Show
              student={props.interview.student}
              interviewer={props.interviewShow.interviewer}
              onEdit={() => transition(EDIT)}
              onDelete={() => transition(CONFIRM)}
            />}
        {mode === CREATE &&
          <Form
            interviewers={props.dailyInterviewers}
            onCancel={() => transition(EMPTY)}
            onSave={save}
            />}
        {mode === EDIT &&
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.dailyInterviewers}
            onCancel={back}
            onSave={save}
          />}
        {mode === SAVING &&
          <Status message="Saving"
          />}
        {mode === DELETING &&
          <Status
          message="Deleting"
          />}
        {mode === CONFIRM &&
          <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleteAnInterview} onCancel={() => transition(SHOW)}
          />}
          {(mode === ERROR_DELETE) &&
          <Error
          message="Could not do the delete."
          onClose={() => transition(SHOW)}
          />}
          {(mode === ERROR_SAVE) &&
          <Error
          message="Could not do the save."
          onClose={() => {props.interview ? transition(SHOW) : transition(CREATE)}}
          />}
        </article>
  );
}