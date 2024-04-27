import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getFarmerSales, getRemainingProducts } from './api'; // Import API functions
import './Landing.css'; // Import custom CSS file for styling

const Landing = () => {
  const history = useHistory();
  const [totalSales, setTotalSales] = useState(0);
  const [remainingProducts, setRemainingProducts] = useState([]);

  useEffect(() => {
    // Fetch total sales and remaining products when the component mounts
    fetchTotalSales();
    fetchRemainingProducts();
  }, []);

  // Function to fetch total sales
  const fetchTotalSales = async () => {
    try {
      const sales = await getFarmerSales(); // Call API function to get total sales
      setTotalSales(sales);
    } catch (error) {
      console.error('Error fetching total sales:', error);
    }
  };

  // Function to fetch remaining products
  const fetchRemainingProducts = async () => {
    try {
      const products = await getRemainingProducts(); // Call API function to get remaining products
      setRemainingProducts(products);
    } catch (error) {
      console.error('Error fetching remaining products:', error);
    }
  };

  // Function to navigate to the dashboard
  const goToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Your Farmer Dashboard</h1>
      <div className="sales-info">
        <h2 className="sales-heading">Total Sales: ${totalSales}</h2>
      </div>
      <div className="product-info">
        <h2 className="product-heading">Remaining Products:</h2>
        <ul className="product-list">
          {remainingProducts.map(product => (
            <li key={product.id} className="product-item">
              <span className="product-name">{product.name}:</span> <span className="product-quantity">{product.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className="dashboard-button" onClick={goToDashboard}>Go to Dashboard</button>
    </div>
  );
};

export default Landing;
