import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Hero from './Hero';
import cab from '../images/cauli.jpg';
import hen from '../images/hen.jpg'

function BuyerLandingPage({ isAuthActive, OnSignInState }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [selectedAerodrome, setSelectedAerodrome] = useState(null);
  const [manuals, setManuals] = useState([]);
  const [language, setLanguage] = useState('english'); // Track selected language

  // Check if access token exists in browser storage
  const access_token_stored = localStorage.getItem('access_token');
  const location = useLocation(); // Access location object
  const signInStateValue = location.state?.signInState;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch manuals from the API
    const fetchManuals = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/files/');
        const data = await response.json();
        setManuals(data);
      } catch (error) {
        console.error('Error fetching manuals:', error);
      }
    };

    fetchManuals();
  }, []);

  const handleViewClick = (aerodrome) => {
    // Navigate to the dashboard with the selected aerodrome
    if (access_token_stored) {
      setSelectedAerodrome(aerodrome);
      navigate('/dashboard', { state: { selectedAerodrome: aerodrome } });
    } else {
      toast.error('Please login to view data.');
    }
  };

  const handleDownloadClick = (manual) => {
    // Check if authenticated, otherwise show toast
    if (!access_token_stored) {
      toast.error('Please login to download manuals.');
    } else {
      // Trigger download link
      const downloadLink = document.createElement('a');
      downloadLink.href = manual.file; // Assuming manual.file contains the download link
      downloadLink.download = manual.title; // Set the filename for the downloaded file
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'nepali' : 'english');
  };

  return (
    <div className={`landing-page ${isAuthActive ? 'auth-active' : ''}`}>
      <section className="hero-section">
        {/* <div className="hero-content">
          <h2>Welcome to MyFarm</h2>
          <p>Connecting Farmers and Buyers for Fresh Produce</p>
          <button>Get Started</button>
        </div> */}
        <Hero />
      </section>
      <section className="aerodrome-selection">
        <div className="container">
          <h2>{language === 'english' ? 'Product Available' : 'उपलब्ध उत्पाद'}</h2>
          <div className="options">
            <div className="card">
              <div className="thumbnail">
                <img src={cab} alt="Airport" />
              </div>
              <div className="description">
                <h3>{language === 'english' ? 'Vegetable' : 'सब्जी'}</h3>
              </div>
              <div className="buttons">
                <button className="link-button" onClick={() => handleViewClick('Mumbai')}>
                  <i className="fa fa-eye"></i> {language === 'english' ? 'View' : 'हेर्नुहोस्'}
                </button>
              </div>
            </div>
            <div className="card">
              <div className="thumbnail">
                <img src={hen} alt="Airport" />
              </div>
              <div className="description">
                <h3>{language === 'english' ? 'Dairy Item' : 'डेयरी आइटम'}</h3>
              </div>
              <div className="buttons">
                <button className="link-button" onClick={() => handleViewClick('New Delhi')}>
                  <i className="fa fa-eye"></i> {language === 'english' ? 'View' : 'हेर्नुहोस्'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='card-manual-section'>
        <h2>{language === 'english' ? 'Manuals' : 'म्यानुअलहरू'}</h2>
        <div className="card-manual-div">
          {manuals.map((manual, index) => (
            <div className="card-manual" key={index}>
              <h3>{manual.title}</h3>
              <button title='download' onClick={() => handleDownloadClick(manual)}>
                <i className="fa fa-download"></i>
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="etod-info">
        <div className="container">
          <div className='description'>
            <h2>{language === 'english' ? 'What is My Farm?' : 'मेरो खेत के हो?'}</h2>
            <p className="answer">
              {language === 'english'
                ? 'My Farm is an ecommerce Platform where farmers can sell their product at a better price and Buyers can buy fresh vegetables.'
                : 'मेरो खेत एक ईकोमर्स प्लेटफार्म हो जहाँ किसानहरूले उत्पादनलाई राम्रो मुल्यमा बेच्न सक्छन् र खरिददारहरूले ताजा सब्जीहरू खरिद गर्न सक्छन्।'}
            </p>
          </div>
          <div className="youtube-video">
            {/* Replace the URL with the embed URL of your YouTube video */}
            <iframe src="https://www.youtube.com/embed/GOR33RFA4xY?si=x8dqWcvGhrkSVM7w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
      </section>
      <button onClick={toggleLanguage}>{language === 'english' ? 'Change to Nepali' : 'अंग्रेजीमा परिवर्तन गर्नुहोस्'}</button>
    </div>
  );
}

export default BuyerLandingPage;