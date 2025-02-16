import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import _ from 'lodash';
class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}
    }
    componentDidMount() {
        const genres = [{ _id:'', name: 'All Movies' }, ...getGenres()];
        this.setState({movies: getMovies(), genres})
    }
    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    }
    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }
    handlePageChange = page => {
        this.setState({ currentPage: page });
    }
    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    }
    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }
    getPagedData = () => {
        const { pageSize, currentPage, selectedGenre,sortColumn, movies: allMovies} = this.state;
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        return {totalCount: filtered.length, data:movies}
    }
    render() {
        const { pageSize, currentPage, sortColumn} = this.state;
        const { length: count } = this.state.movies;
        if (count === 0) return 'There are no movies to display';
        const {totalCount, data:movies } = this.getPagedData();
        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                    <Link className="btn btn-primary" to="/movies/new" style={{margin: 20}}>New Movie</Link>
                <p>Showing {totalCount} movies in the database</p>
                <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}/>
                <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={this.handlePageChange}
                    currentPage={currentPage} />                    
                </div>
        </div>
        );
        
    }
}
 
export default Movies;