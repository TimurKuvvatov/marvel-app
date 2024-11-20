import { makeAutoObservable, runInAction } from 'mobx';
import api from '../api/helpers/axios';
import { Character, Comic } from '../types/dataTypes';
import { Md5 } from 'ts-md5';
import { AxiosResponse } from 'axios';

class PostsStore {
  characters: Character[] = [];
  comics: Comic[] = [];
  totalCharacters: number = 0;
  totalComics: number = 0;
  searchTerm: string = '';
  loading: boolean = false;
  error: string | null = null;
  currentPage: number = 0;
  pageSize: number = 12;

  constructor() {
    makeAutoObservable(this);
  }

  async getTotalCharacters() {
    const publicKey = import.meta.env.VITE_PUBLIC_API_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_API_KEY;
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + privateKey + publicKey);
    try {
      const response: AxiosResponse<{ data: { total: number } }> = await api.get('/characters', {
        params: {
          apikey: publicKey,
          ts: timestamp,
          hash: hash,
          limit: 1,
        },
      });
      runInAction(() => {
        this.totalCharacters = response.data.data.total;
      });
    } catch (error) {
      console.error('Error fetching total characters:', error);
    }
  }

  async getTotalComics() {
    const publicKey = import.meta.env.VITE_PUBLIC_API_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_API_KEY;
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + privateKey + publicKey);
    try {
      const response: AxiosResponse<{ data: { total: number } }> = await api.get('/comics', {
        params: {
          apikey: publicKey,
          ts: timestamp,
          hash: hash,
          limit: 1,
        },
      });
      runInAction(() => {
        this.totalComics = response.data.data.total;
      });
    } catch (error) {
      console.error('Error fetching total comics:', error);
    }
  }

  async getPostsList(searchTerm?: string, type?: 'character' | 'comic') {
    this.loading = true;
    this.error = null;
    const publicKey = import.meta.env.VITE_PUBLIC_API_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_API_KEY;
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + privateKey + publicKey);

    try {
      let charactersResponse: AxiosResponse<{ data: { results: Character[]; total: number } }>;
      let comicsResponse: AxiosResponse<{ data: { results: Comic[]; total: number } }>;

      if (type === 'character') {
        charactersResponse = await api.get('/characters', {
          params: {
            limit: this.pageSize,
            offset: this.currentPage * this.pageSize,
            ...(searchTerm ? { nameStartsWith: searchTerm } : {}),
            apikey: publicKey,
            ts: timestamp,
            hash: hash,
          },
        });
        runInAction(() => {
          this.characters = charactersResponse.data.data.results;
          this.totalCharacters = charactersResponse.data.data.total;
        });
      } else if (type === 'comic') {
        comicsResponse = await api.get('/comics', {
          params: {
            limit: this.pageSize,
            offset: this.currentPage * this.pageSize,
            ...(searchTerm ? { titleStartsWith: searchTerm } : {}),
            apikey: publicKey,
            ts: timestamp,
            hash: hash,
          },
        });
        runInAction(() => {
          this.comics = comicsResponse.data.data.results;
          this.totalComics = comicsResponse.data.data.total;
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An unknown error occurred';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
  async getDetails(id: number, type: 'character' | 'comic') {
    const publicKey = import.meta.env.VITE_PUBLIC_API_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_API_KEY;
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + privateKey + publicKey);

    try {
      const response: AxiosResponse = await api.get(`/${type}s/${id}`, {
        params: {
          apikey: publicKey,
          ts: timestamp,
          hash: hash,
        },
      });
      return response.data.data.results[0];
    } catch (error) {
      console.error(`Error fetching details for ${type} with id ${id}:`, error);
      throw error;
    }
  }
  async loadNextPage(type?: 'character' | 'comic') {
    if (
      (this.currentPage + 1) * this.pageSize <
      (type === 'character' ? this.totalCharacters : this.totalComics)
    ) {
      this.currentPage += 1;
      await this.getPostsList(this.searchTerm, type);
    }
  }

  async loadPreviousPage(type?: 'character' | 'comic') {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
      await this.getPostsList(this.searchTerm, type);
    }
  }

  async loadToFirstPage(type?: 'character' | 'comic') {
    this.currentPage = 0;
    await this.getPostsList(this.searchTerm, type);
  }

  async loadToLastPage(type?: 'character' | 'comic') {
    this.currentPage =
      Math.ceil((type === 'character' ? this.totalCharacters : this.totalComics) / this.pageSize) -
      1;
    await this.getPostsList(this.searchTerm, type);
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  resetSearch() {
    this.searchTerm = '';
    this.currentPage = 0;
  }
}

export default new PostsStore();
