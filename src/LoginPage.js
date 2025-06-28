import React from 'react';

const styles = {
  container: {
    maxWidth: '300px',
    margin: '100px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    width: '90%',
    padding: '10px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '95%',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

function LoginPage() {
  // For button hover effect, we can use state:
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" style={styles.input} /><br />
      <input type="password" placeholder="Password" style={styles.input} /><br />
      <button
        style={isHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;
