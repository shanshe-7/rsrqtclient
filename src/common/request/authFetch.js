async function authFetch(url, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  options.headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
      }

      const errorMessage = await response.json();
      throw new Error(errorMessage.message || "Something went wrong");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export { authFetch };
