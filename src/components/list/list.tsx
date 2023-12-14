import { useEffect } from 'react';
import { Card } from '../card/card';
import styles from './list.module.scss';
import { useRecipes } from '../../hooks/recipes.hook';
import { Recipe } from '../../entities/recipe';

type Props = {
  recipesToRender: Recipe[] | undefined;
};
export function List({ recipesToRender }: Props) {
  const { loadAllRecipes } = useRecipes();

  useEffect(() => {
    loadAllRecipes();
  }, []);

  return (
    <div className="list-container">
      <div className="list-title-container">
        <h2>List</h2>
      </div>
      <ul className={styles.recipesList}>
        {recipesToRender?.map((item) => (
          <Card key={item.id} recipe={item}></Card>
        ))}
      </ul>
    </div>
  );
}
