import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import VideoFeed from './Component/VideoFeed';
import AboutCom from './Component/AboutCom';
import Wishlist from './Component/Wishlist';
import Profile from './Component/Profile';

import { useState,useEffect } from 'react';
import axios from 'axios'
import './App.css'
import Odercard from './Component/Odercard';
import Card from './Card';
const App = () => {

  const [items, setItems] = useState([]);
 

  useEffect(() => {
    fetchData();
  }, []);


  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.12:5000/api/item/get');
      console.log(response.data.items)

      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    
    
 <Router>

  <div className='mainvideo'>
          <Routes>
    
        

<Route path="/" element={<VideoFeed   
videos={items}
/>} />
</Routes>
</div>


<Routes>
<Route path="/aboute" element={<AboutCom />} />
<Route path="/Wishlist" element={<Wishlist/>} />
<Route path="/profile" element={<Profile/>} />
<Route path="/order" element={<Odercard/>} />
<Route path="/cart" element={<Card/>} />
          
            
           </Routes>
         
    



</Router>
  );
};

export default App;
