import axios from 'axios';
import getCookie from "./lib/csrfFetch";

const API_URL = 'http://127.0.0.1:8000/api';

const csrfToken = getCookie('csrftoken')


export default class IdeasService {

    constructor() {
    }

    getIdeas() {
        const url = `${API_URL}/v1/ideas/`;
        return axios.get(url).then(response => response.data).catch(error => console.log(error));
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
        return axios.delete(url, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
    }

    createIdea(idea) {
        const url = `${API_URL}/v1/ideas/`;
        return axios.post(url, idea);
    }

    updateIdea(idea) {
        const url = `${API_URL}/v1/ideas/${idea.pk}/`;
        return axios.put(url, idea, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
    }
}