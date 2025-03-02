import React from 'react';
import DietPlan from '../../components/DietPlan';
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import SearchNutrition from '../../components/SearchNutrition';
import Sidenav from '../../components/sidenav';
import ChatBot from '@/components/Chatbot';

export default function Info() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <ChatBot></ChatBot>
      {/* Sidenav */}
      <div className="w-1/4">
        <Sidenav className="fixed top-0 left-0 h-screen w-full" />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-scroll bg-gray-50 ml-1/4">
        <Head>
          <title>Nutrition and Recipes Search</title>
          <meta name="description" content="Search for nutrition information and recipes" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center py-8">
          <h1 className="text-4xl font-bold text-rose-700 mb-3">🥗Nutrition and Recipe Search</h1>
          <SearchNutrition />
        </main>
      </div>
    </div>
  );
}
