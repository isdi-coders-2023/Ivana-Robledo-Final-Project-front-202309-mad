import { AppRoutes } from '../app.routes/app.routes';
import { Header } from '../header/header';
export function App() {
  return (
    <main>
      <Header></Header>
      <AppRoutes></AppRoutes>
    </main>
  );
}
