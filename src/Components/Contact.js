import React, { useState } from "react";
import img from "../Gmail-logo.png";

export default function (props) {
  const { showAlert } = props;
  const url = "http://localhost:80/api/contact/sendContact";
  const [Data, setData] = useState({ name: "", email: "", review: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Data.name,
        email: Data.email,
        review: Data.review,
      }),
    });

    const json = await response.json();
    showAlert("Thanks For Your Feedback", "success");
    setData({ name: "", email: "", review: "" });
  };

  const onChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        Contact Us
      </h2>
      <div className="contact my-5">
        <div className="card" style={{ width: "38rem" }}>
          <img
            className="card-img-top contactImg"
            style={{ margin: "auto" }}
            src={img}
            alt="Card image cap"
          />
          <div className="card-body">
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1"></label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={Data.name}
                  onChange={onChange}
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1"></label>
                <input
                  type="email"
                  value={Data.email}
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={onChange}
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Email"
                />
              </div>

              <div className="form-group">
                <label for="exampleFormControlTextarea1"></label>
                <textarea
                  className="form-control"
                  id="review"
                  value={Data.review}
                  name="review"
                  onChange={onChange}
                  placeholder="Enter Your Review"
                  rows="7"
                ></textarea>
              </div>
              <button
                style={{ display: "flex", margin: "auto" }}
                onClick={onSubmit}
                className="btn btn-primary my-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
