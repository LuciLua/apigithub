import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "../../utils/withAuth";
import styles from "../user/user.module.scss";
import { username } from "../";

function DynamicPage(props) {
  const router = useRouter();

  // if( !router.isFallback){
  //     console.log('erro')
  // }

  // const id = router.query.id
  // mesma coisa

  const {
    query: { id },
  } = router;

  const { user } = props

  return (
    <>
      <div className={styles.container}>
        <h1>Hello {id}, this is your private page</h1>
        <Link href={"/"}>
          <a>Back to Home</a>
        </Link>
        <span>
          {user.login}
        </span>
      </div>
    </>
  );
}

export const getStaticPaths = async (ctx) => {

  return {
    paths: [
    ], 
    fallback: 'blocking'
  }
}

export async function getStaticProps(){

  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();

  return{
    props:{
      user: data
    }
  }
}



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
