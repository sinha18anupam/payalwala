import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import VideoFeed from './Component/VideoFeed';
import AboutCom from './Component/AboutCom';
import Card from './Component/Card';
import { useState,useEffect } from 'react';
import axios from 'axios'
import './App.css'
import Odercard from './Component/Odercard';
const App = () => {

  const [items, setItems] = useState([]);
 

  useEffect(() => {
    fetchData();
  }, []);


  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.31.67:5000/api/item/get');
      console.log(response.data.items)

      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div className='mainvideo'>
 <Router>
       
           <Routes>
             <Route path="/" element={<VideoFeed
videos={items}
/>} />
<Route path="/aboute" element={<AboutCom />} />
<Route path="/card" element={<Card />} />
<Route path="/oder" element={<Odercard/>} />
          
            
           </Routes>
         </Router>
    

</div>

  
  );
};

export default App;
