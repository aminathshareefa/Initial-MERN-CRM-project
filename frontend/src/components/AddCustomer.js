import React, { useState } from "react";
import api from "../utils/api";

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const onChange = (e) =>
    setCustomer({ ...customer, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customers", customer);
      alert("Customer added successfully");
      setCustomer({ name: "", email: "", phone: "", address: "" });
    } catch (err) {
      alert("Error adding customer");
    }
  };

  return (
    <div>
      <h2>Add Customer</h2>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Name" onChange={onChange} required />
        <input name="email" placeholder="Email" onChange={onChange} />
        <input name="phone" placeholder="Phone" onChange={onChange} />
        <input name="address" placeholder="Address" onChange={onChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCustomer;
