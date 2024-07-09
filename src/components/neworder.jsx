import React from 'react';
import './CustomListView.css';

const CustomListView = ({ name, email, role, lastLogin, status, avatar }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Reported':
        return 'reported';
      case 'Loaded':
        return 'loaded';
      case 'In Process':
        return 'in-process';
      default:
        return '';
    }
  };

  return (
    <div className="list-item">
      <div className="list-item-media">
        <img
          src={avatar}
          alt="Avatar"
          className="avatar"
        />
      </div>
      <div className="list-item-inner">
        <div className="list-item-title-row">
          <div className="list-item-title">
            {name} 
          </div>
          <div className={`list-item-status ${getStatusClass(status)}`}>
            {status}
          </div>
        </div>
        <div className="list-item-subtitle">{email}</div>
        <div className="list-item-footer">
          <div className="list-item-role">{role}</div>
          <div className="list-item-last-login">{lastLogin}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomListView;
