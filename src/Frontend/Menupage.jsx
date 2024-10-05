import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import OrderDetailsPage from './OrderDetails'; // Ensure this is the correct import
import CartDisplay from './CartDisplay';
import OrderHistory from './OrderHistory';
import './Menu.css';

function Menupage() {
  const [displayData, setDisplayData] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://api.jsonbin.io/v3/b/66faa41facd3cb34a88ed968");
        console.log("Fetched data:", response.data.record); 
        if (response.data && response.data.record) {
          setDisplayData(response.data.record);
        } else {
          console.error("Invalid data format", response.data);
        }
      } catch (error) {
        console.log("Error fetching data", error);
        alert("There was a problem fetching the data. Please try again later."); // User feedback
      }
    }
    fetchData();
  }, []);
  

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleCart = (item) => {
    if (item.available_quantity > 0) {
      setCart((prev) => [...prev, { ...item }]);
      setDisplayData((prevData) => 
        prevData.map((dataItem) => 
          dataItem.name === item.name 
            ? { ...dataItem, available_quantity: dataItem.available_quantity - 1 }
            : dataItem
        )
      );
    } else {
      alert("We are not taking any order as the stock is not available");
    }
  };

  const handleOrderPlacement = (orderDetails) => {
    const newOrder = {
      tableNumber: orderDetails.tableNumber,
      contactNumber: orderDetails.contactNumber,
      date: orderDetails.date,
      time: orderDetails.time,
      cart: [...cart],
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]); // Update orders state
    setOrderPlaced(false);
    setCart([]);
  };

  return (
    <Router>
      <div className="menu-container">
        <h1>Menu</h1>
        {/* OrderDetails component may need to be handled differently */}
        <div className="menu-items-grid">
          {displayData.length > 0 ? (
            displayData.map((item, id) => (
              <div key={id} className="menu-item">
                <h1>Name: {item.name}</h1>
                <h3>Category: {item.category}</h3>
                <h4>Price: ${item.price.toFixed(2)}</h4>
                <h4>Quantity: {item.available_quantity}</h4>
                <img src={item.image_url} alt={`${item.name} image`} />
                <button onClick={() => handleCart(item)} disabled={item.available_quantity === 0}>
                  {item.available_quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            ))
          ) : (
            <p>Loading items...</p> // Placeholder while loading
          )}
        </div>

        <Link to="/cart" className="cart-link">🛒 View Cart</Link>
        <Link to="/order-history" className="order-history-link">
          <button>View Order History</button>
        </Link>

        <Routes>
          <Route path="/cart" element={<CartDisplay cart={cart} orderPlaced={orderPlaced} />} />
          <Route path="/order-history" element={<OrderHistory orders={orders} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Menupage;
