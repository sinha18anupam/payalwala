import React, { useState, useEffect } from 'react';
import Iconbar from './Iconbar'
import './Wishlist.css'
import axios from 'axios';

export default function Wishlist() {
    const [WishlistData, setWishlistData] = useState([]);
  
    const fetchData = async () => {
        const userData = localStorage.getItem('userId');
        try {
           
            const response = await axios.get(`http://192.168.1.12:5000/api/wishlist/get/1`);
            console.log(response.items);
           
                setWishlistData(response.data.items);
                console.log(response.data.items.length);
            
        } catch (error) {
            console.error('Error fetching Wishlist data:', error);
        }
    };
useEffect(()=>{
    fetchData()
},[])
const handleRemoveItem = async (Wishlist) => {

    try {

        
        await axios.delete(`http://192.168.1.12:5000/api/wishlist/del/1/${Wishlist}`);
     
      console.log('Wishlist removing')
      fetchData()
    } catch (error) {
        console.log('Error removing item from Wishlist:');
    }
};

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            await axios.put(`http://192.168.1.12:5000/api/Wishlist/up/${itemId}`, { quantity: newQuantity });
           
            fetchData();
        } catch (error) {
            console.error('Error updating quantity of item in Wishlist:', error);
        }
    };

    const handlePlaceOrder = async (video)=>{

        try {
               
            const response = await axios.post("http://192.168.1.12:5000/api/oder/",{
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

      const handleAddToCart = async (item) => {
        // const userData = localStorage.getItem('userId');
        // if (!userData) {
        //     navigate('/signup'); // Corrected typo here
        //     return;
        // }
    
        const valu = {
            itemids: item,
            userids: 1,
          
        };
    
        console.log('Value to be posted:', valu);
    
        try {
            const response = await axios.post('http://192.168.1.12:5000/api/wishlist/post', valu);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error posting to card:', error);
        }
    };
   


  return (
   






    <div className='Wishlist-Mainpage'>
    <div className='wishlist-navbar'>
       {/* <div className='svg-back'>
         <Link to='/'><Left/></Link>  
           WishList
       </div> */}

   </div>
   <div className='boxxx'>
       <div className='collection'>
           My Collecction
       </div>
       <div className='collection2'>
           Collection I Follow
       </div>
   </div>
   <div className='insidewishlist'>
   <div className='wishlist-Wishlistss'>
    {WishlistData.map((item, index)=>(
        <div className='wishlist-image-Wishlist'>

        <div className='imageofWishlistd'>
            <img src={item.img}></img>
        </div>
        <div className='descriptionofproduct'>
        <p>{item.itemname}</p>
            <p>{item.dec}</p>
            <p> {item.price}</p>
            <p> <button onClick={()=>{handleAddToCart(item.itdemid)}}>Add to cart</button></p>
            </div>
             </div>




    ))}
       
 
       </div>
</div>
</div>
  )
}
