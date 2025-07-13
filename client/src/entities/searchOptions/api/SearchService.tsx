import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import type { SearchT } from '../model/searchType';
import { searchSchema } from '../model/searchSchema';

class SearchService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getSearchResults(query: string): Promise<SearchT> {
    try {
      const response = await this.client.get<SearchT>(`/search?query=${encodeURIComponent(query)}`);
      return searchSchema.parse(response.data);
    } catch (error) {
      return {
        success: false,
        results: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export default new SearchService(axiosInstance);
