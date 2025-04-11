import React from 'react';
import './dheader.css';
import DrawerMobileNavigation from '../DrawerMobileNavigation/DrawerMobileNavigation';

const DHeader = () => {
  return (<>
    <header className="dashboard-header">
      <div className="header-left">
        {/* Place your top-left component here */}
        <DrawerMobileNavigation/>
      </div>
      <h1 className="header-title">Welcome to Product Dashboard</h1>
    </header>

    </>
  );
};

export default DHeader;
