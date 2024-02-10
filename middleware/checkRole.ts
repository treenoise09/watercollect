export default defineNuxtRouteMiddleware((to, from) => {
    const USER = 'User'
    const WATER_BILL_COLLECTOR = 'Water Bill Collector'
    const TREASURER = 'Treasurer'
    const role = localStorage.getItem('role')
    switch (role){
        case USER:
            return navigateTo('/homeselect')
        case WATER_BILL_COLLECTOR:
            return
        case TREASURER:
            return navigateTo('/report')
        default:
            return navigateTo('/login')
    }
})