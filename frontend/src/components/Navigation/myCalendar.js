import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    // Add any additional logic for handling date changes
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default MyCalendar;
