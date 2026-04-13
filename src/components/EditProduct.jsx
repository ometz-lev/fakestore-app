
//Display a form pre-filled with the product's current details, allowing the user to modify them.
// Allows users to update an existing product (PUT request to FakeStoreAPI).
//Displays a success message upon successful update or an error message if the update fails.

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // 1. Fetch existing product data to pre-fill the form
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${productId}`, {
          signal: controller.signal
        });
        if (isMounted) {
          setProduct(res.data);
          setLoading(false);
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          setError("Failed to fetch product data.");
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // 2. Handle the PUT request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const controller = new AbortController();
    let isMounted = true;

    try {
      const res = await axios.put(`https://fakestoreapi.com/products/${productId}`, product, {
        signal: controller.signal
      });
      
      if (isMounted) {
        console.log("Updated Product:", res.data);
        setLoading(false);
        setShowSuccess(true);
        // Optional: Redirect after a short delay
        setTimeout(() => navigate('/products'), 2000);
      }
    } catch (err) {
      if (err.name !== 'AbortError' && isMounted) {
        setError("Update failed. Please try again.");
        setLoading(false);
      }
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2>Edit Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {showSuccess && <Alert variant="success">Product updated successfully! Redirecting...</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
          <Button variant="primary" type="submit" disabled={loading} className="flex-fill">
            {loading ? 'Updating...' : 'Update Product'}
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)} className="flex-fill">
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditProduct;