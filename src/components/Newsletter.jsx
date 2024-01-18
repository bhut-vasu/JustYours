import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      email: email,
    };
    if (!values.email.trim()) {
      toast.warning("Empty Fields!");
      return false;
    }

    await fetch("https://just-yours-server.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((user) => {
        setEmail("");
        toast.success("Subscribed to Newsletter");
      })
      .catch((err) => {
        setEmail("");
        toast.error(err.remarks);
        toast.error("Opps!! Server is down. We are working on it.");
      });
  };

  return (
    <>
      <div style={{fontSize: "15px", fontWeight: "normal"}}>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      <div className="news">
        <div className="news-text">
          <h2>Newsletter</h2>
          <form action="POST" name="contact-form" onSubmit={handleSubmit}>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              value={email}
              style={{
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "5px",
              }}
              type="email"
              placeholder="info@justyours.com"
            />
            <button
              style={{
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "5px",
              }}
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Newsletter;
