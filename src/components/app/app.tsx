import { AppRoutes } from '../app.routes/app.routes';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import styles from './app.module.scss';
export function App() {
  return (
    <main>
      <Header></Header>
      <div className={styles['main-div']}>
        <AppRoutes></AppRoutes>
      </div>
      <Footer></Footer>
    </main>
  );
}
