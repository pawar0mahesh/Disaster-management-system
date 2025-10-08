import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container-fluid px-0">
      {/* Hero Section with Background */}
      <section className="hero-section bg-gradient-to-r from-blue-900 via-blue-700 to-purple-800 text-white py-5">
        <div className="container">
          <div className="row align-items-center min-vh-50 py-5">
            <div className="col-lg-8 mx-auto text-center">
              <div className="hero-content">
                <h1 className="display-4 fw-bold mb-4">
                  Disaster Management Uttarakhand
                </h1>
                <p className="lead fs-5 mb-4 opacity-90">
                  Real-time alerts, risk maps, and emergency resources for locals, trekkers, and tourists. 
                  Stay safe with our comprehensive disaster management platform.
                </p>
                
                {/* Emergency Quick Actions */}
                <div className="emergency-alert mb-4 p-3 bg-red-600 rounded-3 animate-pulse">
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <strong>Emergency Alert System Active</strong>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
                  <Link to="/dashboard" className="btn btn-light btn-lg px-4 py-3 fw-semibold">
                    <i className="fas fa-tachometer-alt me-2"></i>
                    Go to Dashboard
                  </Link>
                  <Link to="/report" className="btn btn-danger btn-lg px-4 py-3 fw-semibold">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    Submit Emergency Report
                  </Link>
                  <Link to="/dashboard" className="btn btn-warning btn-lg px-4 py-3 fw-semibold">
                    <i className="fas fa-bell me-2"></i>
                    View Alerts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-4 bg-light">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <h3 className="text-primary fw-bold mb-1">24/7</h3>
                <p className="text-muted small">Monitoring</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <h3 className="text-success fw-bold mb-1">500+</h3>
                <p className="text-muted small">Alerts Sent</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <h3 className="text-warning fw-bold mb-1">50+</h3>
                <p className="text-muted small">Resources</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <h3 className="text-danger fw-bold mb-1">10k+</h3>
                <p className="text-muted small">Users Protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title fw-bold text-dark mb-3">Key Features</h2>
            <p className="section-subtitle text-muted fs-5">
              Comprehensive disaster management tools to keep you safe
            </p>
          </div>


        
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="feature-card card h-100 border-0 shadow-lg hover-shadow">
                <div className="card-body text-center p-4">
                 <Link to={"/dashboard"}>
                  <div className="feature-icon bg-primary bg-gradient rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                    <i className="fas fa-bell text-white fs-4"></i>
                  </div>
                 </Link>
                 
                  <h5 className="card-title fw-semibold">Real-time Alerts</h5>
                  <p className="card-text text-muted">
                    Receive instant notifications for floods, landslides, cloudbursts, and avalanches with location-specific warnings.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card card h-100 border-0 shadow-lg hover-shadow">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-success bg-gradient rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                    <i className="fas fa-map-marked-alt text-white fs-4"></i>
                  </div>
                  <h5 className="card-title fw-semibold">Risk Heatmaps</h5>
                  <p className="card-text text-muted">
                    Visualize landslide and flood-prone areas using interactive heatmaps and real-time GIS data.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card card h-100 border-0 shadow-lg hover-shadow">
                <div className="card-body text-center p-4">
                 
                 <Link to={"/resourcelist"}>
                  <div className="feature-icon bg-warning bg-gradient rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                    <i className="fas fa-hospital text-white fs-4"></i>
                  </div>
                 </Link>
                 
                  <h5 className="card-title fw-semibold">Nearest Resources</h5>
                  <p className="card-text text-muted">
                    Locate nearby hospitals, shelters, rescue centers, and emergency contacts with directions.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Feature Cards */}
            <div className="col-md-6 col-lg-4">
              <div className="feature-card card h-100 border-0 shadow-lg hover-shadow">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-info bg-gradient rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                    <i className="fas fa-satellite text-white fs-4"></i>
                  </div>
                  <h5 className="card-title fw-semibold">Offline Alerts</h5>
                  <p className="card-text text-muted">
                    Satellite-based notifications in multiple languages even when network is unavailable.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card card h-100 border-0 shadow-lg hover-shadow">
                <div className="card-body text-center p-4">
                  
                  <Link to={"/report"}>
                  <div className="feature-icon bg-danger bg-gradient rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                    <i className="fas fa-users text-white fs-4"></i>
                  </div>
                  </Link>
                  
                  <h5 className="card-title fw-semibold">Community Reports</h5>
                  <p className="card-text text-muted">
                    Share and verify incidents with community-driven reporting system.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card card h-100 border-0 shadow-lg hover-shadow">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-secondary bg-gradient rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                    <i className="fas fa-robot text-white fs-4"></i>
                  </div>
                  <h5 className="card-title fw-semibold">AI Predictions</h5>
                  <p className="card-text text-muted">
                    Advanced AI models for flood and landslide predictions with high accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Preparedness Section */}
      <section className="emergency-section py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h3 className="fw-bold mb-4">Emergency Preparedness Guide</h3>
              <div className="emergency-tips">
                <div className="tip-item d-flex mb-3">
                  <i className="fas fa-check-circle text-success me-3 mt-1"></i>
                  <div>
                    <h6 className="fw-semibold">Know Your Evacuation Routes</h6>
                    <p className="text-muted mb-0">Identify safe exit paths from your location</p>
                  </div>
                </div>
                <div className="tip-item d-flex mb-3">
                  <i className="fas fa-check-circle text-success me-3 mt-1"></i>
                  <div>
                    <h6 className="fw-semibold">Emergency Kit Ready</h6>
                    <p className="text-muted mb-0">Keep essentials like water, food, and first aid</p>
                  </div>
                </div>
                <div className="tip-item d-flex mb-3">
                  <i className="fas fa-check-circle text-success me-3 mt-1"></i>
                  <div>
                    <h6 className="fw-semibold">Stay Informed</h6>
                    <p className="text-muted mb-0">Regularly check for weather updates and alerts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4">
                  <h5 className="card-title fw-semibold mb-3">Quick Emergency Contacts</h5>
                  <div className="contact-list">
                    <div className="contact-item d-flex justify-content-between align-items-center py-2 border-bottom">
                      <span>Emergency Rescue</span>
                      <strong className="text-danger">108</strong>
                    </div>
                    <div className="contact-item d-flex justify-content-between align-items-center py-2 border-bottom">
                      <span>Disaster Control Room</span>
                      <strong className="text-danger">1070</strong>
                    </div>
                    <div className="contact-item d-flex justify-content-between align-items-center py-2 border-bottom">
                      <span>Police</span>
                      <strong className="text-danger">100</strong>
                    </div>
                    <div className="contact-item d-flex justify-content-between align-items-center py-2">
                      <span>Ambulance</span>
                      <strong className="text-danger">102</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Enhancements */}
      <section className="future-section py-5 bg-dark text-white">
        <div className="container">
          <h3 className="text-center fw-bold mb-5">Future Enhancements</h3>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="future-item text-center p-3">
                <i className="fas fa-brain fa-2x mb-3 text-primary"></i>
                <h6>AI-based Predictions</h6>
                <p className="small opacity-75">Advanced machine learning for accurate disaster forecasting</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="future-item text-center p-3">
                <i className="fas fa-drone fa-2x mb-3 text-success"></i>
                <h6>Drone Integration</h6>
                <p className="small opacity-75">Aerial surveillance and rescue support</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="future-item text-center p-3">
                <i className="fas fa-sensor fa-2x mb-3 text-warning"></i>
                <h6>IoT Sensors</h6>
                <p className="small opacity-75">Real-time rainfall and soil monitoring</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="future-item text-center p-3">
                <i className="fas fa-users-cog fa-2x mb-3 text-info"></i>
                <h6>Community Reporting</h6>
                <p className="small opacity-75">Crowdsourced incident verification</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="future-item text-center p-3">
                <i className="fas fa-network-wired fa-2x mb-3 text-danger"></i>
                <h6>National Integration</h6>
                <p className="small opacity-75">Connect with national disaster systems</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="future-item text-center p-3">
                <i className="fas mobile-alt fa-2x mb-3 text-secondary"></i>
                <h6>Mobile App</h6>
                <p className="small opacity-75">Dedicated mobile application</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">&copy; 2024 Disaster Management Uttarakhand. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-links">
                <Link to="/privacy" className="text-white text-decoration-none me-3">Privacy Policy</Link>
                <Link to="/terms" className="text-white text-decoration-none me-3">Terms of Service</Link>
                <Link to="/contact" className="text-white text-decoration-none">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Add this CSS for hover effects and animations */}
      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }
        .min-vh-50 {
          min-height: 50vh;
        }
        .feature-icon {
          width: 70px;
          height: 70px;
        }
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        .emergency-alert {
          max-width: 400px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}