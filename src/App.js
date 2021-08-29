import './App.css';
import axios from 'axios';
import { Component } from 'react';
// import Apitem from './components/Apitem';

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
    }
     
    render(){
      
      const { githubData } = this.state;

      var followersTotal = []
      var followingTotal = []
      
      function search() {
        var pageB = document.getElementById('page').value
        
        axios
        .get(api.baseURL+"/users/LuciLua/followers?page=".concat(pageB))
        .then((res) => {
         
          for (let i = 0; i < res.data.length; i++){
            var dados = `<div className="followers" id="followers" key=${res.data[i].id}><a href=${res.data[i].html_url} className="followersr"><p className="nomes">${res.data[i].login}</p><img src=${res.data[i].avatar_url} alt="Avatar"/></a></div>`

            document.querySelector('.login').innerHTML += dados

            followersTotal.push(res.data[i].login)

        }
        })    

        
        var pageC = document.getElementById('pageC').value 

        axios
        .get(api.baseURL+"/users/LuciLua/following?page=".concat(pageC))
        .then((res) => {
          
          for (let i = 0; i < res.data.length; i++){
            var dados = `<div className="following" id="following" key=${res.data[i].id}><a href=${res.data[i].html_url} className="following"><p className="nomes">${res.data[i].login}</p><img src=${res.data[i].avatar_url} alt="Avatar"/></a></div>`

            document.querySelector('.loginDois').innerHTML += dados

            followingTotal.push(res.data[i].login)
          }
            })       
            
          }

          function clear(){
            var fol = document.querySelectorAll('.followers')
            var fow = document.querySelectorAll('.following')
          
            for(let i = 0; i < fol.length; i++){
              fol[i].style.display='none'
              // fol[i].parentNode.removeChild(fol[i])
            }
            for(let i = 0; i < fow.length; i++){
              fow[i].style.display='none'
              // fow[i].parentNode.removeChild(fow[i])
            }
            
          }

            function segui(){

            }

            function sort(){

              
              console.log('seguidores total:', followersTotal.length)
              console.log('seguindo total:', followingTotal.length)
              
              var flow = document.getElementById('flow')
              flow.innerHTML = followersTotal.length

              var fwing = document.getElementById('fwing')
              fwing.innerHTML = followingTotal.length

          }

            function check(){

              const stranger = []
              for(let i = 0; i < followersTotal.length; i++){

                for(let p = 0; p < followingTotal.length; p++){
                  if(followingTotal[p] === followersTotal[i]){
                    break
                  } else {
                    console.log(followersTotal[i], followingTotal[i])
                    if (followersTotal[i] !== followingTotal[i]){
                      document.getElementById('stranger').innerHTML = 'who?'
                    }
                    break
                  }
                }
              }
              console.log(stranger)

            }

    return(
      <div className="App">
        <header>
            <h1 id="oo">GitHub Followers{}</h1>
        </header>
        <main>
            <div className="container">
                <div className="form">
                    <input type="text" placeholder="page" id="page"/>
                    <input type="text" placeholder="pageC" id="pageC"/>
                    <input type="text" placeholder="seguidor" onInput={segui} />
                    <button type="submit" onClick={search}>Look this</button>
                    <button onClick={clear}>Clear</button>
                    <button onClick={check}>Check</button>
                    <button onClick={sort}>Sort</button>
                </div>
            </div>
            <div className="container result">
            <div className="login" id="login">
              <h1>Followers <span id="flow"> </span> </h1>
                    {githubData.map((name) => (
                        <div className="followers" id="followers" key={name.id}>
                            <a href={name.html_url} className="followersr">
                                <p className="nomes">{name.login}</p>
                                <img src={name.avatar_url} alt="Avatar"/>
                            </a>
                      </div>
                    ))}
                </div> 
            </div>
            <div className="container result resultDois">
            <div className="login loginDois" id="login">
            <h1>Following: <span id="fwing"> </span></h1>
                    {githubData.map((name) => (
                        <div className="following" id="following" key={name.id}>
                            <a href={name.html_url}>
                                <p className="nomes">{name.login}</p>
                                <img src={name.avatar_url} alt="Avatar"/>
                            </a>
                      </div>
                    ))}
                </div>
            </div>

            <div className="container result">
            <div className="login" id="login">
            <h1>Stranger: <span id="stranger"> </span></h1>
                    {githubData.map((name) => (
                        <div className="following" id="following" key={name.id}>
                            <a href={name.html_url}>
                                <p className="nomes">{name.login}</p>
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
