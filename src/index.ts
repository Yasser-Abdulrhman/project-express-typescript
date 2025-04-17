import 'module-alias/register';
import 'dotenv/config'
import App from './app';
import PostController from './resources/posts/post.controller';


const app  = new App([ 
    new PostController()
] , Number(process.env.PORT));

app.listen();