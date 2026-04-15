//Displays detailed information about a specific product when a user clicks 
// on a product from the ProductList component
// Button to add the product to the cart
//Button to delete the product
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Badge, Alert } from 'react-bootstrap';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for success/error messages
  const [showResponse, setShowResponse] = useState({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  // Function to trigger the message
  const triggerResponse = (msg, variant = 'success') => {
    setShowResponse({ show: true, message: msg, variant });
    setTimeout(() => setShowResponse({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleAddToCart = () => {
    // Alert message that the product has been added to the cart
    triggerResponse(`${product.title} added to cart!`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // FakeStoreAPI returns the delete response but doesn't actually delete
        await axios.delete(`https://fakestoreapi.com/products/${productId}`);
        triggerResponse("Product deleted successfully!", "danger");
        
        // Redirect back to list after the user sees the message
        setTimeout(() => navigate('/'), 1500);
      } catch (err) {
        console.error("Error:", err);
        triggerResponse("Unable to delete product", "warning");
      }
    }
  };

  if (loading) return <Container className="text-center py-5"><Spinner animation="border" variant="primary" /></Container>;
  if (error) return <Container className="text-center py-5"><p className="text-danger">Error: {error}</p></Container>;
  if (!product) return <Container className="text-center py-5"><p>Product not found</p></Container>;

  return (
    <Container className="py-5">
      {/* Display success/error message at the top of the page */}
      {showResponse.show && (
        <Alert 
          variant={showResponse.variant} 
          className="position-fixed top-0 start-50 translate-middle-x mt-3 shadow" 
          style={{ zIndex: 9999 }}
        >
          {showResponse.message}
        </Alert>
      )}

      <Row className="flex-column flex-md-row">
        <Col xs={12} md={6} className="mb-4 mb-md-0 d-flex align-items-center justify-content-center">
          <img 
            src={product.image} 
            alt={product.title}
            style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain' }} 
          />
        </Col>
        
        <Col xs={12} md={6}>
          <Card.Body className="d-flex flex-column h-100">
            <Badge bg="secondary" className="mb-2 align-self-start text-capitalize">
              {product.category}
            </Badge>
            <Card.Title className="fs-3 fw-bold mb-3">{product.title}</Card.Title>
            <Card.Text className="text-success fw-bold fs-4 mb-3">
              ${product.price}
            </Card.Text>
            <Card.Text className="mb-4 text-muted">{product.description}</Card.Text>
            
            <div className="d-flex flex-column flex-sm-row gap-2 mt-auto">
              <Button onClick={handleAddToCart} variant="primary" className="flex-fill py-2">
                Add to Cart
              </Button>
              <Button onClick={handleDelete} variant="danger" className="flex-fill py-2">
                Delete Product
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;