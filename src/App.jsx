import {Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import DeleteProduct from './components/DeleteProduct';

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />  // Home page route
      <Route path="/products" element={<ProductList />} />     // Product listing route
      <Route path="/products/:productId" element={<ProductDetails />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/:productId/edit" element={<EditProduct />} />
      <Route path="/products/:productId/delete" element={<DeleteProduct />} />
    </Routes>
    </>
  );

}

export default App;
      
