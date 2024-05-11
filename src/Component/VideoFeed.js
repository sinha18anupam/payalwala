import React, { useState, useRef, useEffect } from 'react';
import { FaHome, FaHeart, FaPlayCircle, FaUser, FaShare, FaShoppingCart } from 'react-icons/fa'; // Import required icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import './VideoFeed.css';
import Iconbar from './Iconbar';

const VideoFeed = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(Array(videos.length).fill(true));
  const [wishlistPopupVisible, setWishlistPopupVisible] = useState(false);
  const navigate = useNavigate(); 
  const containerRef = useRef(null);
  let touchStartY = useRef(null);
  let scrollTimeout = useRef(null);

  useEffect(() => {
  
    document.dispatchEvent(new MouseEvent('click'));
  }, []);

  const handleScroll = (event) => {
    const { deltaY } = event;
    clearTimeout(scrollTimeout.current); // Clear any previous timeout
    scrollTimeout.current = setTimeout(() => {
      if (deltaY > 0 && currentIndex < videos.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    }, 100); // Adjust the delay time as needed
  };

  const handleTouchStart = (event) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (!touchStartY.current) return;

    const touchMoveY = event.touches[0].clientY;
    const deltaY = touchMoveY - touchStartY.current;

    if (Math.abs(deltaY) > 10) { // Adjust the threshold as needed
      if (deltaY < 0 && currentIndex < videos.length - 1) { // Change the condition here
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (deltaY > 0 && currentIndex > 0) { // Change the condition here
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
      touchStartY.current = null;
    }
  };

  const handleTap = () => {
    const video = containerRef.current.children[currentIndex].querySelector('video');

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleVideoLoadedData = (index) => {
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const handleAddToWishlist = () => {
    setWishlistPopupVisible(true); 
    setTimeout(() => {
      setWishlistPopupVisible(false); 
    }, 3000); 
   
  };

  const handleNavigateToCardPage = () => {
    navigate('/wishlist'); // Navigate to the card page
  };

  return (
    <div
      className="video-feed"
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    
      ref={containerRef}
    >
      
      {wishlistPopupVisible && (
        <div className="wishlist-popup">
          Item added to wishlist
        </div>
      )}
      {videos.map((video, index) => (
        <div key={index} className={`video-container ${index === currentIndex ? 'active' : ''}`}>
          {/* {loading[index] && <div className="loading-animation"></div>}  */}
          
            <FaShoppingCart className="card" onClick={handleNavigateToCardPage} />
      
          <video
            className={`video`} // Hide video element if still loading
            src={video.itempost}
            autoPlay
            onClick={handleTap}
            loop
            playsInline
            muted={index !== currentIndex}
            // onLoadedData={() => handleVideoLoadedData(index)} // Call when video data has loaded
          />
          <Iconbar video={video} index={index} onAddToWishlist={handleAddToWishlist} />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
