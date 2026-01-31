import react, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/lsantiago3/contacts/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setContact(data);
        } else {
          console.error("Failed to fetch contact");
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id]);

  const handleInputChange = (event) => {
    const {name,value} = event.target;
    setContact({...contact,[name]: value});
  }; 
  const handleSubmit = async (event) =>{
    event.preventDefault();
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/lsantiago3/contacts/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(contact), 
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Contact updated successfully:', data);
        dispatch({
          type: "edit_contact",
          payload: data,
        });
        navigate('/'); // Navigate back to home after successful update
      } else {
        console.error('Failed to update contact'); 
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const elementStyle = {
    backgroundColor: '#ffffff',
    border: '2px solid #000000',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    margin: 'auto'
  };

  const h1Style = {
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
    color: '#333333',
    textAlign: 'center',
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const linkStyle = {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    color: '#007bff',
    textDecoration: 'none'
  };

  return (
    <div style={elementStyle}>
      <h1 style={h1Style}>Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            placeholder="Enter full name"
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            placeholder="Enter email"
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Phone</label>
          <input
            type="text"
            name="phone"
            value={contact.phone}
            placeholder="Enter phone number"
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Address</label>
          <input
            type="text"
            name="address"
            value={contact.address}
            placeholder="Enter address"
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>Save</button>
      </form>

      <a href="#" style={linkStyle}>or get back to contacts</a>
    </div>
  );
};

export default EditContact;