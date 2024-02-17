import Sidenav from '../../components/sidenav';
import Graph from '../../components/graph'; 

export default function Layout() {
  return (
    <div className="flex bg-white">
      <Sidenav />
      <div className='flex justify-center items-center flex-grow'>
        <Graph /> 
      </div>
    </div>
  );
}