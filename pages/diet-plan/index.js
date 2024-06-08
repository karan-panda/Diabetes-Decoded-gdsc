import React from 'react';
import DietPlan from '../../components/DietPlan';
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import SearchNutrition from '../../components/SearchNutrition';
import Sidenav from '../../components/sidenav';
import { div } from '@tensorflow/tfjs';

export default function Info() {
  return (
    <div className="flex h-screen">
      <div className="sticky top-0 left-0 h-screen">
        <Sidenav />
      </div>
      <div className="min-h-screen bg-gray-50">
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