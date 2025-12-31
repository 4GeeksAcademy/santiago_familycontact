
// Import React and necessary hooks
import React, { useState, useEffect } from "react";
// useNavigate is used to programmatically navigate between routes
import { useNavigate } from "react-router-dom";
// Custom hook for accessing global state and dispatch actions
import useGlobalReducer from "../hooks/useGlobalReducer";
// Main component
export const Home = () => {
  const { store, dispatch } = useGlobalReducer(); // Access global state and dispatch
  const navigate = useNavigate(); // Initialize navigation hook
  // Controls whether delete confirmation modal is visible
  const [showModal, setShowModal] = useState(false);
  // Stores the ID of the contact selected for deletion
  const [selectedContactId, setSelectedContactId] = useState(null);
  // Fetch contacts when component mounts
  useEffect(() => {
    getContacts();
  }, []);
  // Creates an empty contact list if not already present on the API
  const createContactList = async () => {
    await fetch("https://playground.4geeks.com/contact/agendas/lsantiago3", {
      method: "POST", // Create a new list
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  // Fetch all contacts from the API
  const getContacts = async () => {
    let response = await fetch(
      "https://playground.4geeks.com/contact/agendas/lsantiago3/contacts"
    );
    if (!response.ok) {
      createContactList(); // If no list exists, create it
    } else if (response.ok) {
      let data = await response.json(); // Parse response
      dispatch({
        type: "load_data", // Action to load contacts into global store
        contacts: data.contacts,
      });
    }
  };
  // Trigger delete confirmation modal
  const handleDelete = (id) => {
    setSelectedContactId(id); // Set which contact will be deleted
    setShowModal(true); // Show modal
  };
  // Confirm and delete contact from API
  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/lsantiago3/contacts/${selectedContactId}`,
        {
          method: 'DELETE', // Remove contact
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        dispatch({
          type: "delete_task", // Update global state
          payload: selectedContactId,
        });
        setShowModal(false); // Close modal
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };
  return (
    <div className="container mt-4">
      {/* Contact list */}
      <ul className="list-group">
        {store.contacts.map((item) => (
          <li
            key={item.id} // Unique identifier
            className="list-group-item d-flex justify-content-between align-items-center mb-3"
          >
            {/* Left section: Image + contact info */}
            <div className="d-flex align-items-center">
              <img
                src="https://placedog.net/300" // Placeholder image
                alt="Profile"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  marginRight: "15px",
                }}
              />
              <div>
                <h5>{item.name}</h5>
                <p className="mb-1">
                  <i className="fas fa-map-marker-alt"></i> {item.address}
                </p>
                <p className="mb-1">
                  <i className="fas fa-phone"></i> {item.phone}
                </p>
                <p className="mb-0">
                  <i className="fas fa-envelope"></i> {item.email}
                </p>
              </div>
            </div>
            {/* Right section: Action buttons */}
            <div className="d-flex">
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => {
                  navigate(`/editcontact/${item.id}`); // Navigate to edit page
                }}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item.id)} // Open delete confirmation
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Are you sure?</h4>
            <p>If you delete this contact, it will be permanently removed.</p>
            <button onClick={confirmDelete} className="btn btn-danger">
              Delete
            </button>
            <button onClick={() => setShowModal(false)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Inline styles for modal */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5); /* Dark semi-transparent background */
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        .btn {
          margin: 5px;
        }
      `}</style>
    </div>
  );
};
