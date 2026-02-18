import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ setShowSidebar }) => {
  const [food_list, setFoodList] = useState([]);

  const backendURL = "https://food-delivery-website-e-commerce-backend.onrender.com";

  // ✅ Fetch Food List
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/food/list`);

      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch food list");
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  // ✅ Delete Food (Fixed)
  const deleteFood = async (id) => {
    try {
      const response = await axios.delete(
        `${backendURL}/api/food/remove`,
        {
          data: { id }, // ✅ Send ID properly
        }
      );

      if (response.data.success) {
        toast.success("Food deleted successfully");

        // ✅ Refresh list after deletion
        fetchFoodList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete the food");
    }
  };

  return (
    <div>
      <button onClick={() => setShowSidebar(true)}>BACK</button>

      <div className="foodlist">
        {/* Table Header */}
        <div className="table-context">
          <p>Name</p>
          <p>Image</p>
          <p>Description</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        <hr />

        {/* Table Data */}
        <div className="context">
          {food_list.map((food) => (
            <div key={food._id} className="context-data">
              <p>{food.name}</p>

              <img
                src={food.image}
                alt={food.name}
                style={{ width: "50px", height: "50px" }}
              />

              <p>{food.description}</p>
              <p>${food.price}</p>

              {/* ✅ Delete Button */}
              <p
                onClick={() => deleteFood(food._id)}
                style={{ cursor: "pointer", color: "red" }}
              >
                X
              </p>

              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
