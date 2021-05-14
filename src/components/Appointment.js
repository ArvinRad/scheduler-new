import React from 'react'
import "./Appointment/styles.scss";
import Header from "./Appointment/Header";
import Empty from "./Appointment/Empty";
import Show from "./Appointment/Show";

export default function Appointment(props) {

  return (
      <article className="appointment">
        <Header {...props}/>
        {props.interview ? <Show {...props}/> : <Empty {...props}/>}
      </article>
  );
}