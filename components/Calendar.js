"use client"

import { useState, useEffect } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { getCompletedDates, storeCompletedDate, areAllTasksCompleted } from "../lib/firebase"

const MyCalendar = ({ allTasksCompleted }) => {
  const [date, setDate] = useState(new Date())
  const [completedDates, setCompletedDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [optimisticTodayCompleted, setOptimisticTodayCompleted] = useState(false)

  useEffect(() => {
    // Load completed dates from Firestore
    const loadCompletedDates = async () => {
      setLoading(true)
      try {
        const dates = await getCompletedDates()
        // Convert string dates to Date objects
        const dateObjects = dates.map(dateStr => new Date(dateStr))
        setCompletedDates(dateObjects)
      } catch (error) {
        console.error("Error loading completed dates:", error)
      }
      setLoading(false)
    }

    loadCompletedDates()
  }, [])

  useEffect(() => {
    // When all tasks are completed for today, immediately update UI then store in Firestore
    const updateCompletionStatus = async () => {
      if (allTasksCompleted) {
        // Immediately update UI optimistically
        setOptimisticTodayCompleted(true)
        
        // Then perform the backend operations
        const areAllCompleted = await areAllTasksCompleted()
        if (areAllCompleted) {
          await storeCompletedDate()
          // Refresh the completed dates
          const dates = await getCompletedDates()
          const dateObjects = dates.map(dateStr => new Date(dateStr))
          setCompletedDates(dateObjects)
        } else {
          // Revert the optimistic update if backend says tasks aren't complete
          setOptimisticTodayCompleted(false)
        }
      } else {
        // Immediately update UI when a task is unticked
        setOptimisticTodayCompleted(false)
      }
    }

    updateCompletionStatus()
  }, [allTasksCompleted])

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

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
  }

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      // Check if this date is in our completedDates array
      const isCompleted = completedDates.some(completedDate => isSameDay(completedDate, date))
      
      // Check if this is today and all tasks are completed (using optimistic state)
      const isToday = isSameDay(date, new Date()) && (allTasksCompleted || optimisticTodayCompleted)

      if (isCompleted || isToday) {
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500 opacity-20 rounded-full"></div>
            <IoCheckmarkDoneSharp className="text-green-700 text-xl z-10" />
          </div>
        )
      }
    }
    return null
  }

  if (loading) {
    return <div className="p-4 text-center">Loading calendar data...</div>
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

