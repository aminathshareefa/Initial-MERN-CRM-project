import React, { useEffect, useState } from "react";
import api from "../utils/api";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const res = await api.get("/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    await api.delete(`/customers/${id}`);
    fetchCustomers();
  };

  return (
    <div>
      <h2>Customer List</h2>
      {customers.map((c) => (
        <div key={c._id}>
          <p>{c.name} - {c.email}</p>
          <button onClick={() => deleteCustomer(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
