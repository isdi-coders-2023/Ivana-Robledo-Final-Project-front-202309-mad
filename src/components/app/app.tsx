import { AppRoutes } from '../app.routes/app.routes';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
/* Import styles from './app.module.scss'; */
export function App() {
  return (
    <main>
      <Header></Header>
      <AppRoutes></AppRoutes>
      <Footer></Footer>
    </main>
  );
}
