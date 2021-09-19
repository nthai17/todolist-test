import React, {Component} from 'react';

class Search extends Component {
    render(){
        return(
            <div className="search-box">
                <input type="text" placeholder="Search task name" 
                value={this.props.searchValue}
                onChange={(event) => this.props.handleSearch(event.target.value)}/>
                <button className="btn btn-clear-search" type="button"
                     onClick={() => this.props.handleSearch('')}>Clear
                </button>
            </div>
        )
    }
}

export default Search;