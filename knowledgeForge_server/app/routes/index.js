import courseRouter from './course-route.js'
import moduleRouter from './module-route.js'
import instructorRouter from './instructor-route.js'
import userRouter from './user-route.js'
import uploadRouter from './video-route.js'
import authRouter from './auth-route.js'

export default (app) =>{
    app.use('/courses',courseRouter);
    app.use('/modules',moduleRouter);
    app.use('/instructor',instructorRouter);
    app.use('/user',userRouter);
    app.use('/video',uploadRouter);
    app.use('/auth',authRouter);

}




