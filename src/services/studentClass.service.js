/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const axios = require('axios');
const cron = require('node-cron');
const {School} = require('../models'); // Import your School model

// Function to fetch data from the API
const fetchDataFromAPI = async (code) => {
  try {
    const response = await axios.get(`http://143.244.130.179/Webservices/boys_girls_ratio/${code}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return null;
  }
};

// Function to update MongoDB documents
const updateMongoDB = async (code, data) => {
  try {
    await School.updateOne({ code }, {
      resultlist: data.resultlist,
      total_student: data.total_student,
      total_teacher: data.total_teacher
    });
    console.log(`MongoDB updated for code: ${code}`);
  } catch (error) {
    console.error('Error updating MongoDB:', error);
  }
};

// Schedule job to run every day at 11 PM '0 23 * * *'
cron.schedule('*/5 * * * *', async () => {
  try {
    // Fetch all code values from MongoDB
    const schools = await School.find({}, 'code');
    for (const school of schools) {
      const code = school.code;
      // Fetch data from API based on code
      const data = await fetchDataFromAPI(code);
      if (data) {
        // Update MongoDB with fetched data
        await updateMongoDB(code, data);
      }
    }
  } catch (error) {
    console.error('Error during job execution:', error);
  }
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata' // Adjust timezone as per your requirement
});
