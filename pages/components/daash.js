import React, { useState } from 'react';

const VerticalTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const Tab1 = () => {
    return <>
        <h2>this is tab1</h2>
    </>;
  };
  
  const Tab2 = () => {
    return <>
        <h2>this is tab2</h2>
    </>;
  };
  
  const Tab3 = () => {
    return <>
        <h2>this is tab3</h2>
    </>;
  };
  const Tab4 = () => {
    return <>
        <h2>this is tab4</h2>
   
    </>;
  };
  const Tab5 = () => {
    return <>
        <h2>this is tab5</h2>
    </>;
  };

  return (
    <>
    <div className="container">
        <div className="main-tab-div">
            <div className="row g-4">
                <div className="col-lg-2">
                    <div className="tabs-butns">
                        <div className={`vertical-tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
                            <button className="main-btn" type="button">Dashboard</button>
                        </div>
                        <div className={`vertical-tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
                            <button className="main-btn" type="button">Notification</button>
                        </div>
                        <div className={`vertical-tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
                            <button className="main-btn" type="button">Other Tools</button>
                        </div>
                        <div className={`vertical-tab ${activeTab === 4 ? 'active' : ''}`} onClick={() => handleTabClick(4)}>
                            <button className="main-btn" type="button">Profile</button>
                        </div>
                        <div className={`vertical-tab ${activeTab === 5 ? 'active' : ''}`} onClick={() => handleTabClick(5)}>
                            <button className="main-btn" type="button">Learn</button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-10">
                    {activeTab === 1 && <Tab1 />}
                    {activeTab === 2 && <Tab2 />}
                    {activeTab === 3 && <Tab3 />}
                    {activeTab === 4 && <Tab4 />}
                    {activeTab === 5 && <Tab5 />}
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default VerticalTabs;
