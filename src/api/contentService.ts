import axios from 'axios';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data'; // Replace with your actual API URL

export const fetchContent = async ({page = 1, pageSize = 10}) => {
  try {
    const response = await axios.post(API_URL, {
      pageSize,
      page,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};
