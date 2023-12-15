import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useParams } from 'react-router-dom';
import { Details } from '../components/details/details';
import { Recipe } from '../entities/recipe';

export function DetailsPage() {
  const { id } = useParams();
  const { recipes } = useSelector((state: RootState) => state.RecipesState);

  recipes.find((item) => item.id === id) as Recipe;

  return (
    <>
      <Details></Details>
    </>
  );
}
