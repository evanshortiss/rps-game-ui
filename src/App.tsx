import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Homepage';
import InstructionsPage from "./Instructions";
import Capture from "./Capture";
import Results from "./Results";

function App() {
  return (
    <Router>
      <h1>Rock, Paper, Scissors!</h1>
      <Routes>
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/results" element={<Results />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
