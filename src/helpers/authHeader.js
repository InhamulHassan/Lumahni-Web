export function authHeader() {
    // return authorization header with jwt token
    let auth = JSON.parse(localStorage.getItem('auth_token'));

    if (auth && auth.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
