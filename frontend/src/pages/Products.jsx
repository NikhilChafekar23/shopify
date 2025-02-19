import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const addToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product already exists in wishlist
    if (!wishlist.some(item => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert(`${product.name} added to Wishlist!`);
    } else {
      alert(`${product.name} is already in Wishlist!`);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              <h3>{product.name}</h3>
              <p>Price: Rs. {product.price}</p>
              <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
