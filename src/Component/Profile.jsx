import React, { useState } from 'react'
import './Profile.css'
// import {Package} from '../Assetss/package.svg'
import { ReactComponent as Package } from './Assetss/package.svg';
import { ReactComponent as Heart } from './Assetss/whistlist.svg';
import { ReactComponent as Coupons } from './Assetss/xoupon.svg';
import { ReactComponent as Help } from './Assetss/help.svg';
import { ReactComponent as Edit } from './Assetss/edit.svg';
import { ReactComponent as Address } from './Assetss/address-svgrepo-com.svg';
import { ReactComponent as Password } from './Assetss/changepass.svg';
import { ReactComponent as Language } from './Assetss/lang.svg';
import { ReactComponent as Right } from './Assetss/righticon.svg';
import { ReactComponent as Left } from './Assetss/left.svg';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
// import { Password } from '@mui/icons-material';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
      const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        address: '',
        landmark: '',
        city: '',
        state: '',
        pin: '',
      });
      const [addresses, setAddresses] = useState([]);
      const navigate = useNavigate(); 
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleSaveAddress = () => {
        const { address, landmark, city, state, pin } = formData;
        if (!address.trim()) {
          // Check if the address field is empty or only contains whitespace
          setError('Address cannot be empty');
          return;
        }
      
        const newAddress = `${address}, ${landmark}, ${city}, ${state} ${pin}`;
        setAddresses([...addresses, newAddress]);
        setFormData({
          address: '',
          landmark: '',
          city: '',
          state: '',
          pin: '',
        });
        setError('');
      };
      
    
      const handleRemoveAddress = (index) => {
        const updatedAddresses = addresses.filter((_, idx) => idx !== index);
        setAddresses(updatedAddresses);
      };
    
    const handleEditProfile = () => {
      setIsModalOpen(true);
    };
    const handleAddress = () => {
        setIsModalOpen3(true);
      };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setIsModalOpen2(false);
      setIsModalOpen3(false);
    
    };  
    const handlechangepassword = () => {
        setIsModalOpen2(true);
      };
    
     
  return (
    <div className='mainnpage'>
        <div className='profile-navbar'>
           <div className='svg-back'>
        
            <Left onClick={()=>{
                navigate('/')
            }}/>    Profile
           </div>
          
        </div>
        <div className='greeting-section'>
            <h3>Hey! there User</h3>
        </div>
        <div className='action-box'>
      
                <Link to="/order"><div className='box1'><Package/>Order </div></Link>
         <Link to='/Wishlist'>   <div className='box1'><Heart/>Whistlist</div></Link>
         <Link to='/cart'>      <div className='box1'><Coupons/> Cart</div> </Link>
            <div className='box1'><Help/>Help</div>
        </div>
        <div className='boundry'>
            <hr/>
        </div>
        <div className='account-section'>
          <div className="account-head"> <h2>Account Section</h2></div> 
            <div className='menu'><div className='menu-sub' onClick={handleEditProfile}> <Edit/> Edit Profile </div> <Right/></div>
            <div className='menu'><div className='menu-sub' onClick={handleAddress}><Address/>Saved Address </div> <Right/></div>
            <div className='menu'><div className='menu-sub' ><Language/>Select Language </div> <Right/></div>
            <div className='menu'><div className='menu-sub' onClick={handlechangepassword}><Password/>Change Password </div> <Right/></div>

        </div>
        <div className='boundry'>
            <hr/>
        </div>
        <div className='Logout'>
          <h1><button className='logout'> Log Out</button></h1>
        </div>
        {isModalOpen2  && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseModal}>&times;</span>
            <h2>Edit Profile</h2>
            <form>
              <label>Email:</label>
              <input type='text' />
              <label>Old Password</label>
              <input type='password' />
              <label>New Password:</label>
              <input type='Password' />
              <button type='submit'>Save</button>
            </form>
          </div>
        </div>
      )}

{isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseModal}>&times;</span>
            <h2>Change Password</h2>
            <form>
              <label>Name:</label>
              <input type='text' />
              <label>Address:</label>
              <input type='text' />
              <label>Phone Number:</label>
              <input type='text' />
              <button type='submit'>Save</button>
            </form>
          </div>
        </div>
      )}
      {isModalOpen3 && (
           <div className='modal'>
           <div className='modal-content'>
             <span className='close' onClick={handleCloseModal}>&times;</span>
             <h2>Edit Profile</h2>
          
             <form>
               <label>Address:</label>
               <input type='text' name='address' value={formData.address} onChange={handleInputChange} />
               <label>Landmark:</label>
               <input type='text' name='landmark' value={formData.landmark} onChange={handleInputChange} />
               <label>City:</label>
               <input type='text' name='city' value={formData.city} onChange={handleInputChange} />
               <label>State:</label>
               <input type='text' name='state' value={formData.state} onChange={handleInputChange} />
               <label>PIN:</label>
               <input type='number' name='pin' value={formData.pin} onChange={handleInputChange} />
               <button type='button' onClick={handleSaveAddress}>Save Address</button>
             </form>
             {addresses.length > 0 && (
               <div>
                 <p>Saved Addresses:</p>
                 {addresses.map((addr, index) => (
                   <div key={index}>
                     <p>{addr}</p>
                     <button onClick={() => handleRemoveAddress(index)}>Remove Address</button>
                   </div>
                 ))}
               </div>
             )}
           </div>
         </div>
      )}
        </div>
  )
}

export default Profile