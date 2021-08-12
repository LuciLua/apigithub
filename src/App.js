import './App.css';
import axios from 'axios';
import { Component } from 'react';
import Apitem from './components/Apitem';

const api = {
    baseURL: "http://api.github.com",
    client_id: "217a90be2d13073d5d31",
    client_secret: "2c16427d9110cc99856cf6d79ae459c1d5bf1295"
  }

class App extends Component {


  constructor(){
    super();
    this.state = {
      githubData: []
    }
  }

  componentDidMount(){ // will é chamado so uma vez: antes do site ser renderizado, ele é chamado no server side.... já o did: ja foi montado. é chamado depois que o site ja carregou, quando o cliente ja recebeu algumas informações do site.

    // var page = "?page=2"
    var page = document.getElementById('page').value
    var pageB = page 

    axios
        .get(
        api.baseURL
        +
        "/users/LuciLua/followers" + pageB
        /*+
        api.client_id+"&client_secret="
        +
        "2c16427d9110cc99856cf6d79ae459c1d5bf1295")
        */)
        .then((res) => {
        console.log("Infos", res)
        this.setState({githubData: res.data})
        })    
  }  

  render(){

    const { githubData } = this.state;

    function teste() {
        axios.get(
        api.baseURL+"/users/LuciLua/followers?page=2").then((res) => {
            console.log("Infos", res)
        })    
    }

    return(
      <div className="App">
        <header>
            <h1>GitHub Followers</h1>
        </header>
        <main>
            <div className="container">
                <div className="form">
                    <input type="text" placeholder="page" id="page"/>
                    <input type="text" placeholder="seguidor"/>
                    <button type="submit" onClick={teste}>Look this</button>
                </div>
            </div>
            <div className="container result">
                <div className="login">
                    {githubData.map((name) => (
                        <div className="followers" key={name.id}>
                            <a href={name.html_url}>
                                <Apitem login={name.login}/>
                                <img src={name.avatar_url} alt="Avatar"/>
                            </a>
                        </div>
                    ))}
                </div> 
            </div>
        </main>
        <footer>
            <h1>Thaks for using mt app!</h1>
        </footer>
      </div>
    ); 
  }
}
export default App;
