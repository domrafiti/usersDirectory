import React from "react";


function Search(props) {
    return (
        <div className="container">
            <form className="search">
                <div className="form-group">
                    <label>Search for an Employee:</label>
                    <input
                        onChange={props.handleInputChange}
                        value={props.search}
                        name="search"
                        type="text"
                        className="form-control"
                        placeholder="Search for Employee"
                        id="search"
                    />
                </div>
            </form>
        </div>
    );
}

export default Search;