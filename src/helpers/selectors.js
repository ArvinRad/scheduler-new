
export default function selectors() {
  // function for creating the appointment array for a specific day
  const getAppointmentsForDay = (state, day) => {
    let filteredAppointments = [];
    if (day &&  state.days.length > 0) {
      const myAppointments = (state.days.find(item => item.name === day)).appointments;
      for (let elm of myAppointments) {
        if (Object.keys(state.appointments).length > 0) {
          filteredAppointments = [...filteredAppointments, state.appointments[elm]];
        }
      }
    }
    return filteredAppointments;
  }
  // function for creating the interview array for a specific day

  const getInterviewersForDay = (state, day) => {
    let filteredInterviewers = [];
    if (day && state.days.length > 0) {
      const myInterviewers = (state.days.find(item => item.name === day)).interviewers;
      for (let elm of myInterviewers) {
        filteredInterviewers = [...filteredInterviewers, state.interviewers[elm]];
      }
    }
    return filteredInterviewers;
  }
  // function for creating the interview object with full interviewer data

  const getInterview = (state, interview) => {
  let getInterview = {};
    if (interview) {
      const interviewerData = state.interviewers[interview.interviewer];
      getInterview = {student: interview.student, interviewer: interviewerData};
      }
    return getInterview;
  }
  return { getAppointmentsForDay, getInterviewersForDay, getInterview }
}

