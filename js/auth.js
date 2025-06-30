// Gestion simple de l'authentification côté client (mock)
// À remplacer par une vraie API plus tard

export function login(username, password) {
  // Simule une authentification (à remplacer par appel API)
  if (username === "demo" && password === "demo") {
    localStorage.setItem("arvest_user", JSON.stringify({ username }));
    return { success: true, user: { username } };
  }
  return { success: false, message: "Identifiants incorrects" };
}

export function logout() {
  localStorage.removeItem("arvest_user");
}

export function getCurrentUser() {
  const user = localStorage.getItem("arvest_user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!getCurrentUser();
}