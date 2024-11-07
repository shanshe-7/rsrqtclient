// lib/api/interceptor.js
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export const fetchWithInterceptor = async (url, options = {}) => {
  const { isPublic = false, ...otherOptions } = options;

  const defaultOptions = {
    headers: {
      ...(!isPublic &&
        localStorage.getItem("token") && {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
    },
  };

  const fetchOptions = {
    ...defaultOptions,
    ...otherOptions,
    headers: {
      ...defaultOptions.headers,
      ...otherOptions.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (response.status === 401 && !isPublic) {
      localStorage.removeItem("token");
    }

    const res = await response.json();

    if (!response.ok) {
      return Promise.reject(res);
    }

    return res;
  } catch (error) {
    // Handle network errors
  }
};

// Create specific API methods
