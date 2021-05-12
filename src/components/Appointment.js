import React from "react";
import "components/Appointment.scss";

export default function Appointment(props) {

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{spotsText()}</h3>
    </li>
  );
}