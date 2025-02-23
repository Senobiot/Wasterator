const styles = {
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 100,
    background: '#5c5c65 url(/public/loader-fs.svg) no-repeat center / cover',
  },
};

const Loader = () => <div className="loader" style={styles.loader}></div>;

export default Loader;
