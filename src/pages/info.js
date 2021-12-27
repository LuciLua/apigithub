import Link from "next/link";
import styles from "../styles/info.module.scss";
import Image from "next/image";

export const getStaticProps = async () => {
  const username = "LuciLua";

  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();

  return {
    props: {
      user: data,
    },
  };
};

function Info(props) {
  const { user } = props;

  return (
    <>
      <div className={styles.infoBox}>
        Este componente está sendo construido... Teste de rotas estáticas e
        dinâmicas está progredindo next é uma boa opção, preciso aprender
        contextApi, talvez ajude nisso
        <div className={styles.info}>
          <div className={styles.imgUser}>
            <Image layout="fill" objectFit="cover" src={user.avatar_url} />
          </div>
          <div className={styles.nameAndLocation}>
            <Link href={user.html_url}>
              <a>{user.login}</a>
            </Link>
            <div>{user.location}</div>
          </div>
          <span>
            Blog:
            <Link href={`https://${user.blog}`}>
              <a>{user.blog}</a>
            </Link>
          </span>
          <span>Followers: {user.followers}</span>
          <span>Following: {user.following}</span>
        </div>
      </div>
    </>
  );
}

export default Info;
