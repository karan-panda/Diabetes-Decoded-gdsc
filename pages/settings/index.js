import Sidenav from '../../components/sidenav';

export default function Layout() {
  return (
    <div className="flex bg-white">
      <Sidenav />
      <div className=''>
        {/* Dashboard content */}
        <h1 className='text-2xl font-bold mb-4'>Settings</h1>
        <div className="flex justify-center items-center">
          <p className="text-center">Welcome to the Settings!</p>
        </div>
      </div>
    </div>
  );
}
