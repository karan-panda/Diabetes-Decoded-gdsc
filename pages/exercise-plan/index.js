import ExercisePlan from "../../components/ExercisePlan";
import React from 'react';
import SideNav from "../../components/sidenav";

const index = () => {
  return (
    <div className="flex h-screen">
      <SideNav />
      <ExercisePlan />
    </div>
  )
}

export default index