import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { NavTab } from './components/navTab/NavTab';
import { LoginPage } from './pages/login/LoginPage';
import { AdminPage } from './pages/admin/AdminPage';
import { userData } from './utils/utilsDTOS';
import { ProductPage } from './pages/products/ProductsPage';
import { CompanyPage } from './pages/admin/CompanyPage';
import { CompanyUserPage } from './pages/company/CompanyUserPage';
import { CompanyForProducts } from './pages/companyForProduct/CompanyForProducts';
import { OrdersPage } from './pages/ordersPage.tsx/OrdersPage';
import { ProfilePage } from './pages/profile/ProfilePage';

/**
 * The main component of the application.
 * Renders the navigation tabs and routes based on the current URL.
 *
 * @returns The rendered JSX elements.
 */
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
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/companys" element={<CompanyUserPage />} />
        <Route path="/companyProduct/:id" element={<CompanyForProducts />} />
        <Route path="/profile" element={isAutenticaded ? <ProfilePage /> : <LoginPage />} />
        <Route path='/orders' element={isAutenticaded ? <OrdersPage /> : <LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
