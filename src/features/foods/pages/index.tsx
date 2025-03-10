import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/store'
import {
  fetchFoods,
  foodsList,
  updateSelectedList
} from '../redux/foodsSlice'

const FoodsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const foodsListState = useAppSelector(foodsList);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const handleItemClick = (item: string) => {
    dispatch(updateSelectedList(item));
  };

  return (
    <div className="container">
      <div className="w-48 p-2 border rounded">
        {foodsListState
        .filter((item) => !item.isSelected)
        .map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item.name)}
            className="item"
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="items-list">
        <h4 >Fruit</h4>
      {foodsListState
              .filter((item) => item.isSelected && item.type === 'Fruit')
              .map((item, index) => (
                <div key={index}
                className="item category-item"
                onClick={() => handleItemClick(item.name)}
                >
                  {item.name}
                </div>
              ))}
      </div>
      <div className="items-list">
      <h4>Vegetable</h4>

      {foodsListState
              .filter((item) => item.isSelected && item.type === 'Vegetable')
              .map((item, index) => (
                <div key={index}
                className="item category-item"
                onClick={() => handleItemClick(item.name)}
                >
                  {item.name}
                </div>
              ))}

      </div>
    </div>
  );
};

export default FoodsPage;
