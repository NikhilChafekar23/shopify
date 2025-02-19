import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('image', productImage);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product added successfully!');
        navigate('/home', { state: { newProductAdded: true } }); // Redirect to HomePage
      } else {
        alert(data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <br />

        <label>Product Price:</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <br />

        <label>Upload Product Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
