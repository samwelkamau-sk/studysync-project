import { useState } from 'react';
import Search from './Search';
import { FaUserCircle } from 'react-icons/fa';
// import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5"; // Ionicons style

// import Name from './Name';

function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "React Assignment", done: false, date: "20 May" },
    { id: 2, title: "Math Quiz", done: false, date: "22 May" },
    { id: 3, title: "Database Project", done: true, date: "25 May" },
    { id: 4, title: "English Essay", done: true, date: "18 May" },
  ]);
  // CALCULATIONS 
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.done).length;
  const pendingCount = totalTasks - completedCount;
  
  // Calculate percentage for the chart
  const percentageCompleted = Math.round((completedCount / totalTasks) * 100);
  const percentagePending = Math.round((pendingCount/totalTasks)*100);

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FE]">
      {/* SIDEBAR */}
      {/* <div className="w-64 bg-[#2D2B7E] text-white p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-10 italic">StudySync</h2>
        <nav className="space-y-4 flex-1">
          <div className="bg-white/20 p-3 rounded-lg">🏠 Dashboard</div>
          <div className="p-3 opacity-70">📝 Tasks</div>
          <div className="p-3 opacity-70">📅 Calendar</div>
        </nav>
      </div> */}

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between">
          <h1 className='text-3xl mb-6 text-black-600'>Dashboard</h1>
          <Search/>
         <FaUserCircle className='h-12 w-12 text-gray-500'/>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white p-10 rounded-xl shadow-sm border-b-4 h-30 w-380 flex items-center justify-between pt-30 pb-30'>
            <div>
            <h2 className='text-2xl mb-3 mt-3 '>Hello!👋</h2>
            <p>Stay organized and start working on you study goals</p>
            </div>
            <img src="/src/assets/woman.webp" alt="" className='l-30 w-40 '/> 
            

          </div>

        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-blue-500">
            <p className="text-gray-400 text-sm"> 
              <img src="/src/assets/todo.png" alt="Total" className='w-9 h-8' />Total</p>
            <p className="text-3xl font-bold">{totalTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-green-500 ">
            <p className="text-gray-400 text-sm ">
              <img src="/src/assets/check.png" alt="Complete" className='w-9 h-9' /> Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-yellow-500">
            <p className="text-gray-400 text-sm">
              <img src="/src/assets/spinner-of-dots.png" alt="" className='w-9 h-9'/>Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-purple-500">
            <p className="text-gray-400 text-sm">Progress</p>
            <p className="text-3xl font-bold">{percentageCompleted}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* TASK LIST */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="font-bold text-xl mb-6">Your Study Tasks</h3>
            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div>
                    <p className={`font-bold ${task.done ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{task.date}</p>
                  </div>
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                      task.done ? 'bg-green-100 text-green-700' : 'bg-[#2D2B7E] text-white'
                    }`}
                  >
                    {task.done ? 'Done' : 'Complete'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/*CHART CARD */}
          <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-lg mb-8 self-start">Study Progress</h3>
            
            {/* Circle Chart */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {/* Gray Background Circle */}
                <circle cx="96" cy="96" r="80" stroke="#F3F4F6" strokeWidth="16" fill="transparent" />
                {/* Green Progress Circle */}
                <circle 
                  cx="96" cy="96" r="80" stroke="#10B981" strokeWidth="16" fill="transparent" 
                  strokeDasharray="502" 
                  strokeDashoffset={502 - (502 * percentageCompleted) / 100} 
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <circle 
                  cx="96" cy="96" r="80" stroke="#FFA500" strokeWidth="8" fill="transparent" 
                  strokeDasharray="502" 
                  strokeDashoffset={502 - (502 * percentagePending) / 100} 
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              </div>
              <div className="absolute">
                <p className="text-4xl font-black text-gray-800">{percentageCompleted}%</p>
                <p className="text-xs text-gray-400 font-bold uppercase">Complete</p>
              </div>
            <p className="mt-8 text-gray-500 text-sm px-4">
              You have completed <b>{completedCount}</b> out of <b>{totalTasks}</b> study goals!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;