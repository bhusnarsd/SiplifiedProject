/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const { schoolAnalysisController } = require('../../controllers');

const router = express.Router();

router
  .route('/data-analysis-states')
  .get(schoolAnalysisController.getSchoolCategoryCounts)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SchoolAnalysis
 *   description: APIs for managing School Analysis  data
 */

/**
 * @swagger
 * /school-analysis/data-analysis-states:
 *   get:
 *     summary: Get counts of schools for each school category
 *     tags: [SchoolAnalysis]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: School category ID
 *                   count:
 *                     type: number
 *                     description: Count of schools for the category
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

// Your other route definitions...

module.exports = router;
