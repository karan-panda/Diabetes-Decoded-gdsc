import React, { useState } from 'react';
import Sidenav from '../../components/sidenav';
import Calendar from '../../components/Calendar';
import { IoRadioButtonOn } from "react-icons/io5";

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
      <div className="bg-gray-200 rounded-lg p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-4">Tasks</h2>
        <div className="space-y-4">
          {tasks.map(task => (
            <div className="flex items-center justify-between" key={task.id}>
              <div className="flex items-center">
                <IoRadioButtonOn className="mr-2" />
                <span>{task.name}</span>
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
    <div className="flex h-screen bg-white">
      <Sidenav />
      <div className="flex flex-col p-8 w-full">
        <h1 className="text-2xl font-bold mb-4">Hello User</h1>
        <p className="">Welcome to Diabetes Track</p>

        <div className="flex space-x-8 mt-8">
          <div className="calendar-wrapper">
            <Calendar />
          </div>

          <TaskList /> {/* Embedding TaskList component here */}

        </div>

        <div className="flex mt-8 space-x-8">
          <div className="bg-gray-200 rounded-lg p-4 flex-grow space-y-4">
            <h2 className="text-lg font-semibold mb-4">News on Diabetes</h2>
            <div className='bg-white rounded-md'>
              News_1
            </div>
            <div className='bg-white rounded-md'>
              News_2
            </div>
          </div>

          <div className="bg-gray-200 rounded-md p-4 ml-8 flex space-x-6">
            <div className='bg-pink-200 p-2'>Healty diet plan</div>
            <div className='bg-green-200 p-2'>Exercise Plan</div>
            <div className='bg-blue-200 p-2'>Test diabetes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
