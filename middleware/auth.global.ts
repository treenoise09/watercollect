function isAuthenticated(): boolean { 
    return localStorage.getItem("sid") ? true : false 
}
// ---cut---
export default defineNuxtRouteMiddleware((to, from) => {

  if (to.path === '/login') {
    return
  }

  if (!isAuthenticated()) {
    return navigateTo('/login')
  }
})