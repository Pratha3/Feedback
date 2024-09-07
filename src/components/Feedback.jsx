import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Feedback() {
  let [feedback, setFeedback] = useState({});
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
    setFeedback({});
    setStar(0);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <form method="post" onSubmit={handleSubmit}>
          <h1>Give Your Feedback</h1>
          <div>
            {[1, 2, 3, 4, 5].map((v, i) => (
              <FaStar
                key={i}
                color={star >= v ? "yellow" : "gray"}
                onMouseEnter={() => handleStar(v)}
              />
            ))}
          </div>
          <br />
          <br />
          <textarea
            name="feedback"
            value={feedback.feedback || ""}
            placeholder="Write your feedback"
            onChange={handleChange}
          ></textarea>
          <br />
          <br />
          <button type="submit">Submit Feedback</button>
        </form>

        <h2>Feedbacks Received:</h2>
        {listFeedback.length > 0 ? (
          <table border="1" align="center">
            <thead>
              <tr>
                <th>Rating (Stars)</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {listFeedback.map((fb, index) => (
                <tr key={index}>
                  <td>
                    {[1, 2, 3, 4, 5].map((v) => (
                      <FaStar
                        key={v}
                        color={fb.star >= v ? "yellow" : "gray"}
                      />
                    ))}
                  </td>
                  <td>{fb.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No feedback received yet.</p>
        )}
      </div>
    </div>
  );
}

export default Feedback;
