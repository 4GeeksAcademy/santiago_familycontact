import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  useEffect(() => {
    getContacts();
  }, []);

  const createContactList = async () => {
    await fetch("https://playground.4geeks.com/contact/agendas/lsantiago3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getContacts = async () => {
    let response = await fetch(
      "https://playground.4geeks.com/contact/agendas/lsantiago3/contacts"
    );
    if (!response.ok) {
      createContactList();
    } else if (response.ok) {
      let data = await response.json();
      dispatch({
        type: "load_data",
        contacts: data.contacts,
      });
    }
  };

  const handleDelete = (id) => {
    setSelectedContactId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/lsantiago3/contacts/${selectedContactId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        dispatch({
          type: "delete_contact",
          payload: { id: selectedContactId },
        });
        setShowModal(false);
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };
  return (
    <div className="container mt-4">
      <ul className="list-group">
        {store.contacts.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center mb-3"
          >
            {/* Left section: Image + contact info */}
            <div className="d-flex align-items-center">
              <img
                src="https://placedog.net/300"
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
            <div className="d-flex">
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => {
                  navigate(`/editcontact/${item.id}`);
                }}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
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
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
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
