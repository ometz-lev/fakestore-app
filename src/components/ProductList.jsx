// Fetches and displays a list of products from the Fake Store API
//Products should be displayed in a visually structured layout.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);         // State to store products
  const [loading, setLoading] = useState(true);         // State to track loading status
  const [error, setError] = useState(null);             // State to track any errors during fetch

  // useEffect to fetch products when component mounts
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://fakestoreapi.com/products', {
          signal: controller.signal
        });
        
        // Logic to handle different API response structures
        let actualData = [];
        
        if (Array.isArray(response.data)) {
          actualData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          // This specific API often nests it under 'data'
          actualData = response.data.data;
        } else if (response.data && Array.isArray(response.data.products)) {
          actualData = response.data.products;
        }

        if (isMounted) {
          setProducts(actualData);
          setLoading(false);
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          console.error("Fetch error:", err);
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []); // Empty dependency array means this effect runs only once when component mounts

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <p>Error: {error?.message || 'Something went wrong'}</p>
  }

  // Render the list of products in a structured layout
  //Responsive grid layout to display products in rows and columns, adjusting based on screen size.
  //Each product is displayed in a card format, showing the product image, title, price, and details.
  //Each product card includes a link to the ProductDetails component, allowing users to view more information about the product when clicked.
  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold">Our Collection</h2>                     
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
                  <Link to={`/products/${productId}`} className="w-100 mb-2">
                    <Button variant="outline-primary" className="w-100">
                      View Product
                    </Button>
                  </Link>
                  <div className="d-flex gap-2 my-2">
                    <Link to={`/products/${productId}/edit`} className="flex-fill">
                      <Button variant="outline-primary" className="w-100">
                        Edit Product
                      </Button>
                    </Link>
                    <Link to={`/products/${productId}/delete`} className="flex-fill">
                      <Button variant="outline-danger" className="w-100">
                        Delete Product
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