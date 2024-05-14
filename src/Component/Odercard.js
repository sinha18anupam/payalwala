import React, { useState,useEffect} from 'react'
import './Oder.css'

import { ReactComponent as Right } from './Assetss/righticon.svg';
import { ReactComponent as Deliver } from './Assetss/delivered.svg';
import { ReactComponent as Packagee } from './Assetss/package.svg';

import { ReactComponent as Left } from './Assetss/left.svg';
import { ReactComponent as Filter } from './Assetss/filter.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Odercard = () => {
    const [isAnimationOpen, setIsAnimationOpen] = useState(false);

    const [oder,setoder]=useState([])

    const handleIconClick = () => {
      setIsAnimationOpen(!isAnimationOpen);
    };

    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.12:5000/api/oder/get/1');
        console.log('ODer' ,response.data.orders)
  
        setoder(response.data.orders);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };


    useEffect(()=>{
      fetchData()
    },[])

  
  return (
    <div className='OdercardMainpage'>
    <div className='Order-navbar'>
      <div className='svg-back'>
        <Link to='/Profile'><Left/></Link>  
        Odercard
      </div>
    </div>
    <div className='searchbox-main'>
      <div className='searchboxx'>
        <input name="myInput" placeholder='Search your Order here'/>
      </div>
      <div className='filter'>
        <div className='filtericon'>
          <Filter/> Filter
        </div>
      </div>
    </div>
    <div className='plain'>
      <hr/>
    </div> 
    <div className='orderitem'>
      {oder.map((item, index) => (
        <div key={index} className='ordered-item-card'>
          <div className='img2'>
            <img src={item.img} alt='Product' />
            <p>25</p>
            <p>{item.productname}</p>  
            <p>{item.quantity}</p>
            <p>Rate this page</p>
            </div>
            
          
          
          <div className='rightsvg' onClick={handleIconClick}>
            <Right className={isAnimationOpen ? 'rotate-right' : ''} />
          </div>
          {isAnimationOpen && (
            <div className='extra-area'>
              <div className='box-animation'>
                <Packagee/>
                <Deliver/>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
}
export default Odercard