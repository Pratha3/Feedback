import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Feedback() {
  let [feedback, setFeedback] = useState({ name: "", email: "", feedback: "" });
  let [star, setStar] = useState(0);
  let [listFeedback, setListFeedback] = useState([]);

  let handleStar = (value) => {
    let feed = { ...feedback, star: value };
    setFeedback(feed);
    setStar(value);
  };

  let handleChange = (e) => {
    let feed = { ...feedback, [e.target.name]: e.target.value };
    setFeedback(feed);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setListFeedback([...listFeedback, feedback]);
    setFeedback({ name: "", email: "", feedback: "" });
    setStar(0);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <h2 className="text-center mb-4">Give Your Feedback</h2>

            {/* Name Field */}
            <div className="form-group mb-3">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={feedback.name}
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={feedback.email}
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            {/* Star Rating */}
            <div className="form-group mb-3 text-center">
              <label>Rate Us:</label>
              <div className="mt-2">
                {[1, 2, 3, 4, 5].map((v, i) => (
                  <FaStar
                    key={i}
                    color={star >= v ? "yellow" : "gray"}
                    size={30}
                    onMouseEnter={() => handleStar(v)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>

            {/* Feedback Message */}
            <div className="form-group mb-3">
              <label>Feedback:</label>
              <textarea
                className="form-control"
                name="feedback"
                value={feedback.feedback}
                placeholder="Write your feedback"
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>

      <h2 className="text-center mt-5">Feedbacks Received:</h2>

      {/* Feedback Cards */}
      {listFeedback.length > 0 ? (
        <div className="row mt-4">
          {listFeedback.map((fb, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h4 className="card-title">{fb.name}</h4>
                  <p className="card-text">{fb.email}</p>
                  <div className="mb-3">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <FaStar
                        key={v}
                        color={fb.star >= v ? "yellow" : "gray"}
                      />
                    ))}
                  </div>
                  <p className="card-text">Feedback: {fb.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-3">No feedback received yet.</p>
      )}
    </div>
  );
}

export default Feedback;
