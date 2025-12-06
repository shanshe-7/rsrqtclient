import { authStore } from "$lib/auth";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export const fetchWithInterceptor = async (url, options = {}) => {
  const { isPublic = false, isFile = false, ...otherOptions } = options;

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
      authStore.logout();
    }

    if (!response?.ok) {
      const isJSON = response.headers
        .get("content-type")
        ?.includes("application/json");

      const errorData = isJSON ? await response?.json() : response;

      return Promise.reject(errorData);
    }

    let res;
    if (isFile) {
      res = await response.blob();
    } else {
      res = await response?.json();
    }

    return res;
  } catch (error) {
    Promise.reject(error);
  }
};
