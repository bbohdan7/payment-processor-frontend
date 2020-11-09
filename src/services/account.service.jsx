import http from '../http-common'

class AccountService {

    all() {
        return http.get("/accounts");
    }

    find(id) {
        return http.get(`/accounts/${id}`);
    }

    create(data) {
        return http.post("/accounts", data);
    }

    update(id, data) {
        return http.put(`/accounts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/accounts/${id}`);
    }

    findByUser(firstname, lastname) {
        return http.get("/accounts/search", { params: { firstname: firstname, lastname: lastname } });
    }

    findByOwner(id) {
        return http.get(`/accounts/owner/${id}`);
    }

}

export default new AccountService();