//Displays detailed information about a specific product when a user clicks 
// on a product from the ProductList component
// Button to add the product to the cart
//Button to delete the product
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';

const ProductDetails = () => {
  const { productId } = useParams();                  // Get the product ID from the URL parameters

  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null);     // State to track any errors during fetch

  // useEffect to fetch product details when component mounts or when ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);          
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]); // Dependency array includes 'productId' to re-fetch when the ID changes

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <Container className="py-5">
      <Row className="flex-column flex-md-row">
        <Col xs={12} md={6} className="mb-4 mb-md-0">
          <Card.Img 
            variant="top" 
            src={product.image} 
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
            className="w-100"
          />
        </Col>
        <Col xs={12} md={6}>
          <Card.Body className="d-flex flex-column h-100">
            <Badge bg="secondary" className="mb-2 align-self-start">
              {product.category}
            </Badge>
            <Card.Title className="fs-4 fw-bold mb-3">{product.title}</Card.Title>
            <Card.Text className="text-success fw-bold fs-5 mb-3">
              ${product.price}
            </Card.Text>
            <Card.Text className="mb-4 grow">{product.description}</Card.Text>
            <div className="d-flex flex-column flex-sm-row gap-2 mt-auto">
              <Button variant="primary" className="flex-fill">Add to Cart</Button>
              <Button variant="danger" className="flex-fill">Delete Product</Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;