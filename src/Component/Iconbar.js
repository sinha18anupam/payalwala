
import React, { useState, useRef, useEffect } from 'react';
import './VideoFeed.css'
import { FaHome, FaHeart, FaPlayCircle, FaUser, FaShare,FaShoppingBag } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
export default function Iconbar({index, video,onAddToWishlist}) {

    const navigate = useNavigate(); 
  
    const [wishlist, setWishlist] = useState([].fill(false));



const handleAddToCart = async (item) => {
    // const userData = localStorage.getItem('userId');
    // if (!userData) {
    //     navigate('/signup'); // Corrected typo here
    //     return;
    // }

    const valu = {
        item: video.itemid,
        user: 1,
        quantity: 1
    };

    console.log('Value to be posted:', valu);

    try {
        const response = await axios.post('http://192.168.31.67:5000/api/card/post', valu);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error posting to card:', error);
    }
};
const handleRemoveItem = async (card) => {

    try {

        
        await axios.delete(`http://192.168.31.67:5000/api/card/del/1/${card}`);
     
      console.log('card removing')
    } catch (error) {
        console.log('Error removing item from card:');
    }
};

const addtowishlist = (index, video) => {

    const isWishlist = wishlist[index];
    
    if (isWishlist) {
    
      setWishlist((prevWishlist) => {
        const newWishlist = [...prevWishlist];
    
      const response=   handleRemoveItem(video.itemid)
      if(response){
        newWishlist[index] = false;
      }
       
        return newWishlist;
      
      });
    } else {
        onAddToWishlist()
      setWishlist((prevWishlist) => {
        const newWishlist = [...prevWishlist];
        newWishlist[index] = true;
        handleAddToCart(video)
        return newWishlist;
        
      });
    }
  };


  const gotooder = async (video)=>{

    try {
           
        const response = await axios.post("http://192.168.31.67:5000/api/oder/",{
            status : false,
            img   : video.itempost,
            productname: video.itemname,
            quantity : 1,
            price : video.price,
            userid: 1

        });

         console.log('Response:', response.data);
     
    } catch (error) {
        console.error('Error to post place the oder:', error);
    }
  }

  return (
    <div className='bar'>
            <FaHome />
            <FaPlayCircle onClick={()=>{navigate('/')}} />
            <div className={`${video  ? 'sharebar' : 'show'}`}>
           <FaShare className={`${video  ? '' : 'nn'}`}/>
           <FaHeart className={`${video  ? '' : 'nn'}`}
              onClick={() => addtowishlist(index, video)}
            
              style={{ color: wishlist[index] ? 'red' : '' }} // Change color based on wishlist state
            />

<FaShoppingBag className={`${video  ? '' : 'nn'}`} onClick={()=>{
    navigate('/oder')
}}/>
             <FaUser/>

           

            </div>
          
          </div>
  )
}
