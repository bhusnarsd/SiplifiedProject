/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { sansthanValidation } = require('../../validations');
const { sansthanController } = require('../../controllers');

const router = express.Router();

router
.route('/')
.post(auth('superadmin'), validate(sansthanValidation.createSansthan), sansthanController.createSansthan)
.get(auth('superadmin'), validate(sansthanValidation.getAllSansthan), sansthanController.getAllSansthan);
router
  .route('/get-requests/sansthan')
  .get(auth('superadmin'), validate(sansthanValidation.getAllSansthan), sansthanController.getAllSansthanReq)
router
  .route('/:sansthanId')
  .get(auth('superadmin'), validate(sansthanValidation.getSansthan), sansthanController.getSansthanById)
  .patch(validate(sansthanValidation.updateSansthan), sansthanController.updateSansthan);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Sansthan
 *   description: APIs for managing sansthan data
 */

/**
 * @swagger
 * /sansthan:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Sansthan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sansthanName:
 *                 type: string
 *               userName:
 *                 type: string
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               state:
 *                  type: string
 *               registrationDist:
 *                  type: string
 *               mobNumber:
 *                  type: number
 *             example:
 *               sansthanName: fake name
 *               userName: fake@example.com
 *               password: password1
 *               mobNumber: 125435
 *               state: Maharashtra
 *               registrationDist: Pune
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sansthan'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /sansthan:
 *   get:
 *     summary: Get all sansthan data
 *     tags: [Sansthan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sansthanName
 *         in: query
 *         description: Name of the sansthan (optional)
 *         schema:
 *           type: string
 *       - name: userID
 *         in: query
 *         description: User ID for filtering (optional)
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sansthanName:
 *                     type: string
 *                   registrationDist:
 *                     type: string
 *                   state:
 *                     type: string
 *                   mobNumber:
 *                     type: number
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */
/**
 * @swagger
 * /sansthan/get-requests/sansthan:
 *   get:
 *     summary: Get all requested sansrhan
 *     tags: [Sansthan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sansthanName
 *         in: query
 *         description: Name of the sansthan (optional)
 *         schema:
 *           type: string
 *       - name: userID
 *         in: query
 *         description: User ID for filtering (optional)
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sansthanName:
 *                     type: string
 *                   registrationDist:
 *                     type: string
 *                   state:
 *                     type: string
 *                   mobNumber:
 *                     type: number
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */

/**
 * @swagger
 * /sansthan/{sansthanId}:
 *   get:
 *     summary: Get sansthan data by ID
 *     tags: [Sansthan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sansthanId
 *         in: path
 *         required: true
 *         description: ID of the sansthan
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sansthanName:
 *                   type: string
 *                 registrationDist:
 *                   type: string
 *                 state:
 *                   type: string
 *                 mobNumber:
 *                   type: number
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update sansthan data by ID
 *     tags: [Sansthan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sansthanId
 *         in: path
 *         required: true
 *         description: ID of the sansthan
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sansthanName:
 *                 type: string
 *               registrationDist:
 *                 type: string
 *               state:
 *                 type: string
 *               mobNumber:
 *                 type: number
 *             example:
 *               sansthanName: fake name
 *               registrationDist: fake district name
 *               state: fake name of state
 *               mobNumber: 876786070785
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sansthanName:
 *                   type: string
 *                 registrationDist:
 *                   type: string
 *                 state:
 *                   type: string
 *                 mobNumber:
 *                   type: number
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalServer'
 */
