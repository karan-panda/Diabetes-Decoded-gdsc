import Sidenav from '../../components/sidenav';

export default function Layout() {
  return (
    <div className="flex bg-white">
      <Sidenav />
      <div className=''>
        {/* Dashboard content */}
        <h1 className='text-2xl font-bold mb-4'>Testing</h1>
        <div className="flex justify-center items-center">
          <p className="text-center">Welcome to the Testing Page!</p>
        </div>
      </div>
    </div>
  );
}
