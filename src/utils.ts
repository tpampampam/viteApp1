
export const BASE_URL='https://api.escuelajs.co/api/v1'

export const ROUTES = {
    HOME: '/',
    CART: '/cart',
    CATEGORY: '/categories/:id',
    PRODUCT:'/products/:id',
    PROFILE: '/profile'
}

export const shuffle = (arr: Array<any>) => [...arr].sort(() => 0.5 - Math.random())

export const buildUrl = (url: any, params: any) => {
    let urlWithParams = url;

    Object.entries(params).forEach(([key,value], i) => {
        const sign = !i ? '?' : '&';

        urlWithParams += `${sign}${key}=${value}`
    })

    return urlWithParams;
}

export const sumBy = (arr: Array<any>) => arr.reduce((acc, item) => acc += item ,0)