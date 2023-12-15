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
  }, [loadAllRecipes]);

  return (
    <div className={styles.listContainer}>
      <div className={styles.titleContainer}>
        <h2>List</h2>
      </div>
      <ul>
        <li>
          {recipesToRender?.map((item: Recipe) => (
            <Card key={item.id} recipe={item}></Card>
          ))}
        </li>
      </ul>
    </div>
  );
}
