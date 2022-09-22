export const applicationJson = 'application/json';

export const URL = {
    base: 'https://localhost:7139/api/',
    user: {
        signup: 'user/signup',
        signin: 'user/signin',
        getById: 'user',
        forgetPassword: 'user/forget-password',
        recoverPassword: 'user/recover-password',
    }, 
    client: {
        getAll: 'client/get',
        create: '/client/create',
    }
}