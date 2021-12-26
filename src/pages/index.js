import React from 'react';
import styles from '../styles/home.module.scss'

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>
          Formulário
        </h1>
        <div className={styles.inputArea}>
          <input required />
          <label>
            github user
          </label>
        </div>
        <button>
          Pesquisar
        </button>
      </div>
    </div>
  )
}

export default Home