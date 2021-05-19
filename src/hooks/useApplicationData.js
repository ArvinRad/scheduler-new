import React, {useState, useEffect} from "react";
import axios from "axios";


const useApplicationData = (id, interview) => {
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

  let getDayIndex = 0;
  if (id) {
    getDayIndex = state.days.indexOf(state.days
   .find(day => day.appointment.includes(id)));
  };

  // Book a new interview
  const bookInterview = (id, interview) => {
    //Make data persistant
    return axios.put(`/api/appointments/${id}`, {interview})
    .then ((res) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const day = {
          ...state.days[getDayIndex],
          spots: this.spots + 1,
          appointment: [...appointment,id],
          interviewers: [...interviewers, interview.interviewer]
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        state.days.splice(getDayIndex, 1, day);
         //Update the state
        setState({...state, days, appointments});
    });
  };

  // Delete an interview
  const cancelInterview = (id) => {
    //Make data persistant
    return axios.delete(`/api/appointments/${id}`)
    .then ((res) => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const day = {
          ...state.days[getDayIndex],
          spots: spots - 1,
          appointment: appointment.filter(item => item !== id),
          interviewers: interviewers.filter(item => item !== interview.interviewer)
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
         //Update the state
        setState({...state, days, appointments});
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}


export default useApplicationData;
