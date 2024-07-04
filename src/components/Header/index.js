import {useState} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {TiThMenuOutline} from 'react-icons/ti'

import 'reactjs-popup/dist/index.css'
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
        <div>
          <Popup
            trigger={
              <button type="button" className="nav-icon">
                {' '}
                <TiThMenuOutline />
              </button>
            }
            position="bottom center"
          >
            <ul className="nav-sm-list">
              <li key="1">
                <Link to="/">
                  <button className="nav-page-small-btn" type="button">
                    Popular
                  </button>
                </Link>
              </li>
              <li key="2">
                <Link to="/top-rated">
                  <button className="nav-page-small-btn" type="button">
                    Top Rated
                  </button>
                </Link>
              </li>
              <li key="3">
                <Link to="/upcoming">
                  <button className="nav-page-small-btn" type="button">
                    Upcoming
                  </button>
                </Link>
              </li>
            </ul>
          </Popup>
        </div>
        <input
          type="search"
          placeholder="Search For a Movie"
          value={userInput}
          className="nav-large-input"
          onChange={userSearching}
        />
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
      <div>
        <input
          type="search"
          placeholder="Search For a Movie"
          value={userInput}
          className="nav-sm-input"
          onChange={userSearching}
        />
      </div>
    </nav>
  )
}

export default Header
