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
        <div className='toggleTheme' onClick={toggleTheme}>
          <div/>
        </div>
        <Component {...pageProps} />
      </main>
      </>
    )
  }
  
  export default App