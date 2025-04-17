import express , {Application} from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';



class App {
    public express : Application;
    public port: Number;

    constructor (conreollers : Controller[] , port: Number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(conreollers)
        this.initializeErrorHandling();

    }

    private initializeMiddleware () : void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: false}))
        this.express.use(compression()); 
    }

    private initializeControllers (controllers : Controller[] ) : void {
        controllers.forEach((controller : Controller ) => {
            this.express.use('/api' , controller.router);
        })
    }

    private initializeErrorHandling () : void {
        this.express.use(ErrorMiddleware);
    }

    private initializeDatabaseConnection () : void {
       const  { MONGO_URL }  = process.env ;
       mongoose.connect( `${MONGO_URL}` );
       const db = mongoose.connection;
       db.on('error', console.error.bind(console, 'MongoDB connection error:'));
       db.once('open', () => {
        console.log('Connected to MongoDB')})
    }

    public listen () : void {
        this.express.listen(this.port , () => {
            console.log(` App is listening on port ${this.port}`);
        })
    }
}

export default App