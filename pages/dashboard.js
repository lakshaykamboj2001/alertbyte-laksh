import React, { useState } from 'react';
import Header from './components/header'
import DashBoard from './components/daash'

const Dashboard = () => {
 return(
    <>
    <main className="main-dashboard">
     <Header />
     <DashBoard/>
    </main>
     
    </>
 )
}
export default Dashboard;  

