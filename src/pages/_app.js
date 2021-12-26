import Head from 'next/head'
import '../styles/globals.scss'

function App({Component, pageProps}){
  function toggleTheme(){
    document.body.classList.toggle('dark')
    document.querySelector('.toggleTheme').classList.toggle('light')
  }
    return(
      <>
      <Head>
        <title>Using GitHub API</title>
      </Head>
      <main>
        <div className='mesages'>
          <div className='content-message'>
            <h1 id='mesageName'>Logado com sucesso</h1>
            <p id='mesageInfo'>
              Alguma coisa informando alguma coisa
            </p>
          </div>
        </div>
        <div className='toggleTheme' onClick={toggleTheme}>
          <div/>
        </div>
        <Component {...pageProps} />
      </main>
      </>
    )
  }
  
  export default App