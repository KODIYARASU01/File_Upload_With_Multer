import express from 'express';

let router=express.Router();
import { SingleFileUpload,MultipleFileUpload } from '../Controller/FileUpload.controller.js';
import upload from '../Multer/FileUpload.js'


router.post('/file',upload.single('image'), SingleFileUpload);
router.post('/files',upload.array('images',10), MultipleFileUpload);

export default router;