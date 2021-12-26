import React from "react";
import styles from "../styles/home.module.scss";

function Home() {
  function login(e) {
    e.preventDefault();
    const username = document.querySelector("input").value;

    const mesages = document.querySelector(".mesages");
    const mesageName = document.querySelector("#mesageName");
    const mesageInfo = document.querySelector("#mesageInfo");

    setTimeout(() => {
      mesages.style.display = "none";
      window.location.href = `/user/${username}`;
    }, 2000);

    mesages.style.display = "flex";
    mesageName.textContent = `Bem-vindo ${username}`;
    mesageInfo.textContent = `${username}, agora você está logado`;
  }
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.inputArea}>
          <input required />
          <label>Username</label>
        </div>
        <button onClick={login}>Pesquisar</button>
      </div>
    </div>
  );
}

export default Home;
