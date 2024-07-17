import * as React from 'react';
import MainLayout from "../../layout/MainLayout";
import Dashboard from '../../dashboards/Dashboard';

function Home() {

    return (
        
        <MainLayout>
            <Dashboard />
        </MainLayout>
    );
}

export default Home;