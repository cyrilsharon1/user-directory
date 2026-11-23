import UserList from './UserList'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="My People List home">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>my people<span className="brand-light"> list</span></span>
        </a>
        <span className="header-note"><span className="live-dot" /> Made with React + Axios</span>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow">MY API CHECKPOINT <span>✳</span></p>
        <h1>Here are the people<br /><span>I found on the web.</span></h1>
        <p className="intro-copy">I’m fetching a list of users with Axios. Search for a name, then click a card to see more.</p>
      </section>

      <UserList />

      <footer className="site-footer">
        <span>MY REACT PROJECT <span className="footer-star">✳</span></span>
        <span>User data from JSONPlaceholder</span>
      </footer>
    </main>
  )
}

export default App
