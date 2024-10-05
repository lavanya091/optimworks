import React from 'react';
import './CartDisplay.css'

function CartDisplay({ cart }) {
  return (
    <div className="cart-display">
      <h3>Cart Items:</h3>
      {cart.length > 0 ? (
          cart.map((cartItem, index) => (
              <div key={index}>
                  <h4>Name: {cartItem.name}</h4>
                  <h4>Price: ${cartItem.price}</h4>
              </div>
          ))
      ) : (
          <p>No items in the cart.</p>
      )}
    </div>
  );
}

export default CartDisplay;
