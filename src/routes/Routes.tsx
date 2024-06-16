import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Login from '../components/Login';
import PrivateRoute from './PrivateRoute';
import SidebarMenu from '../components/SidebarMenu';
import Dashboard from '../components/Dashboard';
import UserList from '../components/users/UserList';
import ClientList from '../components/clients/ClientList';
import ClientRegister from '../components/clients/ClientRegister';
import SavingAccountList from '../components/savingAccounts/SavingAccountList';
import SavingAccountRegister from '../components/savingAccounts/SavingAccountRegister';
import TransactionList from '../components/transactions/TransactionList';
import TransactionRegister from '../components/transactions/TransactionRegister';
import UserRegister from '../components/users/UserRegister';

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={
                    <div className="d-flex flex-row">
                        <div className="col-3">
                            <SidebarMenu />
                        </div>
                        <div className="col-9 p-5 container-data">
                            <Outlet />
                        </div>
                    </div>
                }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<UserList />} />
                    <Route path="users/register" element={<UserRegister />} /> 
                    <Route path="users/register/:id" element={<UserRegister />} /> 
                    <Route path="clients" element={<ClientList />} />
                    <Route path="clients/register" element={<ClientRegister />} /> 
                    <Route path="clients/register/:id" element={<ClientRegister />} /> 
                    <Route path="saving-accounts" element={<SavingAccountList />} />
                    <Route path="saving-accounts/register" element={<SavingAccountRegister />} /> 
                    <Route path="saving-accounts/register/:id" element={<SavingAccountRegister />} /> 
                    <Route path="transactions" element={<TransactionList />} />
                    <Route path="transactions/register" element={<TransactionRegister />} /> 
                    <Route path="transactions/register/:id" element={<TransactionRegister />} /> 
                </Route>
            </Route>
        </Routes>
    </Router>
);

export default AppRoutes;
