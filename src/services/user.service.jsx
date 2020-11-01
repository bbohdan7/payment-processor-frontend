import http from '../http-common'

class UserService {

    all() {
        return http.get("/users")
    }

    find(id) {
        return http.get(`/users/${id}`);
    }

    create(data) {
        return http.post("/users", data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }
    
    findByFullName(firstname, lastname){
        return http.get("/users/search", { params: { firstname: firstname, lastname: lastname } })
    }

}

export default new UserService();