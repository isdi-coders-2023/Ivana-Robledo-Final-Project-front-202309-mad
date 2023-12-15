import { Link } from 'react-router-dom';
import { List } from '../components/list/list';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function MainPage() {
  const { recipes } = useSelector((state: RootState) => state.RecipesState);

  return (
    <>
      <div className="create-link-button">
        <Link to={'/create'}>
          <button type="button">Crea receta</button>
        </Link>
      </div>
      <List recipesToRender={recipes}></List>
    </>
  );
}
