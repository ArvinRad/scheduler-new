import React, { useState } from "react";
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"


export default function Form(props) {

  const [studentName, setStudentName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer ||null);
  const [error, setError] = useState("");


  const reset = () => {
    setStudentName("");
    setInterviewer(null);
  };

   const onSave = function () {
    if(studentName && interviewer) props.onSave(studentName, interviewer);
    if (studentName === "") {
      setError("Student name cannot be blank");
      console.log(error);
      return;
    }
    setError("");
    reset();
   }

   const onCancel = function() {
     props.onCancel();
     reset();
   }

   return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()} >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={props.name}
            onChange={event => setStudentName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}