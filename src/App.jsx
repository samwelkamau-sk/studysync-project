import { BrowserRouter as Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard";
// 1. IMPORT the actual UI components Member 1 wants to show
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import { useEffect } from "react";
import { getTasks } from "./api";
import Welcome from "./Pages/Welcome";
// 2. ONLY keep the UI-only layout components here (Dashboard, etc.)
// REMOVE the ones like "const AddTask = ..." because they block the real files.

// const Dashboard = () => <h1 className="text-3xl">Dashboard</h1>;
const Calendar = () => <h1 className="text-3xl">Calendar</h1>;
const Subjects = () => <h1 className="text-3xl">Subjects</h1>;
const Statistics = () => <h1 className="text-3xl">Statistics</h1>;
const Profile = () => <h1 className="text-3xl">Profile</h1>;

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(data => setTasks(data));
  }, []);

  const [userName, setUserName] = useState(localStorage.getItem('studySyncUser') || "");

  // Update localStorage whenever userName changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem('studySyncUser', userName);
    }
  }, [userName]);



  return (
    <BrowserRouter>
      <div className="flex">
        {/* Sidebar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="flex-1 p-10 flex flex-col min-h-screen">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Welcome setUserName={setUserName} />} />
                        <Route 
              path="/dashboard" 
              element={userName ? <Dashboard userName={userName} /> : <Navigate to="/welcome" />}/>

            {/* 3. FIX: Link the route to the REAL ToDoList UI */}
            <Route path="/tasks" element={<ToDoList tasks={tasks}/>} />

            {/* 4. FIX: Link the route to the REAL ToDoForm UI */}
            <Route path="/add-task" element={<ToDoForm tasks={tasks} />} />

            <Route path="/calendar" element={<Calendar />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          {/* Footer at the bottom */}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;