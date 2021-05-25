import {useState, useEffect} from "react";
import axios from "axios";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState((prev) => {
    return {...prev, days};
  });
  const setAppointments = appointments => setState((prev) => {
    return { ...prev, appointments };
  });
  const setInterviewers = interviewers => setState((prev) => {
    return { ...prev, interviewers };
  });

// Axios and state arrays filling
  useEffect(() => {
    const url1 = `/api/days`
    const url2 = `/api/appointments`
    const url3 = `/api/interviewers`


    const Promise1 = axios.get(url1);
    const Promise2 = axios.get(url2);
    const Promise3 = axios.get(url3);


    Promise.all([Promise1, Promise2, Promise3]).then((res)  => {
      setDays([...res[0].data]);
      setAppointments({...res[1].data});
      setInterviewers({...res[2].data});
    })
    .catch(err => console.log(err));
  }, []);

  //Find the day when the appointment array changes
  const getDay = (id) => {
    let getDayIndex = 0;
  if (id) {
    getDayIndex = state.days.indexOf(state.days
   .find(day => day.appointments.includes(id)));
  };
  return getDayIndex
  }


  // Book a new interview
  const bookInterview = (id, interview) => {
    //Make data persistant
    return axios.put(`/api/appointments/${id}`, {interview})
    .then ((res) => {

      if (state.appointments[id].interview === null) {
        state.days[getDay(id)].spots = state.days[getDay(id)].spots - 1;
      }
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        // Update the days array

        state.days.map(day =>
          day.name === state.days[getDay(id)].name ?  state.days[getDay(id)] : day);

         //Update the state
        setState({...state, appointments});

    });
  };

  // Delete an interview
  const deleteInterview = (id) => {
    //Make data persistant
    return axios.delete(`/api/appointments/${id}`)
    .then ((res) => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        state.days[getDay(id)].spots = state.days[getDay(id)].spots + 1;
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        state.days.map(day =>
          day.name === state.days[getDay(id)].name ? state.days[getDay(id)] : day);

         //Update the state
        setState({...state, appointments});
    });
  };

  return { state, setDay, bookInterview, deleteInterview };
}
