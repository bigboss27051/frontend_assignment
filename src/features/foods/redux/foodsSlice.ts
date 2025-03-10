import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import foods from '../../../data.json'
import { RootState } from '../../../store'

export const SLICE_NAME = 'foods';

export const fetchFoods = createAsyncThunk(
  `${SLICE_NAME}/fetchFoods`,
  async (_: void, { rejectWithValue }) => {
    try {
      const data = foods;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IFood {
  type: string;
  name: string;
  isSelected: boolean;
}

interface FoodsState {
  isFetching: boolean;
  error: null | Error;
  data: IFood[];
}

const initialState: FoodsState = {
  isFetching: false,
  error: null,
  data: [],
};

const foodsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateSelectedList(state, action: PayloadAction<string>) {
      const foodName = action.payload;
      const currList = [...state.data];
      const indexTarget = currList.findIndex((i) => i.name === foodName);
      const updatesFood: IFood = {
        ...currList[indexTarget],
        isSelected: !currList[indexTarget].isSelected,
      };
      const newList = [
        ...currList.slice(0, indexTarget),
        updatesFood,
        ...currList.slice(indexTarget + 1),
      ];
      state.data = newList;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.isFetching = false;
        state.error = null;
        state.data = action.payload.map((i) => ({
          type: i.type,
          name: i.name,
          isSelected: false,
        }))
      })
      .addCase(fetchFoods.rejected, (state) => {
        state.isFetching = false;
        state.error = Error('fetch data error');
      }),
});

export const isFetching = (state: RootState) => state.foods.isFetching;
export const foodsList = (state: RootState) => state.foods.data;

export const { updateSelectedList } = foodsSlice.actions;
export default foodsSlice.reducer;
