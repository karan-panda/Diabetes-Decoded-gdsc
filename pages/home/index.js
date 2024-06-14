import React, { useState, useEffect, useRef } from 'react';
import Sidenav from '../../components/sidenav';
import Calendar from '../../components/Calendar';
import NewsComponent from '../../components/NewsComponent';
import Link from "next/link";
import { IoCheckmarkDoneCircle, IoCheckmarkDoneSharp } from 'react-icons/io5';
import { FaAppleAlt, FaRunning, FaVial } from 'react-icons/fa';
import Modal from 'react-modal';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

export default function Layout() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Daily test', checked: false },
    { id: 2, name: 'Follow diet', checked: false },
    { id: 3, name: 'Follow exercise', checked: false }
  ]);

  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const calendarRef = useRef(null);
  const taskListRef = useRef(null);
  const newsComponentRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    setAllTasksCompleted(tasks.every(task => task.checked));
  }, [tasks]);

  const toggleCheckbox = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, checked: !task.checked } : task
    ));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startTour = () => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        }
      },
      useModalOverlay: true
    });

    tour.addStep({
      title: '<strong>Calendar</strong>',
      text: '📅 Track your consistency with our streak-like calendar. Easily monitor your daily habits and celebrate your progress towards a healthier lifestyle.',
      attachTo: {
        element: calendarRef.current,
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Next',
          action: () => tour.next()
        }
      ]
    });

    tour.addStep({
      title: '<strong>Task List</strong>',
      text: '📝 Get personalized daily tasks tailored to your needs. Stay on top of your diabetes management with custom activities like new recipes, exercises, and glucose testing reminders.',
      attachTo: {
        element: taskListRef.current,
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      title: '<strong>News Component</strong>',
      text: '📰 Stay updated with the latest in diabetes care. Our news component delivers current research, treatments, and tips to keep you informed and empowered.',
      attachTo: {
        element: newsComponentRef.current,
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      title: '<strong>Navigation Links</strong>',
      text: `<div><strong>Quickly access essential services:</strong></div>
      <ul>
        <li><strong>🥗 Healthy Diet Plan:</strong> Customized diet plans for managing diabetes.</li>
        <li><strong>🏋️ Exercise Plan:</strong> Tailored exercise routines for your health.</li>
        <li><strong>🩸 Test Diabetes:</strong> Easy access to blood sugar testing options.</li>
      </ul>`,
      attachTo: {
        element: linksRef.current,
        on: 'bottom'
      },
      buttons: [
        {
          text: 'End tour',
          action: tour.next
        }
      ]
    });

    // for styling the buttons of tours
    tour.on('show', function () {
      setTimeout(() => {
        document.querySelectorAll('.shepherd-button').forEach(button => {
          button.style.backgroundColor = '#b71c1c'; // rose dark color
          button.style.color = 'white';
          button.onmouseover = function () {
            this.style.backgroundColor = '#d32f2f';
          };
          button.onmouseout = function () {
            this.style.backgroundColor = '#b71c1c';
          };
        });
      }, 0);
    });

    tour.start();

    closeModal();
  };

  useEffect(() => {
    if (calendarRef.current && taskListRef.current && newsComponentRef.current && linksRef.current) {
      openModal();
    }
  }, [calendarRef, taskListRef, newsComponentRef, linksRef]);

  function TaskList() {
    return (
      <div className="bg-gray-200 rounded-lg p-4 flex-grow text-black">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Tour Confirmation"
          className="fixed inset-0 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Do you want to start a guided tour?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={startTour}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </Modal>

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
        <p className="">Welcome to Diabetes Decoded</p>

        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8 mt-8">
          <div className="calendar-wrapper" ref={calendarRef}>
            <Calendar allTasksCompleted={allTasksCompleted} />
          </div>

          <div ref={taskListRef} className="w-full">
            <TaskList />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row mt-8 space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="bg-gray-200 rounded-lg p-4 flex-grow space-y-4 w-full lg:w-2/3" ref={newsComponentRef}>
            <div className='bg-white rounded-md'>
              <NewsComponent />
            </div>
          </div>

          <div className="bg-gray-200 rounded-md p-4  space-y-6 w-full lg:w-1/3 flex flex-col items-center justify-center" ref={linksRef}>
            <div className='bg-pink-200 p-2 w-full flex items-center font-semibold'>
              <Link href="/diet-plan">
                <FaAppleAlt className='mr-2' />
                Healthy diet plan
              </Link>
            </div>
            <div className='bg-green-200 p-2 w-full flex items-center font-semibold'>
              <Link href="/exercise-plan">
                <FaRunning className='mr-2' />
                Exercise Plan
              </Link>
            </div>
            <div className='bg-blue-200 p-2 w-full flex items-center font-semibold'>
              <Link href="/test-diabtes">
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