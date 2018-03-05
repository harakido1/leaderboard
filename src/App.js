import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Image';

class App extends Component {

state = {
  top100Days: [],
  top100AllTime: [],
  current: true
}
// Get FCC data function:
getFCCdata(url, stateName) {
  axios.get(url).then(({ data }) => { this.setState({ [ stateName ] : data });
  })
}

pointChange(value) {
  if(this.state.current !== value) {
    this.setState({current: value});
  }
}

// AJAX calls:
  componentDidMount() {
    this.getFCCdata('https://fcctop100.herokuapp.com/api/fccusers/top/recent', "top100Days");
    this.getFCCdata('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', "top100AllTime");
  }

  render() {
    // Deconstructor
    const {top100Days, top100AllTime, current} = this.state;
    return (
      <div className="App">
        <div>
          <h2>Free Code Camp Leaderboard</h2>
        </div>
        <Table striped bordered condensed hover className="colorBlack">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Camper's Name</th>
            <th onClick={(event) => this.pointChange(true)}>Points in 30 Days (click here)</th>
            <th onClick={(event) => this.pointChange(false)}>All Time Points (click here)</th>
          </tr>
        </thead>
        <tbody>
          {current && (top100Days.map((row, index) => (
            <tr key={row.username}>
              <td>{index + 1}</td>
              <td><a href = {'https://www.freecodecamp.org /${row.username}'}>
                <Image src = {row.img} className="imgHeight" circle/> {row.username} </a>
              </td>
              <td>{row.recent}</td>
              <td>{row.alltime}</td>
            </tr>
            )
          ))}
          {current === false && (top100AllTime.map((row, index) => (
            <tr key={row.username}>
              <td>{index + 1}</td>
              <td><a href = {'https://www.freecodecamp.org /${row.username}'}>
                <Image src = {row.img} className="imgHeight" circle/> {row.username} </a>
              </td>
              <td>{row.recent}</td>
              <td>{row.alltime}</td>
            </tr>
            )
          ))}
        </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
