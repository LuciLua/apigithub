import styles from "../../components/Info/info.module.scss";

export const getStaticProps = async () => {
  const user = "Luci";

  console.log(user);

  return {
    props: {
      user,
    },
  };
};

function Info(props) {
  const { user } = props;
  console.log(props);

  return (
    <>
      <div className={styles.infoBox}>
        <div className={styles.info}>
          <embed src="/info" width={800} height={400} />
        </div>
      </div>
    </>
  );
}

export default Info;
