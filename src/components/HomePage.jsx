//Create a home page component that displays a welcome message and introduces the store.
// Contains a button that links to the product listing page.
//Styled using bootstrap components and classes to make it visually appealing.

import { Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
  
    <div className="hero-banner text-white d-flex align-items-center">
      <Container>
        <div className="hero-content p-5 rounded">
          <h1 className="display-2 display-md-1 fw-bold">Upgrade Your Style</h1>
          <p className="lead fs-5 fs-md-4 mb-4">
            Discover the latest trends in fashion, jewelry, and electronics.
            <br />
            Browse our wide selection of fake products and find something you love!
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg" className="mt-3 px-4 py-2">
              Shop Now
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};


export default HomePage;
