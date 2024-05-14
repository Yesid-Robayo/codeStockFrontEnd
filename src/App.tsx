import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { NavTab } from './components/navTab/NavTab';
import { LoginPage } from './pages/login/LoginPage';
import { AdminPage } from './pages/admin/AdminPage';
import { userData } from './utils/utilsDTOS';
import { CompanyPage } from './pages/company/CompanyPage';

function App() {
  const isAutenticaded = useSelector((state: any) => state.auth.isAuthenticated);
  const user: userData = useSelector((state: any) => state.auth.user);


  return (
    <Router>
      <NavTab />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={isAutenticaded ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/admin" element={isAutenticaded && user && user.idRole === 1 ? <AdminPage /> : <Navigate to="/home" />} />
        <Route path="/company/:id" element={isAutenticaded && user && user.idRole === 1 ? <CompanyPage /> : <Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
