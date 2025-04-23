"use client"

import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { IoCheckmarkDoneSharp } from "react-icons/io5"

const MyCalendar = ({ allTasksCompleted }) => {
  const [date, setDate] = useState(new Date())

  const onChange = (newDate) => {
    setDate(newDate)
  }

  // Custom styling for the calendar
  const calendarStyles = `
    .react-calendar {
      width: 100%;
      border: none;
      border-radius: 0.5rem;
      font-family: inherit;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .react-calendar__tile {
      padding: 0.75em 0.5em;
      position: relative;
    }
    .react-calendar__tile--now {
      background: #f0f9ff;
    }
    .react-calendar__tile--active {
      background: #3b82f6;
      color: white;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      background: #2563eb;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: #f0f9ff;
    }
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background-color: #e0f2fe;
    }
    .react-calendar__month-view__days__day--weekend {
      color: #ef4444;
    }
  `

  const tileContent = ({ date, view }) => {
    if (
      view === "month" &&
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear() &&
      allTasksCompleted
    ) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-green-500 opacity-20 rounded-full"></div>
          <IoCheckmarkDoneSharp className="text-green-700 text-xl z-10" />
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <style>{calendarStyles}</style>
      <Calendar 
        onChange={onChange} 
        value={date} 
        tileContent={tileContent} 
        className="rounded-lg shadow-sm"
        locale="en-US" // Fix hydration warning by forcing consistent locale
      />
    </div>
  )
}

export default MyCalendar

