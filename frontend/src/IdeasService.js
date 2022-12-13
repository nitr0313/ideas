import axios from 'axios';

const API_URL = 'http://localhost:8000/api';


export default class IdeasService {

    constructor() {
    }

    getCustomers() {
        const url = `${API_URL}/v1/ideas/`;
        return axios.get(url).then(response => response.data);
    }

    getCustomersByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    getCustomer(pk) {
        const url = `${API_URL}/v1/ideas/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    deleteCustomer(idea) {
        const url = `${API_URL}/v1/ideas/${idea.pk}`;
        return axios.delete(url);
    }

    createCustomer(idea) {
        const url = `${API_URL}/v1/ideas/`;
        return axios.post(url, idea);
    }

    updateCustomer(idea) {
        const url = `${API_URL}/v1/ideas/${idea.pk}`;
        return axios.put(url, idea);
    }
}