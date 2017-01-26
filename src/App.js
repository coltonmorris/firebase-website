import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import * as firebase from 'firebase'
       
const config = {  
  apiKey: "AIzaSyCx06JqsDagobs82siVr5xQVvB0_YHxQzI",
  authDomain: "fir-7cd9c.firebaseapp.com",
  databaseURL: "https://fir-7cd9c.firebaseio.com",
  storageBucket: "fir-7cd9c.appspot.com",
}
firebase.initializeApp(config)


class App extends Component {
  constructor() {
    super()
    this.state = {
      Leaders: [],
      email: 'email',
      score: 1,
    }

    this.handleChange = this.handleChange.bind(this)
    this.addToDb = this.addToDb.bind(this)
  }

  addToDb() {
    let num = Math.floor((Math.random() * 10))
    firebase.app().database().ref('Leaders/' + num).set({
      email: this.state.email,
      score: parseInt(this.state.score),
    })
  }

  componentDidMount() {
    let ref = firebase.app().database().ref().child('Leaders')
       
    ref.on('value', snap => {
      this.setState({
        Leaders: snap.val()
      })
    })
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    // this.state.Leaders.sort((a,b) => {
    //   return b.score - a.score
    // })

    return (
      <div className="App">
      <div>
        <form>
          <input onChange={this.handleChange} value={this.state.email} type="text" name="email" />
          <input onChange={this.handleChange} value={this.state.score} type="text" name="score" />
          <input type="button" onClick={this.addToDb} value="Submit" />
        </form>
      </div>
      <table>
      <tbody>
        {this.state.Leaders.map((player) => {
          return (<tr key={player.email+player.score}> 
              <td>{player.email}</td>
              <td>{player.score}</td>
              </tr>)
        })}
      </tbody>
      </table>
      </div>
    )
  }
}

export default App
