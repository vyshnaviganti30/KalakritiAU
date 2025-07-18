import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [activeTab, setActiveTab] = useState('profile');
  const [bio, setBio] = useState("I am a textile artist from the vibrant deserts of Rajasthan. Inspired by my grandmother’s embroidery work, I started experimenting with eco-friendly dyes and natural fabrics. Every piece I create tells a story of tradition, sustainability, and love for heritage.");
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState(bio);
  const profileImage = null;

  const handleLogout = () => {
    localStorage.clear(); // or localStorage.removeItem('user');
    window.location.href = '/login';
  };
  const tabClass = (tab) => `list-group-item list-group-item-action sidebar-tab ${activeTab === tab ? 'active-tab' : ''}`;

  return (
    <div className="container-fluid dashboard-bg min-vh-100 p-0">
      {/* Embedded Styles from Dashboard.css */}
      <style>{`
        .dashboard-bg {
          background: linear-gradient(to right, #fff8f2, #ffe0b2);
        }
        .sidebar {
          background: linear-gradient(to bottom, maroon, #f57c00);
          min-height: 100vh;
          border-right: 2px solid #fff3e0;
        }
        .sidebar-tab {
          background-color: transparent;
          color: white;
          border: none;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
        }
        .sidebar-tab:hover {
          background-color: #ffcc80;
          color: #212121;
        }
        .active-tab {
          background-color: #fff3e0;
          color: #e65100;
          font-weight: bold;
        }
        .welcome-banner {
          background: linear-gradient(90deg, maroon, #ffa726);
          color: #fff;
          border-radius: 1rem;
        }
        .info-tile {
          background-color: #ffffff;
          border-radius: 1rem;
        }
        .product-card {
          background-color: #fff8e1;
          border-radius: 0.75rem;
        }
        .placeholder-dp {
          width: 80px;
          height: 80px;
          background-color: #ffe0b2;
          color: #e65100;
          font-size: 32px;
          font-weight: bold;
          text-transform: uppercase;
          border: 2px solid #fff;
          margin-left: 50px;
        }
        .initials {
          font-family: 'Arial', sans-serif;
        }
      `}</style>

      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-2 sidebar d-flex flex-column p-4 text-white">
          <div className="text-center mb-4">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="rounded-circle" width="80" height="80" />
            ) : (
              <div className="placeholder-dp rounded-circle d-flex align-items-center justify-content-center">
                <span className="initials">P</span>
              </div>
            )}
            <h4 className="fw-bold mt-2">Kalakriti</h4>
          </div>
          <div className="list-group">
            <button onClick={() => setActiveTab('profile')} className={tabClass('profile')}>Profile Info</button>
            <button onClick={() => setActiveTab('story')} className={tabClass('story')}>My Story</button>
            <button onClick={() => setActiveTab('products')} className={tabClass('products')}>My Products</button>
            <button onClick={() => setActiveTab('orders')} className={tabClass('orders')}>My Orders</button>
            <button onClick={() => setActiveTab('reviews')} className={tabClass('reviews')}>My Reviews</button>
            <button onClick={() => setActiveTab('wallet')} className={tabClass('wallet')}>Earnings & Wallet</button>
          
            <button onClick={handleLogout} className="btn btn-sm btn-light mt-4 text-danger fw-bold">
  Logout
</button>

          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-10 main-content p-4">
          <div className="welcome-banner card border-0 shadow-sm mb-4 p-4 text-white">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
              <div>
                <h3 className="fw-bold">Hey,{user.fullName || "N/A"} 👋</h3>
                <p>Welcome to your dashboard. Let's celebrate Indian creativity together!</p>
              </div>
              <img src="/illustration.png" alt="Welcome" className="img-fluid d-none d-md-block" style={{ maxHeight: '100px' }} />
            </div>
          </div>

          {activeTab === 'profile' && (
            <div className="info-tile card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3 text-primary">Profile Information</h5>
                <ul className="list-unstyled">
                  <li><strong>Name:</strong> {user.fullName || "N/A"}</li>
                  <li><strong>Region:</strong> {user.area || "N/A"}</li>
                  <li><strong>Email:</strong> {user.email || "N/A"}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'story' && (
            <div className="info-tile card shadow-sm border-0 mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-3 text-primary">My Story</h5>
                  {!editingBio && (
                    <button className="btn btn-outline-primary btn-sm" onClick={() => setEditingBio(true)}>Edit</button>
                  )}
                </div>
                {!editingBio ? (
                  <p className="lead text-muted">{bio}</p>
                ) : (
                  <div>
                    <textarea
                      className="form-control mb-2"
                      rows="4"
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                    ></textarea>
                    <button className="btn btn-success btn-sm me-2" onClick={() => { setBio(newBio); setEditingBio(false); }}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => { setNewBio(bio); setEditingBio(false); }}>Cancel</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="info-tile card shadow-sm border-0 mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title text-primary">My Products</h5>
                  <button className="btn btn-warning btn-sm">+ Add Product</button>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="product-card card p-3 shadow-sm">
                      <h6 className="fw-bold mb-1">Blue Pottery Dish Set</h6>
                      <small className="text-muted">₹850 · Jaipur</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="product-card card p-3 shadow-sm">
                      <h6 className="fw-bold mb-1">Warli Art Painting</h6>
                      <small className="text-muted">₹1200 · Maharashtra</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="info-tile card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3 text-primary">My Orders</h5>
                <div className="d-flex justify-content-between">
                  <p className="mb-0">Phulkari Dupatta - Delivered - ₹950</p>
                  <a href="#" className="text-decoration-none text-warning">Download Invoice</a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="info-tile card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3 text-primary">My Reviews</h5>
                <p><strong>Blue Pottery Dish Set</strong></p>
                <p>⭐⭐⭐⭐⭐ - Beautiful craftsmanship and vibrant colors!</p>
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="info-tile card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3 text-primary">Earnings & Wallet</h5>
                <p className="display-6">₹3,500</p>
                <small className="text-muted">Recent transactions will appear here.</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
