// Fetches and displays a list of products from the Fake Store API
//Products should be displayed in a visually structured layout.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);         
  const [loading, setLoading] = useState(true);         
  const [error, setError] = useState(null);

  // useEffect to fetch products when component mounts
  useEffect(() => {
  const controller = new AbortController();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://fakestoreapi.com/products', {
        signal: controller.signal
      });
      
      // FakeStoreAPI always returns an array directly
      setProducts(data); 
      setError(null);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError(err.message);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  fetchProducts();
  return () => controller.abort();
}, []);// Empty dependency array means this effect runs only once when component mounts

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <p>Error: {error?.message || 'Something is wrong'}</p>
  }

  // Render the list of products in a structured layout
  //Responsive grid layout to display products in rows and columns, adjusting based on screen size.
 
  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold">Our Collection of Items</h2>                     
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">                                                    
        {products.map((product) => {
          const productId = product.id || product._id;
          return (
            <Col key={productId}>
              <Card className="h-100 shadow-sm border-0 hover-shadow transition">
                <div className="p-3" style={{ height: '200px', display: 'flex', alignItems: 'center',
                   justifyContent: 'center' }}>
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                  />
              </div>
              <Card.Body className="d-flex flex-column">
                <Badge bg="secondary" className="mb-2 align-self-start text-capitalize">
                  {product.category}
                </Badge>
                <Card.Title className="fs-6 fw-bold text-truncate" title={product.title}>
                  {product.title}
                </Card.Title>
                <Card.Text className="text-success fw-bold fs-5">
                  ${product.price}
                </Card.Text>
                <div className="mt-auto">
                  <div className="d-flex gap-2 my-2">
                    <Link to={`/products/${productId}`} className="flex-fill">
                      <Button variant="outline-primary" className="w-100">
                        View Product
                      </Button>
                    </Link>
                    <Link to={`/products/${productId}/edit`} className="flex-fill">
                      <Button variant="outline-primary" className="w-100">
                        Edit Product
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )})}
      </Row>
    </Container>
  );
}

export default ProductList;