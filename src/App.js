import './App.css';
import axios from 'axios';
import { Component } from 'react';

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

    axios
      .get(
      api.baseURL+
      "/users/LuciLua/followers" &&
      api.baseURL+
        "/users/LuciLua/followers?page=2"
      /*
      +
      api.client_id+
      "&"+
      api.client_secret
      */
      )
      .then((res) => {
        console.log("Infos", res)
        this.setState({githubData: res.data})
      })   
  }

  render(){
    const { githubData } = this.state;
    return(
      <div className="App">
        <header>
            <h1>GitHub Followers</h1>
        </header>
        <main>
            <div className="container">
                <form action="">
                    <input type="text" placeholder="usuário"/>
                    <input type="text" placeholder="seguidor"/>
                    <button type="submit">Look this</button>
                </form>
            </div>
            <div className="container result">
                <div className="login">
                    {githubData.map((name) => (
                    <div className="followers">
                        <p>{name.login}</p>
                        <img src={name.avatar_url} alt="avatar"/>
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
// var dataLogin = document.querySelectorAll('#login')
// for (let i = 0; i < dataLogin.length; i++){
//   console.log('login:', dataLogin[i])
// }



export default App;
