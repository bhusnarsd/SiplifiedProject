const express = require('express');
// const auth = require('../../middlewares/auth');
const { attendanceController } = require('../../controllers');

const router = express.Router();

router.route('/class-wise-count').get(attendanceController.getAllAttendanceCount);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: APIs for managing attendance data
 */

/**
 * @swagger
 * /attendance/class-wise-count:
 *   get:
 *     summary: Get class-wise attendance count
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 classWiseAttendance:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       classSection:
 *                         type: string
 *                       totalPresent:
 *                         type: integer
 *                       totalAbsent:
 *                         type: integer
 *                       presentPercent:
 *                         type: string
 *                       absentPercent:
 *                         type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
