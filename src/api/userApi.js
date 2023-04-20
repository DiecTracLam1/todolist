import { fetchApi } from "../features/api/fetchApi";
    
const userApi = {
    login(data){
        const url = '/auth/login';
        return fetchApi(url, {method: 'POST' , data})
    }
}
export default userApi