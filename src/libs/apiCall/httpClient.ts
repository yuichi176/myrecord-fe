import { FailedCallApiError } from '@/types/errors/FailedCallApiError'
import lodash from 'lodash'

export const httpClient = {
  async get<T = any>(url: string, options?: RequestInit): Promise<T> {
    return request(url, options)
  },

  async post<T = any>(url: string, body: object, options?: RequestInit): Promise<T> {
    return request(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    })
  },

  async put<T = any>(url: string, body: object, options?: RequestInit): Promise<T> {
    return request(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    })
  },

  async patch<T = any>(url: string, body: object, options?: RequestInit): Promise<T> {
    return request(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    })
  },

  async delete<T = any>(url: string, body?: object, options?: RequestInit): Promise<T> {
    return request(url, {
      method: 'DELETE',
      body: JSON.stringify(body),
      ...options,
    })
  },
}

async function request(url: string, options?: RequestInit): Promise<any> {
  const mergeOptions = lodash.merge(
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    options,
  )
  try {
    const response = await fetch(url, mergeOptions)

    if (!response.ok) {
      throw new FailedCallApiError(response.statusText, response.status)
    }
    return await response.json().catch(() => null)
  } catch (error) {
    if (error instanceof FailedCallApiError) {
      throw new FailedCallApiError(error.message, error.statusCode)
    }
    throw new FailedCallApiError(`Failed call animemo-api: ${error}`, (error as any).statusCode || 500)
  }
}
