import './App.css';
import React from 'react';
import PreviousPolls from './components/PreviousPolls';
import PollsData from './assets/data';

class App extends React.Component {
  state = {displayMode: 'grid', pollsData: PollsData};
  auxData = PollsData;                                // Auxiliar data to help updating the state

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * Select the layout between grid or list
   * 
   * @memberOf App
   */
  onSelectChange = (event) => {
    this.setState({displayMode: event.target.value});
  }

  /**
   * Check resolution to switch the layout correctly
   * 
   * @memberOf App
   */
  updateDimensions = () => {
    if (window.innerWidth < 768) {
      this.setState({displayMode: 'grid'});
    } else {
      this.setState({displayMode: document.getElementById('display-mode').value})
    }
  };

  /**
   * Add the vote to the data in the state
   * 
   * @memberOf App
   */
  onVoteAdded = (position, newData) => {
    this.auxData.data[position] = newData;
    this.setState({pollsData: this.auxData});
  }

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
        <PreviousPolls 
          displayMode={this.state.displayMode}
          pollsData={this.state.pollsData}
          onVoteAdded={this.onVoteAdded}
        />
      </div>
    );
  }
}

export default App;
