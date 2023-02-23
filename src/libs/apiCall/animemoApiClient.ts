import { httpClient } from './httpClient'

export const animemoApiClient = {
  async get<T = any>(url: string, options?: RequestInit): Promise<T> {
    return httpClient.get(url)
  },

  async post<T = any>(url: string, body: object, options?: RequestInit): Promise<T> {
    return httpClient.post(url, body)
  },

  async put<T = any>(url: string, body: object, options?: RequestInit): Promise<T> {
    return httpClient.put(url, body)
  },

  async patch<T = any>(url: string, body: object, options?: RequestInit): Promise<T> {
    return httpClient.patch(url, body)
  },

  async delete<T = any>(url: string, options?: RequestInit): Promise<T> {
    return httpClient.delete(url)
  },
}
