import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api'; // make sure this path matches your api.js
import WeatherWidget from "../components/WeatherWidget";
import SatelliteMap from "../components/SatelliteMap";




export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [location, setLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [resources, setResources] = useState([]);

  // Example riskZones (can be replaced with API later)
  const riskZones = [
    { location: 'Rishikesh', risk: 'High', type: 'Flood' },
    { location: 'Chamoli', risk: 'Medium', type: 'Landslide' },
    { location: 'Uttarkashi', risk: 'High', type: 'Cloudburst' },
    { location: 'Dehradun', risk: 'Low', type: 'Earthquake' },
  ];

  // Function to fetch alerts
const fetchAlerts = async () => {
  try {
    const res = await API.get('/reports'); // GET /api/reports
    setAlerts(res.data);
  } catch (err) {
    console.error('Error fetching alerts:', err);
  }
};

  // Function to fetch resources
  const fetchResources = async () => {
    try {
      const res = await API.get('/resources'); // GET /api/resources
      setResources(res.data);
    } catch (err) {
      console.error('Error fetching resources:', err);
    }
  };

  // Fetch alerts and resources on mount
  useEffect(() => {
    fetchAlerts();
    fetchResources();

    // Poll for new alerts every 10 seconds
    const interval = setInterval(fetchAlerts, 10000);

    return () => clearInterval(interval);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'secondary';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'bg-danger';
      case 'Medium': return 'bg-warning';
      case 'Low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row align-items-center py-3 bg-light border-bottom">
        <div className="col">
          <h1 className="h3 mb-0 text-dark">
            <i className="fas fa-tachometer-alt me-2 text-primary"></i>
            Disaster Dashboard
          </h1>
        </div>
        <div className="col-auto">
          <div className="d-flex gap-2">
            <Link to="/report" className="btn btn-danger btn-sm">
              <i className="fas fa-exclamation-circle me-1"></i>
              Report Emergency
            </Link>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={fetchAlerts} // manual refresh button
            >
              <i className="fas fa-sync-alt me-1"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>

      
    <div>
      {/* <h1 className="text-2xl font-bold mb-4">Weather in your area</h1> */}
      <WeatherWidget />
    </div>
    <div style={{ height: "250px", width: "100%", borderRadius: "12px", overflow: "hidden" }}>
  <SatelliteMap />
</div>
      



 

  
      <div className="row g-4 mt-2">
        {/* Left Sidebar - Quick Stats */}
        <div className="col-lg-3">
          {/* Location Card */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center">
                <i className="fas fa-location-arrow text-primary me-2"></i>
                Your Location
              </h6>
              {location ? (
                <p className="text-success mb-0">
                  <i className="fas fa-check-circle me-1"></i>
                  Location Access Granted
                </p>
              ) : (
                <p className="text-warning mb-0">
                  <i className="fas fa-exclamation-triangle me-1"></i>
                  Enable Location for Better Alerts
                </p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h6 className="card-title mb-3">Quick Stats</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Active Alerts</span>
                <span className="badge bg-danger">{alerts.length}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Resources Nearby</span>
                <span className="badge bg-success">{resources.length}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Risk Zones</span>
                <span className="badge bg-warning">{riskZones.length}</span>
              </div>
            </div>
          </div>

          {/* Risk Zones */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-title mb-3">Risk Zones</h6>
              {riskZones.map((zone, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 rounded bg-light">
                  <div>
                    <div className="fw-semibold">{zone.location}</div>
                    <small className="text-muted">{zone.type}</small>
                  </div>
                  <span className={`badge ${getRiskColor(zone.risk)}`}>
                    {zone.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          {/* Alert Summary */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="text-center p-3 rounded bg-danger bg-opacity-10">
                    <i className="fas fa-exclamation-triangle fa-2x text-danger mb-2"></i>
                    <h5 className="text-danger">{alerts.filter(a => a.severity === 'High').length}</h5>
                    <small className="text-muted">High Alerts</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 rounded bg-warning bg-opacity-10">
                    <i className="fas fa-exclamation-circle fa-2x text-warning mb-2"></i>
                    <h5 className="text-warning">{alerts.filter(a => a.severity === 'Medium').length}</h5>
                    <small className="text-muted">Medium Alerts</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 rounded bg-info bg-opacity-10">
                    <i className="fas fa-info-circle fa-2x text-info mb-2"></i>
                    <h5 className="text-info">{alerts.filter(a => a.severity === 'Low').length}</h5>
                    <small className="text-muted">Low Alerts</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 rounded bg-success bg-opacity-10">
                    <i className="fas fa-shield-alt fa-2x text-success mb-2"></i>
                    <h5 className="text-success">{resources.length}</h5>
                    <small className="text-muted">Resources</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {alerts.map((report) => (
            <div key={report._id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="text-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {report.type}
                </h5>

                <p>
                  <strong>Severity:</strong>{' '}
                  <span className={`badge bg-${getSeverityColor(report.severity)}`}>
                    {report.severity}
                  </span>
                </p>

                <p><strong>Description:</strong> {report.description}</p>

                {report.photos && report.photos.length > 0 && (
                  <div className="mt-3">
                    <h6 className="fw-semibold text-primary mb-2">
                      <i className="fas fa-images me-2"></i>
                      Uploaded Photos
                    </h6>
                    <div className="d-flex flex-wrap gap-3">
                      {report.photos.map((photo, i) => (
                        <div key={i} className="text-center">
                          <img
                            src={`http://localhost:5000/uploads/${photo}`}
                    
                            alt="Report"
                            style={{
                              width: '120px',
                              height: '120px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1px solid #ccc'
                            }}
                          />
                          <div className="small text-muted mt-1">
                            <i className="fas fa-map-marker-alt text-danger me-1"></i>
                            {report.location?.coordinates
                              ? `${report.location.coordinates[1]}, ${report.location.coordinates[0]}`
                              : 'Location not available'}
                          </div>
                        </div>
                      ))}
                      
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          

        </div>
      </div>
    </div>
  );
  
}
