//Allows the user to delete a product (DELETE request to FakeStoreAPI).
//Displays a confirmation prompt before deletion and shows a success message
// upon successful deletion or an error message if the deletion fails. Users
//should be redirected to the product list after deletion.

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';

const DeleteProduct = () => {
  const { productId } = useParams();
  console.log("Product to delete:", productId);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

const handleDelete = async () => {
    setLoading(true);
    setAlert(null);
    setShowModal(false);

    try {
      // 1. Perform the deletion
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      
      // 2. Show the success message immediately
      setAlert({ type: 'success', message: 'Product deleted successfully. Redirecting...' });
      
      // 3. Stop the spinner so the user sees the "Success" alert clearly
      setLoading(false);

      // 4. Wait for the user to read the message before whisking them away
      setTimeout(() => {
        navigate('/products');
      }, 2000);

    } catch (err) {
      console.error("Deletion error:", err);
      setLoading(false);
      setAlert({ 
        type: 'danger', 
        message: 'Something went wrong. Please try again.' 
      });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Delete Product</h2>
      <div className="text-center mb-4">
        <p className="mb-4">Are you sure you want to delete this product?</p>
        <Button variant="danger" size="lg" onClick={() => setShowModal(true)}>
          Delete Product
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Deleting this product will remove it permanently.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

      {alert && (
        <Alert variant={alert.type} className="mt-3" onClose={() => setAlert(null)} 
    dismissible>
          {alert.message}
        </Alert>
      )}
    </Container>
  );
};

export default DeleteProduct;

