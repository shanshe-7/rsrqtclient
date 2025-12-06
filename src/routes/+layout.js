import { getAuthState } from "$lib/auth";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";

const protectedRoutes = ["/upload-file", "/instruction"];
const authRoutes = ["/login", "/forgot-password"];

export const load = ({ url }) => {
  if (browser) {
    const { isAuthenticated } = getAuthState();

    const isProtectedRoute = protectedRoutes.some((route) =>
      url.pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some((route) =>
      url.pathname.startsWith(route)
    );

    if (isAuthRoute && isAuthenticated) {
      throw redirect(307, "/");
    }

    if (isProtectedRoute && !isAuthenticated) {
      goto(`/login?redirect=${url.pathname}`);
      return {};
    }
  }

  return {};
};
