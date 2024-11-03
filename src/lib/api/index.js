import { fetchWithInterceptor } from "./interceptor";

export const api = {
  get: (url, options = {}) => {
    return fetchWithInterceptor(url, {
      ...options,
      method: "GET",
    });
  },

  post: (url, data, options = {}) => {
    return fetchWithInterceptor(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put: (url, data, options = {}) => {
    return fetchWithInterceptor(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: (url, options = {}) => {
    return fetchWithInterceptor(url, {
      ...options,
      method: "DELETE",
    });
  },
};

export const publicApi = {
  get: (url, options = {}) => {
    return api.get(url, { ...options, isPublic: true });
  },

  post: (url, data, options = {}) => {
    return api.post(url, data, { ...options, isPublic: true });
  },

  put: (url, data, options = {}) => {
    return api.put(url, data, { ...options, isPublic: true });
  },

  delete: (url, options = {}) => {
    return api.delete(url, { ...options, isPublic: true });
  },
};
