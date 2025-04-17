import PostModel from '@/resources/posts/post.model';
import Post from '@/resources/posts/post.interface';

class PostService {

    private post = PostModel;

    public async createPost(title : string , body : string) : Promise<Post> {
        try {
            const post  = await this.post.create({title , body});
            return post
        } catch (error : any) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService