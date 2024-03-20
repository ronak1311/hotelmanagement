export function useUser() {
  let user = JSON.parse(localStorage.getItem("user"));
  let isAuthenticated = false
  if (user) {
    isAuthenticated = Boolean(user.isAuthenticated);
  }
  return { user, isAuthenticated };
}
