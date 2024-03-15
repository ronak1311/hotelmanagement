export function useUser() {
  let user = JSON.parse(localStorage.getItem("user"));
  let isAuthenticated = false
  if (user) {
    isAuthenticated = user.isAuthenticated;
  }
  console.log("AAA", isAuthenticated);
  return { user, isAuthenticated };
}
