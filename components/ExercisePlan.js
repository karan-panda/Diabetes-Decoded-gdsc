import React from 'react';

const ExerciseList = () => {
  const exercises = [
    {
      name: 'Walking',
      image: '/walking.webp',
      steps: ['Put on comfortable shoes.', 'Start walking at a comfortable pace.', 'Maintain good posture.', 'Walk for 30 minutes or as tolerated.'],
    },
    {
      name: 'Cycling',
      image: '/cycling.avif',
      steps: ['Adjust the bike to your height.', 'Start pedaling at a steady pace.', 'Keep your back straight and shoulders relaxed.', 'Cycle for 30 minutes or as tolerated.'],
    },
    {
      name: 'Swimming',
      image: '/swimming.jpg',
      steps: ['Wear appropriate swimwear.', 'Enter the water slowly.', 'Start swimming with a stroke of your choice.', 'Swim for 30 minutes or as tolerated.'],
    },
    {
      name: 'Yoga',
      image: '/yoga.png',
      steps: ['Find a quiet, comfortable place to practice.', 'Follow a yoga routine that includes gentle stretches and poses.', 'Focus on your breathing and relaxation.', 'Practice for 30 minutes or as tolerated.'],
    },
    {
      name: 'Tai Chi',
      image: '/taichi.avif',
      steps: ['Find a peaceful outdoor or indoor space.', 'Follow along with a Tai Chi instructional video or class.', 'Move slowly and mindfully through each movement.', 'Practice for 30 minutes or as tolerated.'],
    },
    {
      name: 'Chair Exercises',
      image: '/chair.jpg',
      steps: ['Sit in a sturdy chair with your feet flat on the ground.', 'Do seated exercises like arm circles, leg lifts, and seated marches.', 'Focus on controlled movements and proper breathing.', 'Exercise for 30 minutes or as tolerated.'],
    },
    {
      name: 'Resistance Band Training',
      image: '/resistance-bands.webp',
      steps: ['Securely anchor the resistance band to a stable object.', 'Grab the handles or loops and perform exercises like bicep curls, chest presses, and leg extensions.', 'Focus on proper form and controlled movements.', 'Exercise for 30 minutes or as tolerated.'],
    },
    {
      name: 'Pilates',
      image: '/pilates.jpg',
      steps: ['Find a comfortable mat or padded surface.', 'Follow a Pilates routine that includes exercises for core strength, flexibility, and balance.', 'Focus on controlled movements and proper breathing.', 'Exercise for 30 minutes or as tolerated.'],
    },
    {
      name: 'Stationary Jogging',
      image: '/stationary-jogging.jpeg',
      steps: ['Stand on a stable surface with good support.', 'Begin jogging in place, lifting your knees and swinging your arms.', 'Maintain a steady pace and rhythm.', 'Jog for 30 minutes or as tolerated.'],
    },
    {
      name: 'Gardening',
      image: '/gardening.png',
      steps: ['Find a comfortable gardening spot with good access to sunlight and water.', 'Start with light tasks like watering plants, weeding, and planting seeds.', 'Use proper gardening tools and techniques to avoid strain.', 'Garden for 30 minutes or as tolerated.'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Exercise List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={exercise.image} alt={exercise.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
              <ul className="list-disc list-inside">
                {exercise.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="mb-2">{step}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
