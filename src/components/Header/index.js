import {useState} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const Header = () => {
  const [userInput, setInput] = useState('')

  const userSearching = event => {
    setInput(event.target.value)
  }

  return (
    <nav className="nav-bar-cont">
      <div className="nav-content">
        <h1 className="nav-head">movieDB</h1>
        <div className="search-cont">
          <input
            placeholder="Search For a Movie"
            value={userInput}
            className="nav-large-input"
            onChange={userSearching}
            type="text"
          />
          <button type="button">
            <Link to={`/search-page/${userInput}`}>Search</Link>
          </button>
        </div>
        <ul className="nav-pages-list">
          <li key="1">
            <Link to="/">
              <button className="nav-pafe-btn" type="button">
                Popular
              </button>
            </Link>
          </li>
          <li key="2">
            <Link to="/top-rated">
              <button className="nav-pafe-btn" type="button">
                Top Rated
              </button>
            </Link>
          </li>
          <li key="3">
            <Link to="/upcoming">
              <button className="nav-pafe-btn" type="button">
                Upcoming
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="inp">
        <input
          type="search"
          placeholder="Search For a Movie"
          value={userInput}
          className="nav-sm-input"
          onChange={userSearching}
        />
        <Link to={`/search-page/${userInput}`}>
          <button type="button">Search</button>
        </Link>
        <button type="button">Search</button>
      </div>
    </nav>
  )
}

export default Header
