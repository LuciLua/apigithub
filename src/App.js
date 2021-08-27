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
      api.baseURL+"/users/LuciLua/followers?page=" + pageB)
      .then((res) => {
        console.log("Infos", res)
        this.setState({githubData: res.data})
      })    
    } 
    
    render(){
      
      const { githubData } = this.state;
      
      function teste() {
        
        var page = document.getElementById('page').value
        var pageB = page 
        
        axios
        .get(api.baseURL+"/users/LuciLua/followers?page=".concat(pageB))
        .then((res) => {
          console.log("Infos", res)
          console.log(res.data.length)
          
          for (let i = 0; i < res.data.length; i++){
            var qt = ((res.data.length) - 1)
            qt++
            var dados = `<div className="followers" id="followers" key={res.data[i].id}><a href=${res.data[i].html_url} className="followersr"><p class="nomes">${res.data[i].login}</p><img src=${res.data[i].avatar_url} alt="Avatar"/></a></div>`

            document.querySelector('.login').innerHTML += dados
            document.getElementById('contador').innerHTML = qt
        }

        })       
            }

            function segui(){

            }

    return(
      <div className="App">
        <header>
            <h1 id="oo">GitHub Followers{}</h1>
        </header>
        <main>
            <div className="container">
              <div id="contador">
                  30
              </div>
                <div className="form">
                    <input type="text" placeholder="page" id="page"/>
                    <input type="text" placeholder="seguidor" onInput={segui} />
                    <button type="submit" onClick={teste}>Look this</button>
                </div>
            </div>
            <div className="container result">
                <div className="login" id="login">
                    {githubData.map((name) => (
                        <div className="followers" id="followers" key={name.id}>
                            <a href={name.html_url} className="followersr">
                                <p class="nomes">{name.login}</p>
                                <img src={name.avatar_url} alt="Avatar"/>
                            </a>
                      </div>
                    ))}
                </div> 
            </div>
            <div className="container">
              
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
