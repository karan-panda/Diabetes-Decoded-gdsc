import Image from 'next/image'; // Importing Image component for optimized images

const foods = [
  { code: '01', name: 'Oats', nutritionalValue: 'High in fiber, low GI', healthBenefits: 'Helps control blood sugar levels, improves heart health', imageUrl: '/images/download.jpg' },
  { code: '02', name: 'Leafy Greens', nutritionalValue: 'Low in calories, high in vitamins and minerals', healthBenefits: 'Lowers blood pressure, improves eye health', imageUrl: '/images/leafy.jpg' },
  { code: '03', name: 'Fatty Fish', nutritionalValue: 'Rich in omega-3 fatty acids, high-quality protein', healthBenefits: 'Reduces heart disease risk, aids in blood sugar control', imageUrl: '/images/fish.jpg' },
  { code: '04', name: 'Nuts and Seeds', nutritionalValue: 'High in fiber, healthy fats', healthBenefits: 'Promotes weight management, lowers blood sugar levels', imageUrl: '/images/seed.jpg' },
  { code: '05', name: 'Whole Grains', nutritionalValue: 'High in fiber and nutrients', healthBenefits: 'Supports healthy digestion, maintains steady blood sugar', imageUrl: '/images/grains.jpg' },
  { code: '06', name: 'Legumes', nutritionalValue: 'Rich in fiber and protein', healthBenefits: 'Controls blood sugar, lowers risk of heart disease', imageUrl: '/images/legumes.jpg' },
  { code: '07', name: 'Berries', nutritionalValue: 'High in antioxidants, vitamins', healthBenefits: 'Fights inflammation, reduces blood sugar levels', imageUrl: '/images/berries.jpg' },
];

export default function DietPlan() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Diabetic Diet Plan</h2>
      <ul className="space-y-2">
        {foods.map((food) => (
          <li key={food.code} className="border p-4 rounded-lg flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 mb-4 md:mb-0 md:mr-4 relative">
              <Image src={food.imageUrl} alt={food.name} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{food.name} <span className="text-sm text-gray-500">({food.code})</span></h3>
              <p><strong>Nutritional Value:</strong> {food.nutritionalValue}</p>
              <p><strong>Health Benefits:</strong> {food.healthBenefits}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
