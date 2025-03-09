const styles = {
  loader: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 49,
    background: "#5c5c65 url(/gear-spinner.svg) no-repeat center / 20%",
  },
};

const Loader = () => <div className="loader" style={styles.loader}></div>;

export default Loader;
