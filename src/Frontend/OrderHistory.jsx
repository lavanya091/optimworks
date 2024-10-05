import React from 'react';
import { Link } from 'react-router-dom';
import './OrderHistory.css';

function OrderHistory({ orders }) {
  return (
    <div className="order-history">
      <h3>Order History</h3>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="order-item">
            <h4>Order {index + 1}</h4>
            <p>Table Number: {order.tableNumber}</p>
            <p>Contact Number: {order.contactNumber}</p>
            <p>Date: {order.date}</p>
            <p>Time: {order.time}</p>
            <h5>Items:</h5>
            <ul>
              {order.cart.map((item, itemIndex) => (
                <li key={itemIndex}>{item.name} - ${item.price}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default OrderHistory;
