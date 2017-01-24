import React from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
// import App from './App'
import './index.css'


const config = {  
  apiKey: "AIzaSyCx06JqsDagobs82siVr5xQVvB0_YHxQzI",
  authDomain: "fir-7cd9c.firebaseapp.com",
  databaseURL: "https://fir-7cd9c.firebaseio.com",
  storageBucket: "fir-7cd9c.appspot.com",
  messagingSenderId: "52778606417"
}

const database = firebase  
  .initializeApp(config)
  .database()
  .ref()

// Added some "action" functions
// These will update our firebase database
const addLocation = data => database.child('locations').push(data, response => response);  
const updateLocation = (id, data) => database.child(`locations/${id}`).update(data, response => response);  
const actions = {  
  addLocation,
  updateLocation,
};

// Now we can use our actions in our components
const App = (props) => {  
  console.log('snapshot', props);
  return (
    <div>
      <h1>My Prototype</h1>
      <button
        onClick={() => props.addLocation({ name: 'China', region: 'Asia' })}
      >
        Add Stuff
      </button>
      <p>{JSON.stringify(props.location)}</p>
    </div>
  );
}

// Make sure you pass your actions into your root component
database.on('value', snapshot => {  
  const store = snapshot.val();
  ReactDOM.render(
    <App
      {...actions}
      {...store}
    />,
    document.getElementById('root')
  )
});
