import './App.css'
import React, { useState } from 'react';
import Router from './Router'; // Make sure to import Router
import UserContext from './UserContext';

function App() {
  const [userName, setUserName] = useState('');
  const [inventory, setInventory] = useState([])
  return (
    <UserContext.Provider value={{ userName, setUserName, inventory, setInventory }}>
      <Router /> {/* Router is now inside UserContext.Provider */}
    </UserContext.Provider>
  )
}

export default App;
