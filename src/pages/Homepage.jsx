import React from "react";
import { Link } from "react-router";

function Homepage({ user }) {
  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.title}>Student Task Manager</h1>

        <p style={styles.text}>
          A simple app to help students keep track of their tasks, stay
          organized, and manage what they need to get done.
        </p>
        {user ? (
          <p>Hi, <b>{user.username}</b>!</p>
        ) : (
          <div style={styles.buttonRow}>
            <Link style={styles.signUpBtn} to="/sign-up">
              Sign up
            </Link>
            <Link style={styles.signInBtn} to="/sign-in">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "90vh",
    backgroundColor: "#f5efe6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  box: {
    backgroundColor: "#fff7d6",
    padding: "40px",
    borderRadius: "18px",
    textAlign: "center",
    maxWidth: "700px",
    width: "100%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  title: {
    color: "#1f1f1f",
    fontSize: "40px",
    marginBottom: "14px",
  },
  text: {
    color: "#444",
    fontSize: "17px",
    lineHeight: "1.6",
    marginBottom: "25px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
  signUpBtn: {
    textDecoration: "none",
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    padding: "12px 18px",
    borderRadius: "10px",
  },
  signInBtn: {
    textDecoration: "none",
    backgroundColor: "#f6e7b2",
    color: "#1f1f1f",
    padding: "12px 18px",
    borderRadius: "10px",
  },
};

export default Homepage;
