import React, { useState, useEffect } from 'react';
import { ReactComponent as Left } from './Component/Assetss/left.svg';

import './Card.css'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

export default function Card() {
    const [cardData, setCardData] = useState([]);
    const navigate = useNavigate()
  
    const fetchData = async () => {
        const userData = localStorage.getItem('userId');
        try {
           
            const response = await axios.get(`http://192.168.1.12:5000/api/card/get/1`);
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

        
        await axios.delete(`http://192.168.1.12:5000/api/card/del/1/${card}`);
     
      console.log('card removing')
      fetchData()
    } catch (error) {
        console.log('Error removing item from card:');
    }
};

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            await axios.put(`http://192.168.1.12:5000/api/card/up/${itemId}`, { quantity: newQuantity });
           
            fetchData();
        } catch (error) {
            console.error('Error updating quantity of item in card:', error);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const promises = cardData.map(async (item) => {
                const response = await axios.post("http://192.168.1.12:5000/api/oder/", {
                    status: false,
                    img: item.img,
                    productname: item.itemname,
                    quantity: 1,
                    price: item.price,
                    userid: 1
                });
                console.log('Response:', response.data);
            });
    
            await Promise.all(promises); // Wait for all requests to complete
            console.log('All orders placed successfully.');
            fetchData(); // Update card data after placing orders
        } catch (error) {
            console.error('Error placing orders:', error);
        }
    };
    
  return (
    <div className='video-feed'>

<div className='video-container active'>


<div className='video'>

<div className='profile-navbar'>
           <div className='svg-back'>
        
            <Left onClick={()=>{
                navigate('/profile')
            }}/>    Shoping Cart
           </div>
          
        </div>
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
                                <td><img src={item.img} alt={item.productname} /></td>
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
                <button onClick={()=>{
                    handlePlaceOrder()
                }}>Place Order</button>
          </div>

    </div>
</div>
















</div>

</div>
  )
}
