import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const constantOfApiResponse = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {apiRespose: constantOfApiResponse.initial, allMoviesList: []}

  componentDidMount() {
    this.getApi()
  }

  convertCamelCase = data => ({
    page: data.page,
    results: data.results.map(eachItem => ({
      adult: eachItem.adult,
      backdropPath: eachItem.backdrop_path,
      genreIds: eachItem.genre_ids,
      id: eachItem.id,
      originalLanguage: eachItem.original_language,
      originalTitle: eachItem.original_title,
      overview: eachItem.overview,
      popularity: eachItem.popularity,
      posterPath: eachItem.poster_path,
      releaseDate: eachItem.release_date,
      title: eachItem.title,
      video: eachItem.video,
      voteAverage: eachItem.vote_average,
      voteCount: eachItem.vote_count,
    })),
    totalPages: data.total_pages,
    totalResults: data.total_results,
  })

  getApi = async () => {
    this.setState({apiRespose: constantOfApiResponse.inProgress})
    const myApiKey = 'fe5632f5a02061da51fce31afaed6c5c'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${myApiKey}&language=en-US&page=1`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = this.convertCamelCase(data)
    this.setState({
      apiRespose: constantOfApiResponse.success,
      allMoviesList: updatedData.results,
    })
  }

  loadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="Rings" width={150} height={150} color="blue" />
    </div>
  )

  successView = () => {
    const {allMoviesList} = this.state
    return (
      <div className="movie-bg-cont">
        {allMoviesList.map(eachMovie => {
          const {posterPath} = eachMovie
          return (
            <div key={eachMovie.id} className="single-movie-poster-card">
              <img
                className="movie-poster"
                alt="poster"
                src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
              />
              <h4>{eachMovie.title}</h4>
              <p>{eachMovie.voteAverage}</p>
              <Link to={`/movie/${eachMovie.id}`}>
                <button className="detail-view-btn" type="button">
                  View Details
                </button>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }

  swithResponse = () => {
    const {apiRespose} = this.state

    switch (apiRespose) {
      case constantOfApiResponse.inProgress:
        return this.loadingView()
      case constantOfApiResponse.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.swithResponse()}
      </div>
    )
  }
}

export default Home
