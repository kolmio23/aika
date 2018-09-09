import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import EntryForm from './EntryForm';
import DB from './Storage';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
    this.handleNote = this.handleNote.bind(this);
  }

  handleClick(e) {
    DB.push({eventTimestanp: new Date(), eventType: e})
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));

    console.log(JSON.stringify(DB))
  }

  handleNote(text) {
    DB.push({eventTimestanp: new Date(), eventType: "note", eventNote: text})
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div className="App">
        <p></p>
        <button onClick={() => this.handleClick("come")}>Kommen</button>
        <button onClick={() => this.handleClick("go")}>Gehen</button>
        <p></p>
        <button onClick={() => this.handleClick("pausestart")}>Pause anfangen</button>
        <button onClick={() => this.handleClick("pauseend")}>Pause beenden</button>
        <p></p>
        <EntryForm handler={(a) => this.handleNote(a)}/>
        <hr></hr>
        <table>
            {DB.map(function(name, index){
                return <tr>
                         <td>{"" + name.eventType}</td>
                         <td>{"" + moment(name.eventTimestanp).format('DD.MM.YYYY HH:mm')}</td>
                         <td>{"" + (name.eventNote || "")}</td>
                         <td><button>Bearbeiten</button></td>
                         <td><button>Löschen</button></td>
                       </tr>;
              })}
        </table>
        <hr></hr>
        Dauer 6,5 Stunden
        <hr></hr>
        {moment().format('DD.MM.YYYY HH:mm')}
        <button>vor</button>
        <button>zurück</button>
      </div>
    );
  }
}

export default App;