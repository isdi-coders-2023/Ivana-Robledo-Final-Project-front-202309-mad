import { Card } from '../card/card';
import styles from './list.module.scss';
import { Recipe } from '../../entities/recipe';

type Props = {
  recipesToRender: Recipe[] | undefined;
};

export function List({ recipesToRender }: Props) {
  return (
    <div className={styles.listContainer}>
      <ul>
        {recipesToRender?.map((item: Recipe) => (
          <Card key={item.id} recipe={item}></Card>
        ))}
      </ul>
    </div>
  );
}
