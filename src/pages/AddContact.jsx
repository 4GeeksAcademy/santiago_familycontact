// Import React and the useState hook from the 'react' library
import React, { useState } from 'react';

// Define the AddContact functional component
const AddContact = () => {

  // Initialize state for the contact form fields
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Handle input changes for all fields dynamically
  const handleInputChange = (event) => {
    const { name, value } = event.target;             // Get the input's name and value
    setContact({ ...contact, [name]: value });        // Update only the changed field
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();                           // Prevent page reload on submit
    console.log('Contact to be created:', contact);   // Log the current form data

    try {
      // Make a POST request to the API
      const response = await fetch('https://playground.4geeks.com/contact/agendas/lsantiago3/contacts', {
        method: 'POST',                               // HTTP method
        headers: {
          'Content-Type': 'application/json',         // Specify JSON format
        },
        body: JSON.stringify(contact),                 // Convert contact object to JSON
      });

      console.log('Response status:', response.status); // Log response status code

      if (response.ok) {                               // If request succeeded
        const data = await response.json();            // Parse JSON response
        console.log('Contact created successfully:', data); // Log success
      } else {
        console.error('Failed to create contact');      // Log failure
      }
    } catch (error) {
      console.error('Error creating contact:', error);  // Log network error
    }
  };
  // Define inline styles for the main container
  const elementStyle = {
    backgroundColor: '#ffffff',
    border: '2px solid #000000',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    margin: 'auto'
  };

  // Define styles for the title
  const h1Style = {
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
    color: '#333333',
    textAlign: 'center',
    marginBottom: '20px'
  };

  // Define styles for labels
  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold'
  };

  // Define styles for input fields
  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  // Define styles for the submit button
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

  // Define styles for the link at the bottom
  const linkStyle = {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    color: '#007bff',
    textDecoration: 'none'
  };

  // Render the component
  return (
    <div style={elementStyle}>
      <h1 style={h1Style}>Create Contact</h1>         {/* Form title */}
      <form onSubmit={handleSubmit}>                  {/* Form with submit handler */}
        
        {/* Full Name Field */}
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

        {/* Email Field */}
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

        {/* Phone Field */}
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

        {/* Address Field */}
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

        {/* Submit Button */}
        <button type="submit" style={buttonStyle}>Save</button>
      </form>

      {/* Link to go back */}
      <a href="#" style={linkStyle}>or get back to contacts</a>
    </div>
  );
};

// Export the component so it can be used elsewhere
export default AddContact;