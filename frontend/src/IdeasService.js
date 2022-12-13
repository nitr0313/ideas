import axios from 'axios';

const API_URL = 'http://localhost:8000/api';


export default class IdeasService {

    constructor() {
    }

    getIdeas() {
        const url = `${API_URL}/v1/ideas/`;
        return axios.get(url).then(response => response.data);
    }

    getIdeasByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    getIdea(pk) {
        const url = `${API_URL}/v1/ideas/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    deleteIdea(idea) {
        const url = `${API_URL}/v1/ideas/${idea.pk}`;
        return axios.delete(url);
    }

    createIdea(idea) {
        const url = `${API_URL}/v1/ideas/`;
        return axios.post(url, idea);
    }

    updateIdea(idea) {
        const url = `${API_URL}/v1/ideas/${idea.pk}`;
        return axios.put(url, idea);
    }
}