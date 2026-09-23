import API from '../services/api'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Report() {
  const [formData, setFormData] = useState({
    incidentType: '',
    location: '',
    severity: '',
    description: '',
    emergencyContact: '',
    photos: null,
    anonymous: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const incidentTypes = [
    'Flood',
    'Landslide',
    'Cloudburst',
    'Avalanche',
    'Earthquake',
    'Forest Fire',
    'Road Accident',
    'Medical Emergency',
    'Other'
  ];

  const severityLevels = [
    { value: 'Low', label: 'Low', description: 'Minor incident, no immediate danger' },
    { value: 'Medium', label: 'Medium', description: 'Moderate risk, caution advised' },
    { value: 'High', label: 'High', description: 'Serious incident, immediate action needed' },
    { value: 'Critical', label: 'Critical', description: 'Life-threatening emergency' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files : value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    
    data.append('incidentType', formData.incidentType);
    data.append('severity', formData.severity);
    data.append('description', formData.description);
    data.append('emergencyContact', formData.emergencyContact || '');
    data.append('anonymous', formData.anonymous);

    
   if (formData.location) {
  data.append('location', formData.location.trim());
}


    if (formData.photos) {
      for (let i = 0; i < formData.photos.length; i++) {
        data.append('photos', formData.photos[i]);
      }
    }

    
    const response = await API.post('/reports', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

  console.log('Report submitted:', response.data);
setSubmitted(true);

s
if (props.onReportSubmit) props.onReportSubmit();

  } catch (err) {
   
    if (err.response) {
  
      console.error('Error response data:', err.response.data);
      console.error('Error response status:', err.response.status);
      console.error('Error response headers:', err.response.headers);
      alert(`Failed to submit: ${err.response.data.message || JSON.stringify(err.response.data)}`);
    } 
    else if (err.request) {
      
      console.error('No response received:', err.request);
      alert('Failed to submit: No response from server.');
    }
    //  else {
      // Something happened in setting up the request
    //   console.error('Error setting up request:', err.message);
    //   alert(`Failed to submit: ${err.message}`);
    // }
  }
};




const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          location: `${position.coords.latitude},${position.coords.longitude}` // no spaces
        }));
      },
      (error) => {
        alert('Unable to get current location. Please enter manually.');
      }
    );
  }
};


  if (submitted) {
    return (
      <div className="container-fluid py-5">
      <div className="row justify-content-center">
          <div className="col-lg-6">
          <div className="card border-0 shadow-lg text-center">
            <div className="card-body py-5">
                <div className="success-icon mb-4">
                  <i className="fas fa-check-circle text-success" style={{fontSize: '4rem'}}></i>
                </div>
                 <h2 className="text-success mb-3">Report Submitted Successfully!</h2>
                    <p className="text-muted mb-4">
                  Thank you for your report. Emergency services have been notified and will respond accordingly.
                 </p>
                <div className="alert alert-info mb-4">
                     <i className="fas fa-info-circle me-2"></i>
                  <strong>Important:</strong> Keep yourself safe and follow emergency protocols.
                </div>
                    <div className="d-flex gap-3 justify-content-center">
                  <Link to="/dashboard" className="btn btn-primary">
                    <i className="fas fa-tachometer-alt me-2"></i>
                    Go to Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setCurrentStep(1);
                      setFormData({
                        incidentType: '',
                        location: '',
                        severity: '',
                        description: '',
                        emergencyContact: '',
                        photos: null,
                        anonymous: false
                      });
                    }}
                    className="btn btn-outline-primary"
                  >
                    <i className="fas fa-plus me-2"></i>
                    Submit Another Report
                   </button>
                 </div>
              </div>
               </div>
          </div>
         </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
      
          <div className="text-center mb-5">
            <h1 className="h2 text-danger mb-3">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Emergency Report
            </h1>
            <p className="text-muted">
              Report any disaster incidents or emergencies. Your information helps save lives.
            </p>
          </div>

        
          <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="progress mb-3" style={{height: '8px'}}>
                <div 
                  className="progress-bar bg-primary" 
                 style={{width: `${(currentStep / 3) * 100}%`}}
                ></div>
              </div>
             <div className="d-flex justify-content-between">
                <span className={currentStep >= 1 ? 'text-primary fw-semibold' : 'text-muted'}>
                   <i className="fas fa-info-circle me-1"></i>
                 Incident Details
                </span>
               <span className={currentStep >= 2 ? 'text-primary fw-semibold' : 'text-muted'}>
                  <i className="fas fa-map-marker-alt me-1"></i>
                 Location
              </span>
                <span className={currentStep >= 3 ? 'text-primary fw-semibold' : 'text-muted'}>
                 <i className="fas fa-paper-plane me-1"></i>
                  Review & Submit
             </span>
                 </div>
            </div>
          </div>

  
          <div className="card border-0 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="card-body p-4">
             
                {currentStep === 1 && (
                  <div className="step-content">
                    <h4 className="mb-4 text-dark">
                      <i className="fas fa-info-circle text-primary me-2"></i>
                      Incident Details
                    </h4>
                    
                    <div className="row g-4">
                
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Incident Type <span className="text-danger">*</span>
                        </label>
                        <select
                          name="incidentType"
                          value={formData.incidentType}
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          <option value="">Select incident type</option>
                          {incidentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                     
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Severity Level <span className="text-danger">*</span>
                        </label>
                        <select
                          name="severity"
                          value={formData.severity}
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          <option value="">Select severity</option>
                          {severityLevels.map(level => (
                            <option key={level.value} value={level.value}>
                              {level.label} - {level.description}
                            </option>
                          ))}
                        </select>
                      </div>

                
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Description <span className="text-danger">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="form-control"
                          rows="4"
                          placeholder="Please provide detailed information about the incident..."
                          required
                        ></textarea>
                        <div className="form-text">
                          Include details like number of people affected, visible damages, and immediate risks.
                        </div>
                      </div>

                     
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Upload Photos (Optional)
                        </label>
                        <input
                          type="file"
                          name="photos"
                          onChange={handleChange}
                          className="form-control"
                          accept="image/*"
                          multiple
                        />
                      <div className="form-text">
                          Upload clear photos of the incident. Maximum 5 photos, 5MB each.
                         </div>
                    </div>
                       </div>
                  </div>
                )}

               
                {currentStep === 2 && (
                  <div className="step-content">
                    <h4 className="mb-4 text-dark">
                      <i className="fas fa-map-marker-alt text-primary me-2"></i>
                      Location & Contact
                    </h4>
                    
                    <div className="row g-4">
                      
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Location <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter exact location or coordinates"
                            required
                          />
                          <button
                            type="button"
                            onClick={getCurrentLocation}
                            className="btn btn-outline-primary"
                          >
                            <i className="fas fa-location-arrow me-1"></i>
                            Use Current
                          </button>
                        </div>
                        <div className="form-text">
                          Be as specific as possible. Include landmarks or GPS coordinates.
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Emergency Contact (Optional)
                        </label>
                        <input
                          type="tel"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Your phone number"
                        />
                        <div className="form-text">
                          For emergency services to contact you if needed.
                        </div>
                      </div>

                   
                      <div className="col-md-6">
                        <div className="form-check mt-4 pt-2">
                          <input
                            type="checkbox"
                            name="anonymous"
                            checked={formData.anonymous}
                            onChange={handleChange}
                            className="form-check-input"
                            id="anonymous"
                          />
                          <label className="form-check-label" htmlFor="anonymous">
                            Report Anonymously
                          </label>
                        </div>
                        <div className="form-text">
                          Your personal information will not be shared.
                        </div>
                      </div>

                    
                      <div className="col-12">
                        <div className="alert alert-warning">
                          <h6 className="alert-heading">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                           Emergency Safety Tips
                         </h6>
                         <ul className="mb-0 small">
                            <li>Ensure your own safety first before reporting</li>
                            <li>Move to a safe location if in immediate danger</li>
                            <li>Follow instructions from emergency services</li>
                            <li>Help others only if it's safe to do so</li>
                      </ul>
                    </div>
                  </div>
                    </div>
                  </div>
                )}

              
                {currentStep === 3 && (
                  <div className="step-content">
                    <h4 className="mb-4 text-dark">
                      <i className="fas fa-clipboard-check text-primary me-2"></i>
                      Review & Submit
                    </h4>
                    
                    <div className="card bg-light border-0 mb-4">
                       <div className="card-body">
                        <h6 className="card-title mb-3">Report Summary</h6>
                            <div className="row g-3">
                          <div className="col-md-6">
                              <strong>Incident Type:</strong>
                            <div>{formData.incidentType || 'Not specified'}</div>
                           </div>
                           <div className="col-md-6">
                              <strong>Severity:</strong>
                            <div>
                               {formData.severity ? (
                                <span className={`badge bg-${
                                  formData.severity === 'critical' ? 'danger' :
                                  formData.severity === 'high' ? 'warning' :
                                  formData.severity === 'medium' ? 'info' : 'success'
                                }`}>
                                  {formData.severity.toUpperCase()}
                                </span>
                              ) : 'Not specified'}
                            </div>
                            </div>
                          <div className="col-12">
                             <strong>Location:</strong>
                        <div>{formData.location || 'Not specified'}</div>
                          </div>
                          <div className="col-12">
                          <strong>Description:</strong>
                        <div>{formData.description || 'Not provided'}</div>
                          </div>
                          <div className="col-md-6">
                           <div>{formData.emergencyContact || 'Not provided'}</div>
                        </div>
                            <div className="col-md-6">
                         <strong>Reporting:</strong>
                            <div>{formData.anonymous ? 'Anonymous' : 'With Contact Info'}</div>
                        </div>
                       </div>
                       </div>
                    </div>

                   
                    <div className="alert alert-danger">
                      <h6 className="alert-heading">
                        <i className="fas fa-exclamation-circle me-2"></i>
                      Important Notice
                      </h6>
                      <p className="mb-2">
                   By submitting this report, you confirm that the information provided is accurate to the best of your knowledge.
                        False reporting may lead to legal consequences.
                      </p>
                     <p className="mb-0">
                        <strong>For immediate life-threatening emergencies, call 108 or your local emergency number.</strong>
                   </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="card-footer bg-white border-0 p-4">
                <div className="d-flex justify-content-between">
                <div>
                  {currentStep > 1 && (
                      <button
                        type="button"
                      onClick={handleBack}
                   className="btn btn-outline-secondary"
                     >
                        <i className="fas fa-arrow-left me-2"></i>
                       Back
                   </button>
                    )}
                </div>
                  <div>
                  {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn btn-primary"
                        disabled={
                          (currentStep === 1 && (!formData.incidentType || !formData.severity || !formData.description)) ||
                          (currentStep === 2 && !formData.location)
                        }
                      >
                        Next
                        <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-danger btn-lg"
                      >
                        <i className="fas fa-paper-plane me-2"></i>
                        Submit Emergency Report
                      </button>
                     )}
                  </div>
                  </div>
               </div>
             </form>
          </div>

       
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body text-center">
              <h6 className="card-title mb-3">Immediate Emergency Contacts</h6>
            <div className="row g-3">
           <div className="col-md-3">
                <button className="btn btn-outline-danger w-100">
               <i className="fas fa-ambulance me-2"></i>
              Ambulance: 102
                </button>
              </div>
              <div className="col-md-3">
            <button className="btn btn-outline-danger w-100">
              <i className="fas fa-fire me-2"></i>
                  Fire: 101
            </button>
              </div>
              <div className="col-md-3">
            <button className="btn btn-outline-danger w-100">
                  <i className="fas fa-shield-alt me-2"></i>
                  Police: 100
             </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-outline-danger w-100">
                  <i className="fas fa-life-ring me-2"></i>
              Rescue: 108
               </button>
                </div>
           </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}