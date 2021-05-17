import React, { Component } from 'react';
import API from '../../utils/api';
import Search from '../Search/search';


class Table extends Component {
    state = {
        sortByName: "",
        search: "",
        results: []
    };

    componentDidMount() {
        this.searchEmployees("");
    };

    //search function
    searchEmployees = (search) => {
        API.getEmpData(search)
            .then((res) => this.setState({ results: res.data.results }))
            .catch((err) => console.log(err));
    };

    //handle input change
    handleInputChange = event => {
        if (event.target.name === "search") {
            const search = event.target.value.toLowerCase();
            this.setState({
                search: search
            })
        }
    };

    //sorting by first name
    sortByFirstName = () => {
        const filteredEmployees = this.state.results.sort((a, b) => {
            if (b.name.first > a.name.first) {
                return -1
            }
            if (a.name.first > b.name.first) {
                return 1
            }
            return 0;
        });

        if (this.state.sortByName === "DESC") {
            filteredEmployees.reverse();
            this.setState({ sortByName: "ASC" });
        } else {
            this.setState({ sortByName: "DESC" });
        }
        this.setState({ results: filteredEmployees })
    };

    //sorting by last name
    sortByLastName = () => {
        const empSort = this.state.results.sort((a, b) => {
            if (b.name.last > a.name.last) {
                return -1
            }
            if (a.name.last > b.name.last) {
                return 1
            }
            return 0;
        });
        if (this.state.sortByName === "DESC") {
            empSort.reverse();
            this.setState({ sortByName: "ASC" });
        } else {
            this.setState({ sortByName: "DESC" });
        }
        this.setState({ results: empSort })
    };

    //render and handle search and sorting fucntion calls
    render() {
        return (
            <div>
                <Search
                    search={this.state.search}
                    handleInputChange={this.handleInputChange} />
                <div className="container mt-3">
                    <table className="table table-striped text-center table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">First Name <button type="button" id="sort-by-name" onClick={this.sortByFirstName}>^</button></th>
                                <th scope="col">Last Name <button type="button" id="sort-by-name" onClick={this.sortByLastName}>^</button></th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">DoB</th>
                            </tr>
                        </thead>
                        {this.state.results && this.state.results.map(query =>
                            query.name.first.toLowerCase().includes(this.state.search) ?
                                <tbody key={query.login.uuid}>
                                    <tr>
                                        <th scope="row"><img src={query.picture.thumbnail} alt={query.name.first} /></th>
                                        <td>{query.name.first}</td>
                                        <td>{query.name.last}</td>
                                        <td>{query.phone}</td>
                                        <td>{query.email}</td>
                                        <td>{query.dob.date}</td>
                                    </tr>
                                </tbody>
                                :
                                query.name.last.toLowerCase().includes(this.state.search) ?
                                    <tbody key={query.login.uuid}>
                                        <tr>
                                            <th scope="row"><img src={query.picture.thumbnail} alt={query.name.first} /></th>
                                            <td>{query.name.first}</td>
                                            <td>{query.name.last}</td>
                                            <td>{query.phone}</td>
                                            <td>{query.email}</td>
                                            <td>{query.dob.date}</td>
                                        </tr>
                                    </tbody>
                                    :
                                    null
                        )}
                    </table>
                </div>
            </div>
        );
    }
}

export default Table;