import { act, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { rootReducer, } from '../../../store'

import { configureStore, } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { fetchFoods } from '../redux/foodsSlice'
import FoodsPage from './index'



describe('Feature FoodsPage', () => {
  it('render list', async () => {

    const store = configureStore({
      reducer: rootReducer,
    })
    await store.dispatch(fetchFoods())
    const state = store.getState()
    render(
      <Provider store={store}>
        <FoodsPage />
      </Provider>
    )
    await waitFor(() => {
      expect(state.foods.isFetching).toEqual(false)
      expect(
        screen.queryAllByText(
          'Apple',
        ),
      ).toHaveLength(1)
    })
  })

  it('Action Fruit click', async () => {
    const store = configureStore({
      reducer: rootReducer,
    })
    await store.dispatch(fetchFoods())

    render(
      <Provider store={store}>
        <FoodsPage />
      </Provider>
    )

    await waitFor(() => {
      expect(
        screen.queryAllByText(
          'Apple',
        ),
      ).toHaveLength(1)
    })
    act(() => {
      screen.getByText('Apple').click()
    });

    await waitFor(() => {
      const state = store.getState()
      expect(state.foods.data.filter(i => i.name === 'Apple')[0].isSelected).toEqual(true)
    })
  })

  it('Action click select and un slected', async () => {
    const store = configureStore({
      reducer: rootReducer,
    })
    await store.dispatch(fetchFoods())

    render(
      <Provider store={store}>
        <FoodsPage />
      </Provider>
    )

    await waitFor(() => {
      expect(
        screen.queryAllByText(
          'Apple',
        ),
      ).toHaveLength(1)
    })
    act(() => {
      screen.getByText('Apple').click()
    });

    await waitFor(() => {
      const state = store.getState()
      expect(state.foods.data.filter(i => i.name === 'Apple')[0].isSelected).toEqual(true)
    })

    act(() => {
      screen.getByText('Apple').click()
    });

    await waitFor(() => {
      const state = store.getState()
      expect(state.foods.data.filter(i => i.name === 'Apple')[0].isSelected).toEqual(false)
    })
  })


});
