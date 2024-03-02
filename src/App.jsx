import './App.css'
import React, { useState } from 'react';
import Router from './Router'; // Make sure to import Router
import UserContext from './UserContext';

function App() {
  const [userName, setUserName] = useState('');
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] =  useState(null)
  return (
    <UserContext.Provider value={{ userName, setUserName, inventory, setInventory, loading, setLoading, error, setError }}>
      <Router /> {/* Router is now inside UserContext.Provider */}
    </UserContext.Provider>
  )
}

export default App;
