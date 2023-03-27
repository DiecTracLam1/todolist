import { fetchApiUser } from "../features/api/fetchApiUser";
    
const userApi = {
    login(data){
        const url = '/auth/login';
        return fetchApiUser(url, {method: 'POST' , data})
    }
}
export default userApi