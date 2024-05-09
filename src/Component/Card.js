import React, { useState, useEffect } from 'react';
import Iconbar from './Iconbar'
import './Card.css'
import axios from 'axios';

export default function Card() {
    const [cardData, setCardData] = useState([]);
  
    const fetchData = async () => {
        const userData = localStorage.getItem('userId');
        try {
           
            const response = await axios.get(`http://192.168.31.67:5000/api/card/get/1`);
            console.log(response.data);
           
                setCardData(response.data.items);
                console.log(response.data.items.length);
            
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };
useEffect(()=>{
    fetchData()
},[])
const handleRemoveItem = async (card) => {

    try {

        
        await axios.delete(`http://192.168.31.67:5000/api/card/del/1/${card}`);
     
      console.log('card removing')
      fetchData()
    } catch (error) {
        console.log('Error removing item from card:');
    }
};

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            await axios.put(`http://localhost:5000/api/card/up/${itemId}`, { quantity: newQuantity });
           
            fetchData();
        } catch (error) {
            console.error('Error updating quantity of item in card:', error);
        }
    };

    const handlePlaceOrder = async (video)=>{

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
    <div className='video-feed'>

<div className='video-container active'>


<div className='video'>

    <div className='cardcontent'>
    <div className="card-table-container">
                <table className="card-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(cardData) && cardData.map((item) => (
                            <tr key={item.itemid}>
                                <td><img src={item.itempost} alt={item.productname} /></td>
                                <td>{item.itemname}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button onClick={() => handleQuantityChange(item.idcard, item.quantity - 1)}>-</button>
                                    {item.quantity}
                                    <button onClick={() => handleQuantityChange(item.idcard, item.quantity + 1)}>+</button>
                                </td>
                                <td>
                                    <button onClick={() => handleRemoveItem(item.itemid)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handlePlaceOrder}>Place Order</button>
          </div>

    </div>
</div>










   <Iconbar video={false}/>







</div>

</div>
  )
}
