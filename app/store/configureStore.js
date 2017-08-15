import devStore from './configureStore.dev';
import prodStore from './configureStore.prod.js'; // fails without .js

export default process.env.NODE_ENV === 'production' ? prodStore : devStore;
