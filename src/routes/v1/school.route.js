/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { schoolValidation } = require('../../validations');
const { schoolController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
//   .post(auth('superadmin'), validate(userValidation.createUser), schoolController.createSchool)
  .get(auth('superadmin'), validate(schoolValidation.getSchools), schoolController.getSchools);

router
  .route('/:udisecode')
  .get(auth('superadmin'), validate(schoolValidation.getSchool), schoolController.getSchool);
//   .patch(auth('superadmin'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('superadmin'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: School
 *   description: School management and retrieval
 */

/**
 * @swagger
 * /schools:
 *   get:
 *     summary: Get all school
 *     description: Only admins can retrieve all school.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: school name
 *       - in: query
 *         name: udisecode
 *         schema:
 *           type: string
 *         description: school udisecode
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/School'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /schools/{udisecode}:
 *   get:
 *     summary: Get a school
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other school.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: udisecode
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/School'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */