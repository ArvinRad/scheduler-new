
const getAppointmentsForDay = (state, day) => {
  let filteredAppointments = [];
  if (day && JSON.stringify(state.days).includes(day)) {
    const myAppointments = (state.days.filter(item => item.name === day)[0]).appointments;
    for (let elm of myAppointments) {
      filteredAppointments = [...filteredAppointments, state.appointments[elm]];
    }
  }
  return filteredAppointments;
}

const getInterviewersForDay = (state, day) => {
  let filteredInterviewers = [];
  if (day && JSON.stringify(state.days).includes(day)) {
    const myInterviewers = (state.days.filter(item => item.name === day)[0]).interviewers;
    for (let elm of myInterviewers) {
      filteredInterviewers = [...filteredInterviewers, state.interviewers[elm]];
    }
  }
  return filteredInterviewers;
}

const getInterview = (state, interview) => {
  let getInterview = null;
  if (interview && JSON.stringify(state.appointments).includes(interview.student)) {
    const interviewerData = Object.values(state.interviewers)[interview.interviewer - 1];
    getInterview = {student: interview.student, interviewer: interviewerData};
    }
  return getInterview;
}


  module.exports = { getAppointmentsForDay, getInterviewersForDay, getInterview }
