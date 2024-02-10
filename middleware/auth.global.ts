import axios from "axios";

async function isAuthenticated(): Promise<boolean> {
    try{
        const response = await axios.get('http://localhost:8000/api/method/frappe.auth.get_logged_user', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        });
        return response.status != 200
    }catch (e) {
        return false
    }
}

export default defineNuxtRouteMiddleware((to, from) => {
    if(to.path === '/'){
        return navigateTo('/login')
    }
    if (to.path === '/login') {
        return
    }

    if (!isAuthenticated()) {
        return navigateTo('/login')
    }
    const USER = 'User'
    const USER_PATH = ["/homeselect","/AddBill"]
    const WATER_BILL_COLLECTOR = 'Water Bill Collector'
    const TREASURER = 'Treasurer'
    const TREASURER_PATH = ["/report"]
    const role = localStorage.getItem('role')
    switch (role){
        case USER:
            if(!USER_PATH.includes(to.path)){
                return navigateTo('/homeselect')
            }
            return
        case WATER_BILL_COLLECTOR:
            return
        case TREASURER:
            if(!TREASURER_PATH.includes(to.path)){
                return navigateTo('/report')
            }
            return
        default:
            return navigateTo('/login')
    }
})