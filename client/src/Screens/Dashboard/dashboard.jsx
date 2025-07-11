import React, { useState, useEffect } from 'react';

const ShineOneEstate = () => {
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ location: '', priceRange: '', size: '' });
  const [locations, setLocations] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");

      // Fetch all posts
      const response = await fetch('http://localhost:2000/getposts');
      const data = await response.json();
      let properties = data.posts || data || [];

      // Fetch preferred plots for the user
      let preferred = [];
      if (userId) {
        const userRes = await fetch(`http://localhost:2000/get-user/${userId}`);
        const userData = await userRes.json();
        preferred = userData.preferredPlots || [];
      }

      // Mark preferred plots
      properties = properties.map(p => ({
        ...p,
        preferred: preferred.includes(p._id)
      }));

      setProperties(properties);
      setAllProperties(properties);

      // Extract unique locations
      const uniqueLocations = [...new Set(properties.map(p => p.locality).filter(Boolean))];
      setLocations(uniqueLocations);

      setError(null);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle heart preference
  const toggleHeart = async (plotId, isActive) => {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem("userId");
    // Log the request body for debugging 400 errors
    console.log("Sending to server:", { userId, plotId });
    try {
      const response = await fetch('http://localhost:2000/mark-preferred-plot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, plotId })
      });
      if (response.ok) {
        setProperties(prev => prev.map(prop => 
          (prop.id || prop._id) === plotId ? { ...prop, preferred: !isActive } : prop
        ));
      }
    } catch (err) {
      console.error('Error updating preference:', err);
    }
  };

  // Filter properties
  const filterProperties = () => {
    let filtered = [...allProperties];
    
    if (filters.location) {
      filtered = filtered.filter(p => p.locality?.toLowerCase().includes(filters.location.replace('-', ' ')));
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange === '200+' ? [200, Infinity] : filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        const price = parseInt(p.price) || 0;
        return price >= min && price <= max;
      });
    }
    if (filters.size) {
      const [min, max] = filters.size === '1000+' ? [1000, Infinity] : filters.size.split('-').map(Number);
      filtered = filtered.filter(p => {
        const plotSize = parseInt(p.size) || 0;
        return plotSize >= min && plotSize <= max;
      });
    }
    
    setProperties(filtered);
  };

  const contactWhatsApp = (plotId) => {
    const message = `Hi! I'm interested in plot ${plotId} from ShineOneEstate. Can you provide more details?`;
    window.open(`https://wa.me/919310994032?text=${encodeURIComponent(message)}`);
  };

  const viewDetails = (plotId) => {
    const plot = properties.find(p => (p.id || p._id) === plotId);
    setSelectedPlot(plot);
    setShowModal(true);
  };

  // Styles
  const styles = {
    body: { margin: 0, padding: 0, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' },
    header: { background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 20px rgba(0,0,0,0.1)' },
    navContainer: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' },
    logo: { fontSize: '1.8rem', fontWeight: 'bold', color: '#2D2D2D', display: 'flex', alignItems: 'center' },
    logoIcon: { color: '#A3E635', marginRight: '0.5rem' },
    mobileMenuBtn: { display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#2D2D2D' },
    navLinks: { display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 },
    mobileNavLinks: { display: 'none', flexDirection: 'column', position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '1rem' },
    navLink: { textDecoration: 'none', color: '#2D2D2D', fontWeight: 500, transition: 'all 0.3s ease', padding: '0.5rem 0' },
    hero: { background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 600\'%3E%3Crect fill=\'%23667eea\' width=\'1200\' height=\'600\'/%3E%3Ccircle fill=\'%23764ba2\' cx=\'200\' cy=\'100\' r=\'50\' opacity=\'0.3\'/%3E%3C/svg%3E")', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white', padding: '0 1rem' },
    heroContent: { animation: 'fadeInUp 1s ease', maxWidth: '800px' },
    heroTitle: { fontSize: '3rem', marginBottom: '1rem', margin: 0, lineHeight: '1.2' },
    heroSubtitle: { fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.5' },
    heroStats: { display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' },
    stat: { textAlign: 'center', minWidth: '120px' },
    statNumber: { fontSize: '2rem', fontWeight: 'bold', color: '#A3E635' },
    statLabel: { fontSize: '0.9rem', opacity: 0.8 },
    filters: { background: 'white', padding: '2rem', margin: '2rem 1rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
    filterRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
    filterGroup: { flex: 1, minWidth: '200px' },
    filterLabel: { display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#2D2D2D' },
    filterInput: { width: '100%', padding: '0.8rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', transition: 'all 0.3s ease', boxSizing: 'border-box' },
    filterBtn: { background: 'linear-gradient(45deg, #A3E635, #84cc16)', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', width: '100%' },
    propertiesContainer: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
    propertiesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    propertyCard: { background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', position: 'relative' },
    propertyImage: { height: '200px', background: 'linear-gradient(45deg, #667eea, #764ba2)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'rgba(255,255,255,0.3)' },
    propertyBadge: { position: 'absolute', top: '15px', right: '15px', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 },
    badgeAvailable: { background: '#A3E635', color: 'white' },
    badgeSold: { background: '#F87171', color: 'white' },
    heartBtn: { position: 'absolute', top: '15px', left: '15px', background: 'rgba(255,255,255,0.9)', border: 'none', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '1rem' },
    heartBtnActive: { background: '#ff6b6b', color: 'white' },
    propertyDetails: { padding: '1.5rem' },
    propertyTitle: { fontSize: '1.2rem', fontWeight: 'bold', color: '#2D2D2D', marginBottom: '0.5rem' },
    propertyLocation: { color: '#6b7280', display: 'flex', alignItems: 'center', marginBottom: '1rem' },
    propertySpecs: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
    spec: { textAlign: 'center', flex: 1 },
    specValue: { fontWeight: 'bold', color: '#2D2D2D', fontSize: '0.9rem' },
    specLabel: { fontSize: '0.8rem', color: '#6b7280' },
    propertyPrice: { fontSize: '1.5rem', fontWeight: 'bold', color: '#A3E635', marginBottom: '1rem' },
    propertyActions: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
    btnPrimary: { background: 'linear-gradient(45deg, #A3E635, #84cc16)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', flex: 1, minWidth: '120px' },
    btnWhatsapp: { background: '#25d366', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flex: 1, minWidth: '120px' },
    loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' },
    spinner: { width: '40px', height: '40px', border: '4px solid #f3f4f6', borderTop: '4px solid #A3E635', borderRadius: '50%', animation: 'spin 1s linear infinite' },
    footer: { background: '#2D2D2D', color: 'white', padding: '3rem 1rem 1rem', marginTop: '4rem' },
    footerContent: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' },
    footerSection: { marginBottom: '1rem' },
    footerTitle: { color: '#A3E635', marginBottom: '1rem', fontSize: '1.2rem' },
    footerList: { listStyle: 'none', padding: 0, margin: 0 },
    footerLink: { color: '#d1d5db', textDecoration: 'none', transition: 'color 0.3s ease' },
    footerBottom: { textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid #374151', marginTop: '2rem', color: '#9ca3af' },
    errorMessage: { textAlign: 'center', color: '#6b7280', padding: '2rem' },
    noProperties: { textAlign: 'center', color: '#6b7280', padding: '2rem' },
    modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '1rem' },
    modalContent: { background: 'white', borderRadius: '10px', padding: '2rem', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' },
    modalClose: { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' },
    modalImages: { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' },
    modalImage: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }
  };

  return (
    <div style={styles.body}>
      {/* Header */}
      <header style={styles.header}>
        <nav style={styles.navContainer}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🏠</span>
            ShineOneEstate
          </div>
          <button 
            style={styles.mobileMenuBtn} 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
          <ul style={styles.navLinks} className="nav-links">
            <li><a href="#home" style={styles.navLink}>Home</a></li>
            <li><a href="#properties" style={styles.navLink}>Properties</a></li>
            <li><a href="#calculator" style={styles.navLink}>Calculator</a></li>
            <li><a onClick={contactWhatsApp} style={styles.navLink}>Contact</a></li>
          </ul>
          {mobileMenuOpen && (
            <ul style={styles.mobileNavLinks} className="mobile-nav-links">
              <li><a href="#home" style={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#properties" style={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Properties</a></li>
              
              <li><a href="#contact" style={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
            </ul>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle} className="hero-title">Premium Properties in Emerging Areas</h1>
          <p style={styles.heroSubtitle}>Discover your dream property in NCR’s fastest-growing locations</p>
          <div style={styles.heroStats} className="hero-stats">
            <div style={styles.stat}>
              <div style={styles.statNumber}>500+</div>
              <div style={styles.statLabel}>Properties Listed</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>95%</div>
              <div style={styles.statLabel}>Customer Satisfaction</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>24/7</div>
              <div style={styles.statLabel}>Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={styles.filters}>
        <div style={styles.filterRow} className="filter-row">
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Location</label>
            <select style={styles.filterInput} value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})}>
              <option value="">All Locations</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc.toLowerCase().replace(/\s+/g, '-')}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Price Range</label>
            <select style={styles.filterInput} value={filters.priceRange} onChange={(e) => setFilters({...filters, priceRange: e.target.value})}>
              <option value="">All Prices</option>
              <option value="0-50">₹0 - ₹50 Lakhs</option>
              <option value="50-100">₹50 - ₹100 Lakhs</option>
              <option value="100-200">₹100 - ₹200 Lakhs</option>
              <option value="200+">₹200+ Lakhs</option>
            </select>
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Plot Size</label>
            <select style={styles.filterInput} value={filters.size} onChange={(e) => setFilters({...filters, size: e.target.value})}>
              <option value="">All Sizes</option>
              <option value="100-300">100-300 Sq Yards</option>
              <option value="300-500">300-500 Sq Yards</option>
              <option value="500-1000">500-1000 Sq Yards</option>
              <option value="1000+">1000+ Sq Yards</option>
            </select>
          </div>
          <div style={styles.filterGroup}>
            <button style={styles.filterBtn} onClick={filterProperties}>🔍 Search Properties</button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section style={styles.propertiesContainer}>
        <div style={styles.propertiesGrid} className="properties-grid">
          {loading ? (
            <div style={styles.loading}>
              <div style={styles.spinner}></div>
            </div>
          ) : error ? (
            <div style={styles.errorMessage}>{error}</div>
          ) : properties.length === 0 ? (
            <div style={styles.noProperties}>No properties found matching your criteria.</div>
          ) : (
            properties.map((prop, index) => (
              <div key={prop.id || prop._id} style={styles.propertyCard}>
                <div style={styles.propertyImage}>
                  {prop.image && prop.image.length > 0 ? (
                    <img src={prop.image[0]} alt="Plot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    "🏡"
                  )}
                  <span style={{ ...styles.propertyBadge, ...(prop.status === 'Available' ? styles.badgeAvailable : styles.badgeSold) }}>
                    {prop.status === 'Available' ? '✅ Available' : '❌ Sold'}
                  </span>
                  <button style={{ ...styles.heartBtn, ...(prop.preferred ? styles.heartBtnActive : {}) }} onClick={() => toggleHeart(prop.id || prop._id, prop.preferred)}>
                    ❤️
                  </button>
                </div>
                <div style={styles.propertyDetails}>
                  <h3 style={styles.propertyTitle}>{prop.title || `Premium Plot - ${prop.locality}`}</h3>
                  <div style={styles.propertyLocation}>
                    📍 {prop.locality || 'Gurgaon'}
                  </div>
                  <div style={styles.propertySpecs}>
                    <div style={styles.spec}>
                      <div style={styles.specValue}>{prop.area || '500'}</div>
                      <div style={styles.specLabel}>Sq Yards</div>
                    </div>
                    <div style={styles.spec}>
                      <div style={styles.specValue}>{prop.facing || 'N/A'}</div>
                      <div style={styles.specLabel}>Facing</div>
                    </div>
                    <div style={styles.spec}>
                      <div style={styles.specValue}>{prop.type || 'Residential'}</div>
                      <div style={styles.specLabel}>Type</div>
                    </div>
                  </div>
                  <div style={styles.propertyPrice}>₹{prop.price || '75'} Lakhs</div>
                  <div style={styles.propertyActions}>
                    <button style={styles.btnPrimary} onClick={() => viewDetails(prop.id || prop._id)}>View Details</button>
                    <button style={styles.btnWhatsapp} onClick={() => contactWhatsApp(prop.id || prop._id)}>
                      📱 WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modal for Property Details */}
      {showModal && selectedPlot && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button onClick={() => setShowModal(false)} style={styles.modalClose}>×</button>
            <h2 style={{ marginTop: 0, fontSize: '1.5rem' }}>{selectedPlot.title || `Premium Plot - ${selectedPlot.locality}`}</h2>
            <p><strong>Locality:</strong> {selectedPlot.locality}</p>
            <p><strong>Address:</strong> {selectedPlot.address}</p>
            <p><strong>Size:</strong> {selectedPlot.area || 'N/A'} Sq Yards</p>
            {/* <p><strong>Facing:</strong> {selectedPlot.facing || 'N/A'}</p> */}
            <p><strong>Type:</strong> {selectedPlot.type || 'Residential'}</p>
            <p><strong>Price:</strong> ₹{selectedPlot.price} Lakhs</p>
            <p><strong>Price Per SqFt:</strong> ₹{selectedPlot.pricePerSqFt}</p>
            <p><strong>Status:</strong> {selectedPlot.status}</p>
           
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>ShineOneEstate</h3>
            <p>Helping you find premium residential properties in high-growth locations with great connectivity and future potential.</p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <ul style={styles.footerList}>
              <li><a href="#home" style={styles.footerLink}>Home</a></li>
              <li><a href="#properties" style={styles.footerLink}>Properties</a></li>
              <li><a href="#calculator" style={styles.footerLink}>Price Calculator</a></li>
              <li><a href="#about" style={styles.footerLink}>About Us</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Locations</h3>
            <ul style={styles.footerList}>
              <li><a href="#" style={styles.footerLink}>Sector 92 Gurgaon</a></li>
              <li><a href="#" style={styles.footerLink}>Sector 93 Gurgaon</a></li>
              <li><a href="#" style={styles.footerLink}>Sector 94 Gurgaon</a></li>
              <li><a href="#" style={styles.footerLink}>Sector 95 Gurgaon</a></li>
              <li><a href="#" style={styles.footerLink}>Sohna Road</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Contact Info</h3>
            <p>📞 +91 9310994032</p>
            <p>✉️ ShineOneEstate@gmail.com</p>
            <p>📍 Gurgaon, Haryana</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; 2024 ShineOneEstate. All rights reserved.</p>
        </div>
      </footer>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* Mobile Styles */
          @media (max-width: 768px) {
            .mobile-menu-btn {
              display: block !important;
            }
            
            .nav-links {
              display: none !important;
            }
            
            .mobile-nav-links {
              display: flex !important;
            }
            
            .hero-title {
              font-size: 2rem !important;
            }
            
            .hero-stats {
              flex-direction: column !important;
              gap: 1rem !important;
            }
            
            .filter-row {
              flex-direction: column !important;
            }
            
            .properties-grid {
              grid-template-columns: 1fr !important;
            }
          }
          
          /* Tablet Styles */
          @media (max-width: 1024px) and (min-width: 769px) {
            .properties-grid {
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
            }
          }
          
          /* Small Mobile Styles */
          @media (max-width: 480px) {
            .hero-title {
              font-size: 1.5rem !important;
            }
            
            .hero-stats {
              gap: 0.5rem !important;
            }
            
            .properties-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            .filter-row {
              gap: 0.5rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ShineOneEstate;
