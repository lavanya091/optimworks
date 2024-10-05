import React, { useRef } from 'react';
import './OrderDetails.css';

function OrderDetails({ setOrderPlaced, handleOrderPlacement }) {
    const tableData = useRef("");
    const mobilenumber = useRef("");
    const dates = useRef("");
    const time = useRef("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleOrderPlacement({
            tableNumber: tableData.current.value,
            contactNumber: mobilenumber.current.value,
            date: dates.current.value,
            time: time.current.value,
        });
        setOrderPlaced(true); 
        tableData.current.value = "";
        mobilenumber.current.value = "";
        dates.current.value = "";
        time.current.value = "";
    };

    return (
        <div className="order-details-form">
            <h2>Order Details</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="table number" placeholder="Enter your table number" ref={tableData} required />
                <input type="number" name="contact number" placeholder="Enter your contact number (optional)" ref={mobilenumber} />
                <input type="date" name="date" required ref={dates} />
                <input type="time" name="time" required ref={time} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default OrderDetails;
