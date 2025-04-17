import { Router , Request , Response , NextFunction } from "express";
import Controller  from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from '@/resources/posts/post.validation';
import PostService from '@/resources/posts/post.service';


class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService  = new PostService();


    constructor () {
        this.initialiseRoutes();
    }

    private initialiseRoutes () : void {

        this.router.post(`${this.path}`,
            validationMiddleware(validate.createSchema) ,
            this.createPost
        )

    }

    private  createPost = async ( req : Request , res : Response , next : NextFunction) : Promise <void > => {
        try {
            const {title , body } = req.body; 
            const post = await this.PostService.createPost(title , body);
            res.status(201).json({post})
            
        } catch (error : any) {
            next(new HttpException(400 , error.message));
        }
    }

}

export default PostController;