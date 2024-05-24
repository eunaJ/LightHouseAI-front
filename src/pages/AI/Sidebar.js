import React from 'react';
import './Sidebar.css';

const Sidebar = ({ width, children }) => {
    return (
        <div className="sidebar" style={{ width }}>
            {children}
        </div>
    );
};

export default Sidebar;
