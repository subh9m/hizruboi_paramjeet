import { useEffect, useState } from "react";
import "./EditProduct.css";
import { useNavigate } from "react-router-dom";
import DHeader from "../../components/dashboard-header/dheader";
import Footer from "../../components/footer/footer";

const EditProduct = () => {
  const [qCType, setQCType] = useState("exact");
  const [formData, setFormData] = useState({
    name: "",
    qB: 0,
    qC: "",
    qCPercentage: "",
    unit: "kg",
    category: "Dairy",
    expiryDate: "",
    disableAlerts: false,
  });
  const [productId, setProductId] = useState(null);
  const [expiryError, setExpiryError] = useState("");
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("productId");
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/signup");
      return;
    }

    if (!id) {
      alert("Invalid product ID.");
      navigate("/dashboard");
      return;
    }
    setProductId(id);

    fetch(`http://localhost:8080/product/id/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching product data.");
        return res.json();
      })
      .then((product) => {
        setFormData({
          name: product.name,
          qB: product.qB,
          qC: product.qC || "",
          qCPercentage: product.percentageLeft ? 100 - product.percentageLeft : "",
          unit: product.unit,
          category: product.category || "Dairy",
          expiryDate: product.expiryDate,
          disableAlerts: product.disableAlerts,
        });
        if (product.percentageLeft !== null) {
          setQCType("percentage");
        }
      })
      .catch(() => {
        alert("Error fetching product data.");
        navigate("/dashboard");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("jwtToken");
      navigate("/signup");
      return;
    }

    const selectedDate = new Date(formData.expiryDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate <= now) {
      setExpiryError("Expiry date must be in the future.");
      return;
    } else {
      setExpiryError("");
    }

    let qC = formData.qC ? parseFloat(formData.qC) : null;
    let qCPercentage = formData.qCPercentage ? parseFloat(formData.qCPercentage) : null;
    let qB = parseFloat(formData.qB);
    let percentageLeft;

    if (qCType === "percentage") {
      if (qCPercentage > 100) {
        alert("Consumed percentage cannot exceed 100%.");
        return;
      }
      qC = parseFloat(((qCPercentage / 100) * qB).toFixed(2));
      percentageLeft = 100 - qCPercentage;
    } else {
      if (qC > qB) {
        alert("Consumed quantity cannot be greater than the quantity bought.");
        return;
      }
      percentageLeft = ((qB - qC) / qB) * 100;
    }

    const updatedData = {
      name: formData.name,
      qB: qB,
      qC: qC,
      percentageLeft: percentageLeft.toFixed(2),
      category: formData.category,
      unit: formData.unit,
      expiryDate: formData.expiryDate,
      disableAlerts: formData.disableAlerts,
    };

    fetch(`http://localhost:8080/product/id/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 500) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("jwtToken");
          navigate("/signup");
          throw new Error("Session expired or server error");
        }
        if (res.status === 400) {
          alert("Invalid entry");
          throw new Error("Invalid input");
        }
        return res.json();
      })
      .then(() => {
        alert("Product updated successfully!");
        navigate("/dashboard");
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <>
      <DHeader/>
      <div className="edit-product-container">
        <h2 className="edit-product-heading">Edit Product</h2>
        <form className="edit-product-form">
          <div className="edit-product-form-group">
            <label htmlFor="name">Product Name:</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="edit-product-form-group">
            <label htmlFor="qB">Quantity Bought:</label>
            <input type="number" id="qB" value={formData.qB} onChange={handleChange} required step="0.01" />
            <label htmlFor="unit">Unit:</label>
            <select id="unit" value={formData.unit} onChange={handleChange} required>
              <option value="kg">Kg</option>
              <option value="g">Grams</option>
              <option value="L">Liters</option>
              <option value="ml">Milliliters</option>
              <option value="packs">Packs</option>
              <option value="n">Number</option>
            </select>
          </div>

          <div className="edit-product-form-group">
            <label htmlFor="qCType">Quantity Consumed:</label>
            <select id="qCType" value={qCType} onChange={(e) => setQCType(e.target.value)}>
              <option value="exact">Exact Quantity</option>
              <option value="percentage">Percentage</option>
            </select>
            {qCType === "exact" ? (
              <input type="number" id="qC" value={formData.qC} onChange={handleChange} placeholder="Enter quantity" />
            ) : (
              <input type="number" id="qCPercentage" value={formData.qCPercentage} onChange={handleChange} placeholder="Enter %" min="0" max="100" />
            )}
          </div>

          <div className="edit-product-form-group">
            <label htmlFor="category">Category:</label>
            <select id="category" value={formData.category} onChange={handleChange} required>
              <option value="Dairy">Dairy</option>
              <option value="Grocery">Grocery</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Hygiene">Hygiene</option>
              <option value="Medicine">Medicine</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="edit-product-form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="date" id="expiryDate" value={formData.expiryDate} onChange={handleChange} required min={today} />
            <span className="edit-product-expiry-error">{expiryError}</span>
          </div>

          <div className="edit-product-form-group">
            <label htmlFor="disableAlerts">Disable Alerts:</label>
            <label className="edit-product-switch">
              <input type="checkbox" id="disableAlerts" checked={formData.disableAlerts} onChange={handleChange} />
              <span className="edit-product-slider round"></span>
            </label>
          </div>

          <button type="button" className="edit-product-submit-btn" onClick={handleSubmit}>
            Update Product
          </button>
          <button type="button" className="edit-product-cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditProduct;
