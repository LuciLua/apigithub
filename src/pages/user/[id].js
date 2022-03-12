import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "../../utils/withAuth";
import styles from "../user/user.module.scss";
import { useState } from "react"
import Image from "next/image"
import { username } from "../";
import Layout from "../../components/Layout";

function DynamicPage(props) {
  const router = useRouter();

  if (!router.isFallback) {
    console.log('erro')
  }

  // const id = router.query.id
  // mesma coisa

  const {
    query: { id },
  } = router;

  const { user2 } = props

  console.log(user2)

  const [user, setUser] = useState("LuciLua");
  const [dataUser, setDataUser] = useState({});

  // function getGithubProfile() {
  //   fetch(`https://api.github.com/users/${user}`)
  //     .then((jonson) => jonson.json())
  //     .then((data) => setDataUser(data));
  // }

  async function getGithubProfile() {
    const resp = await fetch(`https://api.github.com/users/${user}`)
    const data = await resp.json()
    setDataUser(data)
  }

  const style_btn_follow = {
    background: "#fffa",
    fontSize: "13px",
    padding: "2px 10px",
    border: "1px solid #ddd4",
    color: "#191919",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    // <>
    //   <div className={styles.container}>
    //     <h1>Hello {id}, this is your private page</h1>
    //     <Link href={"/"}>
    //       <a>Back to Home</a>
    //     </Link>
    //     <span>
    //       {user.login}
    //     </span>
    //   </div>
    // </>

    <>
      <Layout>

        <h1>Pesquisando perfis no github</h1>
        <div className={styles.btnInput}>
          <input
            className={styles.setUserInput}
            type="text"
            onChange={(e) => { setUser(e.target.value) }}
            placeholder="username"
          />
          <button className={styles.setUserBtn} onClick={getGithubProfile}>
            Pesquisar User
          </button>
        </div>
        {/* All Infos */}
        <div className={styles.allInfos}>
          {/* Avatar + username + Location + Follows */}
          <div className={styles.primaryHeader}>
            <div style={{ display: "flex" }} id="teste">
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
                  <span style={style_btn_follow}>seguidores</span>
                  <span style={style_btn_follow}>{dataUser.followers}</span>
                  <span style={{ marginLeft: "10px" }}></span>
                  <span style={style_btn_follow}>seguindo</span>
                  <span style={style_btn_follow}>{dataUser.following}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Infos det*/}
          <div className={styles.infoDetalhada}>
            <h2>Bio:</h2><span>{dataUser.bio}</span>
            <h2>Site:</h2>
            <Link href={`${dataUser.blog}`}>
              <a className={styles.linksProfile}>{dataUser.blog}</a>
            </Link>
            <h2>Twitter:</h2><span>{dataUser.twitter_username}</span>
            <h2>Repositorios:</h2><span>{dataUser.public_repos} -
              <Link
                href={`https://github.com/${dataUser.login}?tab=repositories`}>
                <a className={styles.linksProfile}> Acessar </a>
              </Link>
            </span>
          </div>
        </div>

      </Layout>
    </>
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
