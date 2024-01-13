import express from 'express'
import * as videoController from '../controllers/video-controller.js'
const router = express.Router();

router.post('/',videoController.uploadVideo);
router.get('/:id',videoController.getVideo);
export default router;