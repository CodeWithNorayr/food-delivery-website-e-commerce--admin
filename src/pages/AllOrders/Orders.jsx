import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = ({ setShowSidebar }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = "http://localhost:4000";

  // ✅ Fetch Orders
  const fetchAllOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${backendURL}/api/allorder/allorders`
      );

      if (response.data.success) {
        setData(response.data.data || []);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      toast.error("Server error while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run once when component mounts
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="orders-container">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      {/* Back Button */}
      <button onClick={() => setShowSidebar(true)}>⬅ Back</button>

      {/* No Orders */}
      {data.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        data.map((order) => (
          <div key={order._id} className="order-card">
            {/* Items */}
            <div className="order-items">
              <h4>Items:</h4>

              {(order.items || []).map((item, i) => (
                <div key={i} className="order-item">
                  <p>
                    <b>Name:</b> {item.name}
                  </p>
                  <p>
                    <b>Price:</b> ₹{item.price}
                  </p>
                  <p>
                    <b>Quantity:</b> {item.quantity || 1}
                  </p>
                  <p>
                    <b>Description:</b>{" "}
                    {item.description || "No description"}
                  </p>
                  <p>
                    <b>Category:</b> {item.category || "No category"}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Info */}
            <div className="order-info">
              <p>
                <b>Status:</b> {order.status || "Pending"}
              </p>
              <p>
                <b>Total Amount:</b> ₹{order.amount || 0}
              </p>
              <p>
                <b>User ID:</b> {order.userId}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
