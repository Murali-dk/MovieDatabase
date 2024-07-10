import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SingleMoviePage from './components/SingleMoviePage'
import SearchPage from './components/SearchPage'

import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/movie/:movieId" component={SingleMoviePage} />
    <Route exact path="/search-page/:userQuery" component={SearchPage} />
  </Switch>
)

export default App
