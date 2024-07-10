import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MovieCard from '../MovieCard'
import './index.css'

const constantOfApiResponse = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    apiRespose: constantOfApiResponse.initial,
    allMoviesList: [],
    moviePage: 1,
  }

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
      posterPath: `https://image.tmdb.org/t/p/w500/${eachItem.poster_path}`,
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
    const {moviePage} = this.state
    const pagination = moviePage < 500 ? moviePage : 500
    const myApiKey = 'fe5632f5a02061da51fce31afaed6c5c'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${myApiKey}&language=en-US&page=${pagination}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
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
      <ul className="movie-bg-cont">
        {allMoviesList.map(eachMovie => (
          <MovieCard key={eachMovie.id} eachMovie={eachMovie} />
        ))}
      </ul>
    )
  }

  previousPage = () => {
    this.setState(
      preveStae => ({
        moviePage: preveStae.moviePage > 1 ? preveStae.moviePage - 1 : 1,
      }),
      this.getApi,
    )
  }

  nextPage = () => {
    this.setState(
      preveStae => ({
        moviePage: preveStae.moviePage < 500 ? preveStae.moviePage + 1 : 500,
      }),
      this.getApi,
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
    const {moviePage} = this.state
    return (
      <div>
        <Header />
        <div className="pagination-btn-cont">
          <button
            onClick={this.previousPage}
            className="page-btn"
            type="button"
          >
            Prev
          </button>
          <p>{moviePage}</p>
          <button onClick={this.nextPage} className="page-btn" type="button">
            Next
          </button>
        </div>
        {this.swithResponse()}
      </div>
    )
  }
}

export default Home
