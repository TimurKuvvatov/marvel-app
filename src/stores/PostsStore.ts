import { observable, action, makeObservable, runInAction } from 'mobx';

import api from '../api/helpers/axios';
import { Character, Comic } from '../types/dataTypes';

class PostsStore {
  @observable
  characters: Character[] = [];

  @observable
  comics: Comic[] = [];

  @observable
  loading: boolean = false;

  @observable
  error: string | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  fetchCharacters = async (offset: number = 0, nameStartsWith: string = ''): Promise<void> => {
    try {
      this.loading = true;
      this.error = null;

      const response = await api.get('/characters', {
        params: {
          offset,
          nameStartsWith,
        },
      });

      runInAction(() => {
        this.characters = response.data.data.results;
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = 'An unknown error occurred';
        }
      });
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  fetchComics = async (offset: number = 0, titleStartsWith: string = ''): Promise<void> => {
    try {
      this.loading = true;
      this.error = null;

      const response = await api.get('/comics', {
        params: {
          offset,
          titleStartsWith,
        },
      });

      runInAction(() => {
        this.comics = response.data.data.results;
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = 'An unknown error occurred';
        }
      });
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

const postsStore = new PostsStore();

export default postsStore;
