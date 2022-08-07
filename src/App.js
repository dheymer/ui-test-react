import './App.css';
import React from 'react';
import PreviousPolls from './components/PreviousPolls';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <div className='app_title'>
          <h2>Previous Rulings</h2>
          <select id='display-mode' onChange={this.onSelectChange}>
            <option value='grid'>Grid</option>
            <option value='list'>List</option>
          </select>
        </div>
        <PreviousPolls />
      </div>
    );
  }
}

export default App;
