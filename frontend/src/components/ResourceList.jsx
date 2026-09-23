import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHospital,
  FaHome,
  FaShieldAlt,
  FaLifeRing,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBed,
  FaUsers,
} from "react-icons/fa";

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("http://172.16.13.40:5000/api/resources");
        setResources(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch resources");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case "Hospital":
        return <FaHospital className="text-danger fs-3" />;
      case "Shelter":
        return <FaHome className="text-warning fs-3" />;
      case "Police Station":
        return <FaShieldAlt className="text-primary fs-3" />;
      case "Rescue Center":
        return <FaLifeRing className="text-success fs-3" />;
      default:
        return <FaLifeRing className="text-secondary fs-3" />;
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-danger fw-semibold">
        {error}
      </div>
    );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold text-primary">
        🏥 Available Emergency Resources
      </h1>

      {resources.length === 0 ? (
        <p className="text-center text-muted">No resources available.</p>
      ) : (
        <div className="row g-4">
          {resources.map((r) => (
            <div key={r._id} className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm h-100 border-0 rounded-4">
             <div className="card-body">
            <div className="d-flex align-items-center mb-3">
                 <div className="me-3">{getTypeIcon(r.type)}</div>
              <div>
                    <h5 className="card-title mb-1 fw-bold">{r.name}</h5>
                      <span
                       className={`badge text-bg-${
                         r.type === "Hospital"
                            ? "danger"
                            : r.type === "Shelter"
                            ? "warning"
                            : r.type === "Police Station"
                            ? "primary"
                            : "success"
                        }`}
                      >
                        {r.type}
                      </span>
                    </div>
                  </div>

                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                     <FaMapMarkerAlt className="me-2 text-primary" />
                     <strong>Address:</strong> {r.address || "Not available"}
                    </li>
                   <li className="mb-2">
                     <FaPhoneAlt className="me-2 text-success" />
                      <strong>Contact:</strong> {r.contact || "N/A"}
                  </li>
                   <li className="mb-2">
                     <FaBed className="me-2 text-info" />
                      <strong>Beds:</strong> {r.availableBeds}
                   </li>
                    <li>
                     <FaUsers className="me-2 text-secondary" />
                     <strong>Rescue Teams:</strong> {r.availableRescueTeams}
                 </li>
                  </ul>
             </div>
             </div>
            </div>
          ))}
       </div>
      )}
    </div>
  );
};

export default ResourceList;
