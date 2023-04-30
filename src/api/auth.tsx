import instance from "./instance";

export const SigNin = (user: any) => {
    return instance.post('/signin', user)
}
export const Signup = (user: any) => {
    return instance.post('/signup', user)
}