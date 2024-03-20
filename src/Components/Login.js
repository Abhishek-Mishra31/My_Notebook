import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { showAlert } = props;
  const [details, setdetails] = useState({ email: "", password: "" });
  let url = "http://localhost:80/api/auth/login";
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    });  
    const json = await response.json();
    if (json.success) {
      // save the auth-token and redirect to note component
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Successfully Logged In", "success");
    } else {
      showAlert("Incorrect Email or Password", "danger");
    }
  };

  const onChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-5 login">
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={details.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChange}
              value={details.password}
            />
          </div>
          <button
            style={{ display: "flex", flexDirection: "column", margin: "auto" }}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
