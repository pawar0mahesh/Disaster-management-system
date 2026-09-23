import { Link, useLocation } from 'react-router-dom';
import AlertSiren from './AlertSiren';

export default function Navbar() {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand Logo with Icon */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <i className="fas fa-shield-alt me-2 fs-4"></i>
          <span>Disaster Management</span>
          <small className="ms-2 badge bg-light text-primary fs-6">Uttarakhand</small>
        </Link>

       
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-1">
              <Link 
                className={`nav-link d-flex align-items-center ${isActiveLink('/')}`} 
                to="/"
              >
                <i className="fas fa-home me-2"></i>
                Home
                {isActiveLink('/') && <span className="visually-hidden">(current)</span>}
              </Link>
            </li>
            
            <li className="nav-item mx-1">
              <Link 
                className={`nav-link d-flex align-items-center ${isActiveLink('/dashboard')}`} 
                to="/dashboard"
              >
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard
                {isActiveLink('/dashboard') && <span className="visually-hidden">(current)</span>}
              </Link>
            </li>
            
            <li className="nav-item mx-1">
              <Link 
                className={`nav-link d-flex align-items-center ${isActiveLink('/report')}`} 
                to="/report"
              >
                <i className="fas fa-exclamation-circle me-2"></i>
                Emergency Report
                {isActiveLink('/report') && <span className="visually-hidden">(current)</span>}
              </Link>
            </li>

          
            <li className="nav-item mx-1">
              <div className="nav-link">
                <span className="badge bg-danger bg-gradient animate-pulse">
                  <i className="fas fa-bell me-1"></i>
                  Live Alerts
                </span>
                
              </div>
              <li className="nav-item mx-1">
      <AlertSiren />
    </li>
            </li>
          
          </ul>

         
          <div className="d-flex align-items-center ms-lg-3 mt-2 mt-lg-0">
         
            <div className="dropdown me-2">
              <button 
                className="btn btn-outline-light btn-sm dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-language me-1"></i>
                EN
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">English</a></li>
                <li><a className="dropdown-item" href="#">Hindi</a></li>
                <li><a className="dropdown-item" href="#">Garhwali</a></li>
                <li><a className="dropdown-item" href="#">Kumaoni</a></li>
              </ul>
            </div>

            <Link to="/report" className="btn btn-danger btn-sm">
              <i className="fas fa-phone-alt me-1"></i>
              Emergency Help
            </Link>
          </div>
        </div>
      </div>


      <style jsx>{`
        .nav-link.active {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          font-weight: 600;
        }
        .nav-link:hover:not(.active) {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
        }
        .navbar-brand {
          font-size: 1.4rem;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </nav>
  );
}