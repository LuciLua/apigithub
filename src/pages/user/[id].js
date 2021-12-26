import { useRouter } from "next/router";
import { GetStaticPaths } from "next";

function DynamicPage(props) {
  const router = useRouter();

  const { nome } = props;

  console.log(router);
  // console.log(router.query.id)

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
      <h1>Hello {id}</h1>
      <h2>{nome}</h2>
    </>
  );
}

// export async function getStaticProps(ctx){
//     const nome = 'luci'
//     return({
//         props: {
//             nome
//         }
//     })
// }

export default DynamicPage;
