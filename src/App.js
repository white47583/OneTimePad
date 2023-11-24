import logo from './logo.svg';
import './App.css';
import './index.css'
import generateKey from './components/randomGenerator';
//others
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import { useEffect, useState } from 'react';
import { Algoinput } from'./components/otpAlgo.js'


function App() {
  const [keyBackup, setKeyBackup] = useState('')
  const [encryptedMessageText, setEncrytedMessageText] = useState('')
  const [keyDisplay, setKeyDisplay] = useState('');
  const [MessageText, setMessageText] = useState('')
  //decrypt stuff

  //handle Input
  const handleMessageChange = (event) => {
    if(event.target.value=='') {
      setEncrytedMessageText('');
    }
    setMessageText(event.target.value);
    console.log('event.target.value:',event.target.value)
    //generating key
    let key = generateKey(event.target.value);
    console.log('transfer key',key,'into Backup key function')
    setKeyBackup(key) //übergabe in backup key arugment
    console.log('KeyBackup',keyBackup)
    //map key
    var keyElements = '';
    for(let i=0;i<key.length;i++) {
      keyElements += key[i];
    }
    setKeyDisplay(keyElements)

  }
  const encrypt = () => {
    var encryptedMessage = ''
    var encryptedArray = Algoinput(MessageText,keyBackup.join(''),'encrypt');
    for(let i=0;i<encryptedArray.length;i++) {
        encryptedMessage += encryptedArray[i];
    }
    setEncrytedMessageText(encryptedMessage)
    copyToCliboard(keyBackup.join(''))
  } 
  const copyToCliboard = (value) => {
    navigator.clipboard.writeText(value);
    alert("Copied Key to Cliboard: " + value);
  }
  //test if input is empty
  //decrypt
  const handleCryptedMessageChange = (event) => {
    setEncrytedMessageText(event.target.value);
  }
  const handleKeyChange = (event) => {
    setKeyDisplay(event.target.value)
  }
  const decrypt = () => {
    var decryptedMessage = ''
    var decryptedArray = Algoinput(encryptedMessageText,keyBackup.join(''),'decrypt');
    for(let i=0;i<decryptedArray.length;i++) {
      decryptedMessage += decryptedArray[i];
    }
    console.log('generated Message');
    console.log('Text : ', decryptedMessage, 'with Key : ', keyBackup)
    
  }
  return (
    <div>
      <br/>
      <h1 class="text-center">One Time Pad</h1>
      <br/>
      <div class="text-center">
        <input value={keyDisplay} onChange={handleKeyChange}></input>
      </div>
      <div class="resultBox">
        <div class="form-floating mb-3">
          <textarea class="form-control" placeholder="Your text goes here" id="floatingTextarea2Disabled" value={MessageText} onChange={handleMessageChange}></textarea>
          <label for="floatingTextarea2Disabled">Message</label>
        </div>
      </div>
      <div class="resultBox">
        <div class="form-floating mb-3">
          <textarea class="form-control" id="floatingTextarea2Disabled" placeholder="EncryptedText" value={encryptedMessageText} onChange={handleCryptedMessageChange}></textarea>
          <label for="floatingTextarea2Disabled">Encrypted Message</label>
        </div>
      </div>
      <div class="text-center gap-2">
        <buton class="btn btn-danger" onClick={encrypt}>Encrypt</buton>
        <buton class="btn btn-success" onClick={decrypt}>Decrypt</buton>
      </div>

    </div>
  );
}

export default App;
