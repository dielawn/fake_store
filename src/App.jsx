import './App.css'
import React, { useState } from 'react';
import Router from './Router'; // Make sure to import Router
import UserContext from './UserContext';

function App() {
  const [userName, setUserName] = useState('');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      <Router /> {/* Router is now inside UserContext.Provider */}
    </UserContext.Provider>
  );
}

export default App;
