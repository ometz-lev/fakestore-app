// Use a form to add a new product to the store
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

const AddProduct = () => {

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://fakestoreapi.com/products', formData);
      setAlert({ variant: 'success', message: 'Product added successfully!' });
      setFormData({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
    } catch {
      setAlert({ variant: 'danger', message: 'Error adding product.' });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Add New Product</h2>
      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;