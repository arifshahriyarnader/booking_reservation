import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./forget.css";

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    console.log(email);
    fetch(`http://localhost:5000/api/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        alert(data.status);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="forgot-password">
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  id="email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
