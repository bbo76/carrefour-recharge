export default defineNuxtRouteMiddleware((to, from) => {
    if (isAuthenticated() === false) {
        return navigateTo('/auth')
    }
})

function isAuthenticated() {
    const bearer = useCookie('apollo:default.token')
    return bearer.value !== undefined
}
