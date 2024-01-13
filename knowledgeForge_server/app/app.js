import cors from 'cors'
import express from 'express';
import mongoose from 'mongoose';
import registerRouter from './routes/index.js';
import dotenv from 'dotenv';
import Grid from 'gridfs-stream';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';

dotenv.config();
export let gridFsBucket;
export let upload;
export let uploadImage;
const initialize = async(app)=>{
    //debug
    app.use(cors({
        origin:'http://localhost:3000',
        credentials:true,
    }));
    app.use(express.json({limit:'10mb'}));
    app.use(express.urlencoded());
    app.use(cookieParser());
    
    mongoose.connect(process.env.MONGO_CONN);
    const conn = mongoose.connection;
    let gfs;

    conn.once('open',()=>{
         gfs = Grid(conn.db,mongoose.mongo);
         gfs.collection('videos');
         console.log('connection open')
         gridFsBucket=new mongoose.mongo.GridFSBucket(conn.db, {
          bucketName: 'videos',
        });
    });
    const imageStorage = multer.memoryStorage();
uploadImage = multer({ storage: imageStorage }).single();
    const storage = await new GridFsStorage({
        url:process.env.MONGO_CONN,
        file: (req, file) => {
          return new Promise((resolve, reject) => {
              const filename = file.originalname;
              const fileInfo = {
                filename: filename,
                bucketName: 'videos'
              };
              resolve(fileInfo);
          });
        }
      });
     upload= multer({ storage: storage });
    //  app.post('/video', upload.single('video'), (req, res) => {
    //     console.log('///');
    //       res.status(201).send('Video uploaded successfully');
        
      
        
    //   });
 
    registerRouter(app);

}

export default initialize;