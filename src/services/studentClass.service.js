// // /* eslint-disable no-await-in-loop */
// // /* eslint-disable prefer-destructuring */
// // /* eslint-disable no-restricted-syntax */
// // /* eslint-disable no-console */
// // /* eslint-disable prettier/prettier */
// const axios = require('axios');
// const cron = require('node-cron');
// const {School} = require('../models'); // Import your School model

// // // Function to fetch data from the API
// // // Function to fetch data from the API
// // const fetchDataFromAPI = async (code) => {
// //     try {
// //       const response = await axios.get(`http://143.244.130.179/Webservices/boys_girls_ratio/${code}`);
// //       // Check if response data is empty or contains only whitespace
// //     //   console.log(response.data)
// //       if (!response.data) {
// //         console.error('Empty or invalid data received from API');
// //         return null;
// //       }
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching data from API:', error);
// //       return null;
// //     }
// //   };

// // // Function to update MongoDB documents
// // const updateMongoDB = async (code, data) => {
// //   try {
// //     await School.updateOne({ code }, {
// //       resultlist: data.resultlist,
// //       total_student: data.total_student,
// //       total_teacher: data.total_teacher
// //     });
// //     console.log(`MongoDB updated for code: ${code}`);
// //   } catch (error) {
// //     console.error('Error updating MongoDB:', error);
// //   }
// // };

// // // Schedule job to run every day at 11 PM '0 23 * * *'
// // cron.schedule('40 16 * * *', async () => {
// //   try {
// //     // Fetch all code values from MongoDB
// //     const schools = await School.find({}, 'code');
// //     console.log(schools)
// //     for (const school of schools) {
// //       const code = school.code;
// //       // Fetch data from API based on code
// //       const data = await fetchDataFromAPI(code);
// //       if (data) {
// //         // Update MongoDB with fetched data
// //         await updateMongoDB(code, data);
// //       }
// //     }
// //   } catch (error) {
// //     console.error('Error during job execution:', error);
// //   }
// // }, {
// //   scheduled: true,
// //   timezone: 'Asia/Kolkata' // Adjust timezone as per your requirement
// // });

// const addDummyDataForAllSchools = async () => {
//     try {
//       // Find all schools
//       const schools = await School.find({});

//       // Loop through each school and update the specified fields with dummy data
//       for (const school of schools) {
//         const randomNumberOfStudents = Math.floor(Math.random() * (999 - 100 + 1)) + 100; // Random number between 100 and 999

//         school.resultlist = [];
//         for (let i = 0; i < 9; i++) { // Add data for 2 students
//           const male = Math.floor(Math.random() * (99 - 10 + 1)) + 10; // Random 2-digit number for male
//           const female = Math.floor(Math.random() * (99 - 10 + 1)) + 10; // Random 2-digit number for female
//           const randomClass =  Math.floor(Math.random() * 12) + 1; // Random class between 1 and 12
//           const section = Math.random() < 0.5 ? 'A' : 'B'; // Random section A or B
//           const class_id = randomClass; // Random 3-digit number for class_id
//           const section_id = section === 'A' ? 1 : 2; // If section is A, section_id is 1, else 2

//           school.resultlist.push({ male, female, class:`Class ${randomClass}`, section, class_id, section_id });
//         }

//         school.total_student = randomNumberOfStudents;
//         school.total_teacher = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // Random number between 5 and 20

//         // Save the updated school document
//         await school.save();
//         console.log(`Dummy data added for school with code: ${school.code}`);
//       }

//       console.log('Dummy data added for all schools.');
//     } catch (error) {
//       console.error('Error adding dummy data:', error);
//     }
//   };

//   addDummyDataForAllSchools()
//   .then(() => {
//     console.log('Dummy data added for all schools');
//   })
//   .catch((error) => {
//     console.error('Error adding dummy data:', error);
//   });
