import { useState } from "react";
import * as Yup from "yup";
import "../App.css";

const FormWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    location: "",
    event_type: "",
    event_category: "",
    event_description: "",
    eventDate: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("First name is required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    contactNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required(),
    location: Yup.string().required("Location is required"),
    event_type: Yup.string().required("Event type is required"),
    event_category: Yup.string().required("Event category is required"),
    event_description: Yup.string()
      .min(20, "Description must be at least 20 characters")
      .required("Description is required"),
    eventDate: Yup.date().required("Date of event is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="modal">
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-desc">Organise an Event!🤘</h1>
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-block">
                <label className="input-label">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="Enter your first name"
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <div className="error">{errors.firstName}</div>
                )}
              </div>
              <div className="input-block">
                <label className="input-label">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Enter your last name"
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <div className="error">{errors.lastName}</div>
                )}
              </div>
              <div className="input-block">
                <label className="input-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="input-block">
                <label className="input-label">Contact Number:</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                />
                {errors.contactNumber && (
                  <div className="error">{errors.contactNumber}</div>
                )}
              </div>
              <div className="input-block">
                <label className="input-label">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder="Enter your location"
                  onChange={handleChange}
                />
                {errors.location && (
                  <div className="error">{errors.location}</div>
                )}
              </div>
              <div className="input-block">
                <label className="input-label">Event Type:</label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="virtual">Virtual</option>
                  <option value="offline">Offline</option>
                </select>
                {errors.event_type && (
                  <div className="error">{errors.event_type}</div>
                )}
              </div>
              <div className="input-block">
                <label className="input-label">Event Category:</label>
                <select
                  name="event_category"
                  value={formData.event_category}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Celebration">Celebration</option>
                  <option value="EDM Party">EDM Party</option>
                  <option value="Shows">Shows</option>
                  <option value="Sports">Sports</option>
                </select>
                {errors.event_category && (
                  <div className="error">{errors.event_category}</div>
                )}
              </div>
              <div className="input-block">
                <label className="input-label">Event Description:</label>
                <input
                  type="text"
                  name="event_description"
                  value={formData.event_description}
                  placeholder="Enter event description"
                  onChange={handleChange}
                />
                {errors.event_description && (
                  <div className="error">{errors.event_description}</div>
                )}
              </div>
              <div className="input-block">
                <label className="input-label">Date of Event:</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                />
                {errors.eventDate && (
                  <div className="error">{errors.eventDate}</div>
                )}
              </div>
              <button className="input-button" type="submit">
                Organise
              </button>
            </form>
            <div className="accept-terms">
              <input type="checkbox" id="accept-terms-checkbox" />
              <label htmlFor="accept-terms-checkbox">
                I accept the <span className="highlight">Terms of Use</span>{" "}
                & <span className="highlight">Privacy Policy</span>
              </label>
            </div>

          </div>
          <div className="modal-right">
            <img
              src="https://plus.unsplash.com/premium_photo-1661286678499-211423a9ff5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQxfHxkYW5jZSUyMGZlc3RpdmFsfGVufDB8fDB8fHww"alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWithYup;
