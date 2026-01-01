import React, { useState, useEffect } from 'react'
import { Table, Pagination, Spinner, Alert } from 'react-bootstrap';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const TOTAL_PAGES = 50;
  const ITEMS_PER_PAGE = 5;

  const fetchProducts = async () => {
    try {
      const maxItemsPerPage = ITEMS_PER_PAGE;
      setLoading(true);
      const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${currentPage}&limit=${maxItemsPerPage}`);
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonResult = await response.json();
      setProducts(jsonResult);
      setError(null);
    } catch (error) {
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); 
  };

  return (
    <>
    <h1 style={{ padding: "20px" }}>Available Products</h1>
    {error && <Alert variant="danger">{error}</Alert>}
<Table striped bordered hover style={{ width: "900px", maxHeight: "400px", marginBottom: "20px" }}>
      <thead>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Slug</th>
          <th>Price</th>
          <th>Description</th>
           <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-5">
                <Spinner animation="border" />
              </td>
            </tr>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                 <td>{product.slug}</td>
                 <td>{product.price}</td>
                 <td>{product.description}</td>
                <td>{product.category.name}</td>
                <td>
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No products found.</td>
            </tr>
          )}
      </tbody>
    </Table>
   <Pagination className="justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        
        <Pagination.Item active>{currentPage}</Pagination.Item>
        
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === TOTAL_PAGES} />
        <Pagination.Last onClick={() => handlePageChange(TOTAL_PAGES)} disabled={currentPage === TOTAL_PAGES} />
      </Pagination>
    </>
  )
}
