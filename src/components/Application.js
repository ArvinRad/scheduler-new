import React, {Fragment} from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import selectors from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData"
import "components/Application.scss";



export default function Application(props) {

  // state and its initiating

//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {}
//     // filteredAppointments: []
//   });
//   const setDay = day => setState({ ...state, day });
//   const setDays = days => setState((prev) => {
//     return {...prev, days};
//   });
//   const setAppointments = appointments => setState((prev) => {
//     return { ...prev, appointments };
//   });
//   const setInterviewers = interviewers => setState((prev) => {
//     return { ...prev, interviewers };
//   });

// // Axios and state arrays filling
//   useEffect(() => {
//     const url1 = `/api/days`
//     const url2 = `/api/appointments`
//     const url3 = `/api/interviewers`


//     const Promise1 = axios.get(url1);
//     const Promise2 = axios.get(url2);
//     const Promise3 = axios.get(url3);


//     Promise.all([Promise1, Promise2, Promise3]).then((res)  => {
//       setDays([...res[0].data]);
//       setAppointments({...res[1].data});
//       setInterviewers({...res[2].data});
//     })
//     .catch(err => console.log(err));
//   }, []);
// Call for state data initiation and callbacks

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

  // const dailyAppointments = getAppointmentsForDay (state, state.day);
  // const dailyInterviewers = getInterviewersForDay (state, state.day);

// // Book a new interview
//   const bookInterview = (id, interview) => {
//     //Make data persistant
//     return axios.put(`/api/appointments/${id}`, {interview})
//     .then ((res) => {
//         const appointment = {
//           ...state.appointments[id],
//           interview: { ...interview }
//         };
//         const appointments = {
//           ...state.appointments,
//           [id]: appointment
//         };
//          //Update the state
//         setState({...state, appointments});
//     });
//   };

//   // Delete an interview
//   const deleteInterview = (id) => {
//     //Make data persistant
//     return axios.delete(`/api/appointments/${id}`)
//     .then ((res) => {
//         const appointment = {
//           ...state.appointments[id],
//           interview: null
//         };
//         const appointments = {
//           ...state.appointments,
//           [id]: appointment
//         };
//          //Update the state
//         setState({...state, appointments});
//     });
//   };

  // Prepare props and call for showing appointment
  const appointmentList = Object.values(getAppointmentsForDay).map((app) => {

    if (app !== undefined) {
      const interviewData = getInterview(state, app.interview);
      return <Appointment
        key={app.id}
        bookInterview={bookInterview}
        deletedInterview={deleteInterview}
        interviewShow={interviewData}
        dailyInterviewers={getInterviewersForDay}
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
