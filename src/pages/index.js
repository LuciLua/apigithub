import styles from "../styles/home.module.scss";
import Cookie from "js-cookie";
import { addDays } from "date-fns";
import classNames from "classnames";

function Home() {
  var logado = false;

  function login() {
    const username = document.querySelector("input").value;

    const mesages = document.querySelector(".mesages");
    const mesageName = document.querySelector("#mesageName");
    const mesageInfo = document.querySelector("#mesageInfo");

    const loginSuccess = () => {
      setTimeout(() => {
        mesages.style.display = "none";
        window.location.href = `/user/${username}`;
      }, 2000);

      mesages.style.display = "flex";
      mesageName.textContent = `Bem-vindo ${username}`;
      mesageInfo.textContent = `${username}, agora você está logado`;
      mesages.style.border = "green 2px solid";
    };

    const loginFail = () => {
      setTimeout(() => {
        mesages.style.display = "none";
      }, 2000);

      mesages.style.display = "flex";
      mesageName.textContent = `Erro`;
      mesageInfo.textContent = `${username} não existe. Por favor, autentique-se antes`;
      mesages.style.border = "red 2px solid";
    };

    if (logado) {
      loginSuccess();
    } else {
      loginFail();
    }

    getUsername()

  }

  function signInSignOut(e) {
    const username = document.querySelector("input").value;

    const mesages = document.querySelector(".mesages");
    const mesageName = document.querySelector("#mesageName");
    const mesageInfo = document.querySelector("#mesageInfo");

    // mostre login visualmente
    const signInSuccess = () => {
      setTimeout(() => {
        mesages.style.display = "none";
      }, 2000);

      mesages.style.display = "flex";
      mesages.style.border = "green 2px solid";
      mesageName.textContent = `SignIn realizado com sucesso, ${username}!`;
      mesageInfo.textContent = `${username}, agora você pode logar`;
    };

    // mostre deslogue visualmente
    const signOutSuccess = () => {
      setTimeout(() => {
        mesages.style.display = "none";
      }, 2000);

      mesages.style.display = "flex";
      mesageName.textContent = `SignOut realizado com sucesso, ${username}!`;
      mesageInfo.textContent = `${username}, agora você está deslogado, para entrar faça o signIn`;
      mesages.style.border = "yellow 2px solid";
    };

    // logue-se
    function signIn() {
      signInSuccess();
      Cookie.set("token", "custom-token-here", {
        expires: addDays(new Date(), 1),
      });
    }

    // deslogue
    function signOut() {
      signOutSuccess();
      Cookie.remove("token");
    }

    // se logar: logue e mostre sucesso visualmente
    if (e.target.id == "signIn") {
      signIn();
      signInSuccess();
      logado = true;
    }

    // se deslogar: deslogue e mostre sucesso visualmente
    else if (e.target.id == "signOut") {
      signOut();
      signOutSuccess();
      logado = false;
    }
  }

  function pressEnterToSend(e) {
    if (e.key == "Enter") {
      login();
    }
  }

  function getUsername(){
    var username = document.querySelector('#username').value
    console.log(username)
    return username
  }

  return (
    <div className={styles.container}>
      <div className={classNames(styles.log, styles.boxesInitial)}>
        <button type="button" id="signIn" onClick={signInSignOut}>
          SignIn
        </button>
        <button type="button" id="signOut" onClick={signInSignOut}>
          SignOut
        </button>
      </div>
      <div className={classNames(styles.form, styles.boxesInitial)}>
        <div className={styles.inputArea}>
          <input required onKeyPress={pressEnterToSend} id="username" />
          <label>Username</label>
        </div>
        <button type="submit" onClick={login}>
          Pesquisar
        </button>
      </div>
    </div>
  );
}

export default Home;
export var username