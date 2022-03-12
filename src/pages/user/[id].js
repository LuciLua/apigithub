import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "../../utils/withAuth";
import styles from "../user/user.module.scss";
import { useState, useEffect } from "react"
import Image from "next/image"
// import { username } from "../";
import Layout from "../../components/Layout";
import axios from "axios";

function DynamicPage(props) {

  const router = useRouter();

  // if (!router.isFallback) {
  //   console.log('erro')
  // }

  // console.log(router.query.id)
  const initialUser = router.query.id

  // const id = router.query.id
  // mesma coisa

  const [user, setUser] = useState(initialUser);
  const [dataUser, setDataUser] = useState({});

  async function getGithubProfile() {
    const resp = await axios.get(`https://api.github.com/users/${user}`)
    const data = await resp.data
    setDataUser(data)
  }

  useEffect(() => {
    setUser(initialUser)
    console.log(user)
    // getGithubProfile(initialUser)
  }, [])


  return (
    <Layout>
      <div className={styles.btnInput}>
        <input
          className={styles.setUserInput}
          type="text"
          onChange={(e) => { setUser(e.target.value) }}
          placeholder={initialUser}
        />
        <button className={styles.setUserBtn} onClick={getGithubProfile}>
          Pesquisar User
        </button>
      </div>
      {/* All Infos */}
      <div className={styles.allInfos}>
        {/* Avatar + username + Location + Follows */}
        <div className={styles.primaryHeader}>
          <div className={styles.imageAround}>
            <Image
              src={`${dataUser.avatar_url === undefined
                ? "/undefinedUser.png"
                : `${dataUser.avatar_url}`
                }`}
              layout="fill"
              alt="img"
            />
          </div>
          {/* Follows + Username + Location */}
          <div className={styles.rigthPrimaryHeader}>
            <span className={styles.userLocation}>
              {dataUser.login} - {dataUser.location}
            </span>
            {/* Follows and Following */}
            <div
              className={styles.followsFollowing}>
              <span className={styles.btnFollowFollowing}>seguidores</span>
              <span className={styles.btnFollowFollowing}>{dataUser.followers}</span>
              <span style={{ marginLeft: "10px" }}></span>
              <span className={styles.btnFollowFollowing}>seguindo</span>
              <span className={styles.btnFollowFollowing}>{dataUser.following}</span>
            </div>
          </div>
        </div>
        <hr />
        {/* Infos det*/}
        <div className={styles.infoDetalhada}>
          <div className={styles.aboutItem}>
            <h2>Bio:</h2><span>{dataUser.bio}</span>
          </div>
          <div className={styles.aboutItem}>
            <h2>Site:</h2>
            <Link href={`${dataUser.blog === undefined
              ? "/"
              : `${dataUser.blog}`}`}>
              <a className={styles.linksProfile}>{dataUser.blog}</a>
            </Link>
          </div>
          <div className={styles.aboutItem}>
            <h2>Twitter:</h2><span>{dataUser.twitter_username}</span>
          </div>
          <div className={styles.aboutItem}>
            <h2>Repositorios:</h2><span>{dataUser.public_repos} -
              <Link
                href={`https://github.com/${dataUser.login}?tab=repositories` === undefined
                  ? "/"
                  : `https://github.com/${dataUser.login}?tab=repositories`}>
                <a className={styles.linksProfile}> Acessar </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}



// export const getStaticPaths = async (ctx) => {

//   return {
//     paths: [
//     ],
//     fallback: 'blocking'
//   }
// }

// export async function getStaticProps() {

//   const response = await fetch(`https://api.github.com/users/${username}`);
//   const data = await response.json();

//   return {
//     props: {
//       user: data
//     }
//   }
// }



// impede qualquer renderização se não estiver logado
// export const getServerSideProps = async ({ req }) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default withAuth(DynamicPage);
