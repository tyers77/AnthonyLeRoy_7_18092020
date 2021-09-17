export function userAuth() {
  let token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    alert("Veuillez vous connectez");
    window.location.replace("http://localhost:8080/#/connexion");
  }
}
