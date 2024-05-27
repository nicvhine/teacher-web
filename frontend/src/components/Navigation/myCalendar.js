import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Home.css"; 

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="calendar-wrapper">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default MyCalendar;
