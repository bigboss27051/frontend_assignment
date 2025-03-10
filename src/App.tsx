import { Provider } from 'react-redux'
import FoodsPage from './features/foods/pages'
import { store } from './store'

import './App.scss'

function App() {
  return (
    <Provider store={store}>
      <FoodsPage />
    </Provider>
  );
}

export default App;
