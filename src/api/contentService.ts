import axios from 'axios';

const API_URL = 'https://api.example.com/content'; // Replace with your actual API URL

export const fetchContent = async (filters = {}, searchTerm = '', page = 1) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                ...filters,
                search: searchTerm,
                page: page,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
    }
};