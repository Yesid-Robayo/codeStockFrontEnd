import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { NavTab } from './components/navTab/NavTab';
import { LoginPage } from './pages/login/LoginPage';

function App() {
  const isAutenticaded = useSelector((state: any) => state.auth.isAutenticated);;
  return (
    <Router>
      <NavTab />
      <Routes  >

        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </Router>
  );
}

export default App;
