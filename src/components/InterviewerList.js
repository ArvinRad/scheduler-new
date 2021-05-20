import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

// MyComponent.propTypes = {
//   // Determine the Props type for test.
//   optionalArray: PropTypes.array,
// };



export default function InterviewerList(props) {
  let myInterviewers = [];
  if(props.interviewers !== undefined) myInterviewers =props.interviewers;
    const list = Object.values(myInterviewers).map((interviewer) => (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)} />
      ));


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {list}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};