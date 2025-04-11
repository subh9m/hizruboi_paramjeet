import React, { useEffect, useState } from 'react';
import DHeader from '../../components/dashboard-header/dheader';
import Footer from "../../components/footer/footer";
import './dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      window.location.href = "signup";
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/product/products", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("jwtToken");
          window.location.href = "signup";
          return;
        }

        const data = await response.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    if (selected === "all") {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === selected));
    }
  };

  const handleEdit = (id) => {
    window.location.href = `edit_product.html?productId=${id}`;
  };

  const handleAnalyse = (id) => {
    localStorage.setItem("selectedProductId", id);
    window.location.href = "analyse_product.html";
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "signup";
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/product/id/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
        return;
      }

      alert("Product deleted successfully!");
      setFiltered(prev => prev.filter(p => p.strid !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  return (
    <>
      <DHeader />
      <div className="dashboard-page">
        <div className="dashboard-filter">
          <label htmlFor="categoryFilter"><strong>Filter by Category:</strong></label>
          <select id="categoryFilter" onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="Dairy">Dairy</option>
            <option value="Grocery">Grocery</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Hygiene">Hygiene</option>
            <option value="Medicine">Medicine</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="dashboard-product-container">
          {filtered.map(product => {
            const { name, category, qB, qC, unit, percentageLeft, stringDate, daysToExpiry, disableAlerts, strid } = product;
            const isExpired = daysToExpiry <= 0;
            const isFinished = percentageLeft === 0;
            const cardClass = isExpired
              ? "dashboard-expired-product"
              : isFinished
              ? "dashboard-finished-product"
              : disableAlerts
              ? "dashboard-disabled-product"
              : "";

            let displayName = name;
            if (isExpired) displayName += " (Expired)";
            else if (isFinished) displayName += " (Finished)";
            else if (disableAlerts) displayName += " (Alerts Disabled)";

            return (
              <div key={strid} className={`dashboard-product-card ${cardClass}`}>
                <div className="dashboard-product-name">{displayName}</div>
                <div className="dashboard-product-id">{category}</div>
                <div className="dashboard-product-details"><b>Quantity Bought:</b> {qB} {unit}</div>
                <div className="dashboard-product-details"><b>Quantity Consumed:</b> {qC} {unit}</div>
                <div className="dashboard-product-details"><b>Remaining:</b> {percentageLeft}%</div>
                <div className="dashboard-product-details"><b>Expiry Date:</b> {stringDate}</div>
                {!isExpired && !isFinished && (
                  <>
                    <button className="dashboard-product-details" onClick={() => handleEdit(strid)}>Edit</button>
                    <button className="dashboard-product-details" onClick={() => handleAnalyse(strid)}>Analyse</button>
                  </>
                )}
                <button className="dashboard-product-details" onClick={() => handleDelete(strid)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
