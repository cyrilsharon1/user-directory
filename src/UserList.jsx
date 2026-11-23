import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [expandedUser, setExpandedUser] = useState(null)

  useEffect(() => {
    let isActive = true

    async function fetchUsers() {
      setLoading(true)
      setError('')
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        if (isActive) setListOfUsers(response.data)
      } catch {
        if (isActive) setError('We couldn’t load the directory. Please check your connection and try again.')
      } finally {
        if (isActive) setLoading(false)
      }
    }

    fetchUsers()
    return () => { isActive = false }
  }, [])

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return listOfUsers.filter((user) => user.name.toLowerCase().includes(query))
  }, [listOfUsers, search])

  return (
    <section className="directory" aria-labelledby="directory-title">
      <div className="directory-heading">
        <div>
        <p className="section-kicker">THE USER LIST <span>↓</span></p>
          <h2 id="directory-title">Let’s take a look</h2>
        </div>
        {!loading && !error && <span className="result-count">{filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'}</span>}
      </div>

      <label className="search-box">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.4 4.4" /></svg>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name..."
          aria-label="Search users by name"
        />
        {search && <button className="clear-search" type="button" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
      </label>

      {loading ? (
        <div className="message-panel" role="status"><span className="spinner" />Loading users...</div>
      ) : error ? (
        <div className="message-panel error-panel" role="alert"><span className="message-icon">!</span><p>{error}</p><button type="button" className="retry-button" onClick={() => window.location.reload()}>Try again</button></div>
      ) : filteredUsers.length ? (
        <div className="user-grid">
          {filteredUsers.map((user, index) => {
            const isExpanded = expandedUser === user.id
            return (
              <article className={`user-card${isExpanded ? ' is-expanded' : ''}`} key={user.id}>
                <button
                  className="card-toggle"
                  type="button"
                  onClick={() => setExpandedUser(isExpanded ? null : user.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`user-details-${user.id}`}
                >
                  <span className={`avatar avatar-${index % 6}`}>{user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
                  <span className="user-summary">
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email.toLowerCase()}</span>
                  </span>
                  <span className="expand-indicator" aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                </button>
                <div className="company-row"><span className="company-label">COMPANY</span><span>{user.company.name}</span></div>
                {isExpanded && (
                  <div className="user-extra" id={`user-details-${user.id}`}>
                    <div><span className="detail-label">ADDRESS</span><span>{user.address.street}, {user.address.suite}<br />{user.address.city}, {user.address.zipcode}</span></div>
                    <div><span className="detail-label">PHONE</span><a href={`tel:${user.phone}`}>{user.phone}</a></div>
                    <div><span className="detail-label">WEBSITE</span><a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      ) : (
        <div className="message-panel empty-panel"><span className="message-icon">⌕</span><p>No people found for “{search}”.<br /><span>Try another name.</span></p></div>
      )}
    </section>
  )
}

export default UserList
