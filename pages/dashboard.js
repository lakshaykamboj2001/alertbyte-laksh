import React, { useState } from 'react';
import LHeader from './components/logo-header'
import DashBoard from './components/daash'

const Dashboard = ({ account, setAccount, networks }) => {
 return(
    <>
    <main className="main-dashboard">
     <LHeader />
     <DashBoard networks={networks}  />
    </main>
     
    </>
 )
}
export default Dashboard;  

