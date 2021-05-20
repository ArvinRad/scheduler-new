import React, {Fragment} from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import selectors from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData"
import "components/Application.scss";



export default function Application() {

  // state and its initiating

  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

 // Find daily appoitment and Interviewers from the helpers

  const {
    getAppointmentsForDay,
    getInterviewersForDay,
    getInterview
  } = selectors (state, state.day);

  // Prepare props and call for showing appointment
  const appointmentList = Object.values(getAppointmentsForDay(state, state.day)).map((app) => {

    if (app !== undefined) {
      const interviewData = getInterview(state, app.interview);
      return <Appointment
        key={app.id}
        bookInterview={bookInterview}
        deletedInterview={deleteInterview}
        interviewShow={interviewData}
        dailyInterviewers={getInterviewersForDay(state, state.day)}
        {...app}
        />
    };
  });

 // Start the show
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      <Fragment>
        <ul>
          {appointmentList}
          <Appointment key="last" time="6pm" />
        </ul>
        </ Fragment >
      </section>
    </main>
  );
}
