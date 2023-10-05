import logo from './logo.svg';
import './App.css';
import './index.css'
import generateKey from './components/randomGenerator';
//others
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import { useState } from 'react';


function App() {
const [keyDisplay, setKeyDisplay] = useState('ichts')
const [text, setText] = useState('')
//handle Input
const handleChange = (event) => {
  setText(event.target.value)
  let key = generateKey(event.target.value);
  const keyElements = key.map((keyValue, index) => (
    <span key={index}>{keyValue}</span>
  ));
  setKeyDisplay(keyElements)
}
  return (
    <div>
      <div class="text-center">
        {keyDisplay}
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">input</label>
        <input class="form-control" id="exampleFormControlTextarea1" rows="3" value={text} onChange={handleChange}></input>
      </div>
    </div>
  );
}

export default App;
