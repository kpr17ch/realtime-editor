import React from 'react';
import DocumentList from '../components/DocumentList';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <DocumentList />
    </div>
  );
};

export default HomePage;
