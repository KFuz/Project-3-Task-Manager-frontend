import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function SignIn({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`, formData);
      const token = response.data.token;

      const userInfo = JSON.parse(atob(token.split('.')[1])).payload;
      setUser(userInfo);
      localStorage.setItem('token', token);

      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.response?.data?.err || 'An error occurred during sign in');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.title}>Sign In</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              style={styles.input}
              id="username"
              name="username"
              type="text"
              value={formData.username.toLowerCase()}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              style={styles.input}
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Sign In</button>
        </form>

        {errorMessage && (
          <p style={styles.error} role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '90vh',
    backgroundColor: '#f5efe6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  box: {
    backgroundColor: '#fff7d6',
    padding: '35px',
    borderRadius: '18px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  title: {
    marginBottom: '25px',
    color: '#1f1f1f',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#1f1f1f',
    fontWeight: '500',
  },
  input: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #d8cba7',
    backgroundColor: '#ffffff',
    color: '#1f1f1f',
    outline: 'none',
  },
  button: {
    backgroundColor: '#1f1f1f',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: {
    color: '#b00020',
    marginTop: '16px',
    textAlign: 'center',
  },
};

export default SignIn;