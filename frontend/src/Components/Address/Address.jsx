import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Address = () => {
  const userId = localStorage.getItem("profileID");
  const [user, setUser] = useState({ address1: "", address2: "", zipcode: "" });
  const navigate = useNavigate();

  // Fetch user data when component loads
  useEffect(() => {
    axios.get(`http://localhost:5000/user/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user data:", error));
  }, [userId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser, 
      [name]: value 
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    axios.put(`http://localhost:5000/user/${userId}`, user)
      .then(() => alert("User information updated successfully"))
      .catch(error => console.error("Error updating user:", error));
  };
  const [originalData, setOriginalData] = useState(user); // Backup for cancel
  const [isEditing, setIsEditing] = useState(false); // Editing state

 
  // Handle "Edit" button click
  const handleEdit = () => {
    setIsEditing(true); // Enable editing
  };

  // Handle "Save" button click
  const handleSave = () => {
    setOriginalData(user); // Update the original data
    setIsEditing(false); // Disable editing
    handleSubmit();
  };

  // Handle "Cancel" button click
  const handleCancel = () => {
    setUser(originalData); // Revert to original data
    setIsEditing(false); // Disable editing
    // window.location.reload();
    navigate(0); // ✅ Reloads the current route

  };


  return (
    <div>
      <div className="formHead">Address Information </div>
        <form >
        <div className="form-floating mb-3">
            <input
              type="text"
              name="address1"
              value={user.address1}
              onChange={handleChange}
              disabled={!isEditing} // Disable input when not editing
              id="labeladdress1"
              className="form-control"
            />
              <label htmlFor="labeladdress1">Door Number/Flat Number - Street Name</label>
        </div>
        <div className="form-floating mb-3">
            <input
              type="text"
              name="address2"
              value={user.address2}
              onChange={handleChange}
              disabled={!isEditing} // Disable input when not editing
              id="labeladdress2"
              className="form-control"
            
            />
              <label htmlFor="labeladdress2">City and State</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              name="zipcode"
              value={user.zipcode}
              onChange={handleChange}
              disabled={!isEditing} // Disable input when not editing
              id="labelzipcode"
              className="form-control"
            />
              <label htmlFor="labelzipcode">Pin Code</label>
          </div>
       

        {/* <button type="submit">Save</button> */}
        <div style={{ marginTop: "10px" }}>
            {!isEditing ? (
              <button type="button" onClick={handleEdit} className="submit-button">
                Edit
              </button>
            ) : (
              <>
                <button type="button" onClick={handleSave} className="submit-button">
                  Save
                </button>
                <button type="button" onClick={handleCancel} style={{ marginLeft: "5px" }} className="submit-button">
                  Cancel
                </button>
              </>
            )}
          </div>
      </form>
    </div>
  );
};

export default Address
