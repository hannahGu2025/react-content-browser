import axios from 'axios';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data'; // Replace with your actual API URL

export const fetchContent = async (filters = {}, searchTerm = '', page = 1) => {
    try {
        const response = await axios.post(API_URL, {
               ...filters,
                keyword: searchTerm,
                page: page,
           
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
    }
};