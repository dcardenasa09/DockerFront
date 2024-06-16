import React from 'react';
import SidebarMenu from './SidebarMenu';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => (
    <div className="d-flex flex-row">
        <div className="col-2">
            <SidebarMenu />
        </div>
        <div className="col-10 p-5 container-data">
            <Outlet />
        </div>
    </div>
);

export default MainLayout;
