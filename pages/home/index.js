import React, { useState } from 'react';
import Sidenav from '../../components/sidenav';
import Calendar from '../../components/Calendar';
import NewsComponent from '../../components/NewsComponent';
import Link from "next/link";
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { FaAppleAlt, FaRunning, FaVial } from 'react-icons/fa';

export default function Layout() {
  function TaskList() {
    const [tasks, setTasks] = useState([
      { id: 1, name: 'Daily test', checked: false },
      { id: 2, name: 'Follow diet', checked: false },
      { id: 3, name: 'Follow exercise', checked: false }
    ]);

    const toggleCheckbox = (taskId) => {
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      ));
    };

    return (
      <div className="bg-gray-200 rounded-lg p-4 flex-grow text-black">
        <h2 className="text-lg font-semibold mb-4">Tasks</h2>
        <div className="space-y-4">
          {tasks.map(task => (
            <div className="flex items-center justify-between bg-white p-4 rounded-md shadow" key={task.id}>
              <div className="flex items-center">
                <IoCheckmarkDoneCircle className={`${task.checked ? 'line-through text-red-700' : ''} mr-4`} />
                <span className={task.checked ? 'line-through text-red-700' : ''}>{task.name}</span>
              </div>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleCheckbox(task.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidenav />
      <div className="flex flex-col p-8 w-full">
        <h1 className="text-2xl font-bold mb-4">Hello User</h1>
        <p className="">Welcome to Diabetes Track</p>

        <div className="flex space-x-8 mt-8">
          <div className="calendar-wrapper">
            <Calendar />
          </div>

          <TaskList />

        </div>

        <div className="flex mt-8 space-x-8">
          <div className="bg-gray-200 rounded-lg p-4 flex-grow space-y-4 w-2/3">
            <div className='bg-white rounded-md'>
              <NewsComponent />
            </div>
          </div>

          <div className="bg-gray-200 rounded-md p-4 ml-8 space-y-6 w-1/3 flex flex-col items-center justify-center">
            <div className='bg-pink-200 p-2 w-full flex items-center font-semibold'>
              <FaAppleAlt className='mr-2' />
              Healthy diet plan
            </div>
            <div className='bg-green-200 p-2 w-full flex items-center font-semibold'>
            <Link href="/exercise-plan">
              <FaRunning className='mr-2' />
              Exercise Plan
            </Link>
            </div>
            <div className='bg-blue-200 p-2 w-full flex items-center font-semibold'>
            <Link href="/testing">
              <FaVial className='mr-2' />
              Test diabetes
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}