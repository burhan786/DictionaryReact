import axios from 'axios';
import './App.css';
import {useEffect, useState} from 'react';
import { Container, Switch, withStyles } from "@material-ui/core";
import Header from './components/header/Header';
import Definitions from './components/Definitions/Definitions';
import { grey } from '@material-ui/core/colors';
import transitions from '@material-ui/core/styles/transitions';

function App() {

  const [meanings, setMeanings] = useState([]);
  const[word, setWord] = useState('');
  const [category, setCategory] = useState("en")
  const [LightMode, setMode] = useState(false)
  const dictionaryAPI = async() => {
    try{
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );

        //console.log(data);
        setMeanings(data.data);
    }catch(err){
      console.log(err);
    }

    //console.log(meanings);
  }

  useEffect(() => {
    dictionaryAPI();
  }, [word, category, meanings])

  const DarkMode = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div className="App" 
    style={{
      height:'100vh', 
      backgroundColor:LightMode ? "#fff":"#282c34", 
      color:LightMode ? "black":"white", 
      justifyContent:"space-evenly",
      transition:"all 0.5s linear"
      }}>
      <Container maxWidth = "md" style={{display: 'flex', flexDirection:'column', height:'100vh'}}>
        <div style={{position:"absolute", top:0, right:15,paddingTop:10}}>
        <span>{LightMode ? "Light" : "Dark"}Mode</span>
        <DarkMode checked={LightMode} onChange={() => setMode(!LightMode)}/>
        </div>
        
        <Header 
        LightMode={LightMode}
        category={category} 
        setCategory = {setCategory}
        word = {word}
        setWord = {setWord}
        />
        {meanings &&(<Definitions LightMode={LightMode} word={word} meanings = {meanings} category={category}/>)}
      </Container>
    </div>
  );
}

export default App;
