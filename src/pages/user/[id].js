import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "../../utils/withAuth";
import styles from "../user/user.module.scss";
import Info from "../../components/Info";

function DynamicPage() {
  const router = useRouter();

  // if( !router.isFallback){
  //     console.log('erro')
  // }

  // const id = router.query.id
  // mesma coisa

  const {
    query: { id },
  } = router;

  return (
    <>
      <div className={styles.container}>
        <h1>Hello {id}, this is your private page</h1>
        <Info />
        <Link href={"/"}>
          <a>Back to Home</a>
        </Link>
      </div>
    </>
  );
}

// impede qualquer renderização se não estiver logado
export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default withAuth(DynamicPage);
