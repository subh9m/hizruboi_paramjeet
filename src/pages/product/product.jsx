import React, { useState } from 'react';
import './product.css';
import DHeader from '../../components/dashboard-header/dheader';
import SnackbarWithDecorators from '../../components/snackbar/SnackbarWithDecorators';

const Product = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryError, setExpiryError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD
    if (expiryDate <= today) {
      setExpiryError(true);
      return;
    }

    setExpiryError(false);
    setSnackbarOpen(true);
    // You can also add code to actually submit or store the form data
  };

  return (
    <>
      <DHeader />
      <div>
        <div className="product-form-heading">
          <h2>Product Form</h2>
        </div>
        <form className="product-form-form" onSubmit={handleSubmit}>
          <div className="product-form-form-group">
            <label htmlFor="name">Product Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="product-form-form-group">
            <label htmlFor="qB">Quantity Bought:</label>
            <input type="number" id="qB" name="qB" required step="0.01" />
            <label htmlFor="unit">Unit:</label>
            <select id="unit" name="unit" required>
              <option value="kg">Kg</option>
              <option value="g">Grams</option>
              <option value="L">Liters</option>
              <option value="ml">Milliliters</option>
              <option value="packs">Packs</option>
              <option value="n">Number</option>
            </select>
          </div>
          <div className="product-form-form-group">
            <label htmlFor="qCType">Quantity Consumed:</label>
            <select id="qCType" name="qCType">
              <option value="exact">Exact Quantity</option>
              <option value="percentage">Percentage</option>
            </select>
            <input type="number" id="qC" name="qC" placeholder="Enter quantity" />
            <input type="number" id="qCPercentage" name="qCPercentage" placeholder="Enter %" min="0" max="100" />
          </div>
          <div className="product-form-form-group">
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" required>
              <option value="Dairy">Dairy</option>
              <option value="Grocery">Grocery</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Hygiene">Hygiene</option>
              <option value="Medicine">Medicine</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="product-form-form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              required
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            {expiryError && (
              <span className="product-form-expiry-error">
                Expiry date must be later than today!
              </span>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
        <SnackbarWithDecorators
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message="Product added successfully!"
        />
      </div>
      <footer />
    </>
  );
};

export default Product;
