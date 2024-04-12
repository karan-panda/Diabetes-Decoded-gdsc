// components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

const MyCalendar = ({ allTasksCompleted }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && date.getDate() === new Date().getDate() && allTasksCompleted) {
      return (
        <div className="relative">
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-rose-700 text-2xl">
            <IoCheckmarkDoneSharp />
          </span>
        </div>
      );
    }
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={tileContent}
      />
    </div>
  );
};

export default MyCalendar;