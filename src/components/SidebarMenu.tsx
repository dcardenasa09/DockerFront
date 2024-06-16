import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SidebarMenu: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="bg-dark col-auto col-md-3 min-vh-100 d-flex justify-content-between flex-column w-100">
                    <div>
                        <a className="text-decoration-none text-white d-flex justify-content-center align-items-center mb-3 mt-3">
                            <span className="fs-3 d-none d-sm-inline">Administrador</span>
                        </a>
                        <hr className="text-secondary"/>
                        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
                            <li className="nav-item text-white text-start fs-5 my-1 py-2 py-sm-0">
                                <a href="/users" className="nav-link text-white" aria-current="page">
                                    <i className="bi bi-fingerprint"></i>
                                    <span className="ms-3 fs-5 d-none d-sm-inline">Usuarios</span>
                                </a>
                            </li>
                            <hr className="text-secondary my-1"/>
                            <li className="nav-item text-white text-start fs-5 my-1 py-2 py-sm-0">
                                <a href="/clients" className="nav-link text-white" aria-current="page">
                                    <i className="fs-5 bi bi-people-fill"></i>
                                    <span className="ms-3 fs-5 d-none d-sm-inline">Clientes</span>
                                </a>
                            </li>
                            <hr className="text-secondary my-1"/>
                            <li className="nav-item text-white text-start fs-5 my-1 py-2 py-sm-0">
                                <a href="/saving-accounts" className="nav-link text-white" aria-current="page">
                                    <i className="bi bi-piggy-bank"></i>
                                    <span className="ms-3 fs-5 d-none d-sm-inline">Cuentas de ahorro</span>
                                </a>
                            </li>
                            <hr className="text-secondary my-1"/>
                            <li className="nav-item text-white text-start fs-5 my-1 py-2 py-sm-0">
                                <a href="/transactions" className="nav-link text-white" aria-current="page">
                                    <i className="bi bi-cash-stack"></i>
                                    <span className="ms-3 fs-5 d-none d-sm-inline">Transacciones</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='text-center col-12 p-3'>
                        <div className="d-grid gap-2">
                            <Button variant="secondary" size="lg" onClick={handleLogout}>
                                <i className="bi bi-door-closed"></i>
                                <span className='ms-3'>Cerrar sesión</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarMenu;
