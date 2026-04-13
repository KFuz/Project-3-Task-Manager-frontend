import { Link } from 'react-router'

function Navbar({ user, setUser }) {

  function logOut(){
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <div style={styles.navbar}>
      {/* Routes seen by everyone */}
      <Link style={styles.link} to='/'>Homepage</Link>

      {user ? (
        // Links for protected routes only for logged in users
        <>
          <Link style={styles.link} to='/dashboard'>Dashboard</Link>
          <span style={styles.username}>
            {user.username}
          </span>
          <button style={styles.logoutBtn} onClick={logOut}>Log Out</button>
        </>
      ) :
      (
        // links for not logged in users
        <>
          <Link style={styles.link} to='/sign-up'>Sign up</Link>
          <Link style={styles.link} to='/sign-in'>Sign in</Link>
        </>
      )
      }
    </div>
  )
}

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 20px',
    backgroundColor: '#fff7d6',
    borderBottom: '1px solid #e6d7a8',
  },
  link: {
    textDecoration: 'none',
    color: '#1f1f1f',
    fontWeight: '500',
  },
  username: {
    marginLeft: 'auto',
    color: '#444',
    fontSize: '14px',
  },
  logoutBtn: {
    backgroundColor: '#1f1f1f',
    color: '#ffffff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
}

export default Navbar