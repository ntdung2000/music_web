import { combineReducers, createStore, Store } from "redux";
import { SongReducer } from "./song/state";
import { SongListReducer } from "./songList/state";

const rootReducer = combineReducers({
  song: SongReducer,
  songList: SongListReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export function configureStore(): Store<RootState> {
  return createStore(rootReducer);
}

const store: Store<RootState> = configureStore();
export default store;