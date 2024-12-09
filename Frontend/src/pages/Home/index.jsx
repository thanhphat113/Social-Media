import CreatePost from "./components/CreatePost";
// import Information from "./components/Information";
import styles from "./Home.module.scss";

function Home() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.infor}>
                {/* <Information /> */}
            </div>
            <div className={styles.posts}>
                <CreatePost/>
            </div>
        </div>
    );
}

export default Home;
