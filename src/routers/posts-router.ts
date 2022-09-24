import {Request, Response, Router} from "express";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {postRouterValidation} from "../middlewares/postRouter-validation-middleware";

export const postsRouter = Router({})

export type postsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}[]
let posts: postsType = []

postsRouter.post('/',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    (req: Request, res: Response) => {
        const newPost = {
            id: String(+(new Date())),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: 'Admin`s blog'
        }
        posts.push(newPost)

        res.status(201).send(newPost)
    }
)

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(posts)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
    const post = posts.find(p => +p.id === +req.params.id)

    if (!post) {
        res.sendStatus(404)
    }

    return res.status(200).send(post)
})

postsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    (req: Request, res: Response) => {
        const post = posts.find(p => +p.id === +req.params.id)
        if (!post) {
            res.sendStatus(404)
        } else {
            post.title = req.body.title
            post.shortDescription = req.body.shortDescription
            post.content = req.body.content
            post.blogId = req.body.blogId

            return res.status(204).send(post)
        }
    }
)

postsRouter.delete('/:id',
    authenticationGuardMiddleware,
    (req: Request, res: Response) => {
        const newPosts = posts.filter(p => +p.id !== +req.params.id)

        if (newPosts.length === posts.length) {
            return res.sendStatus(404)
        }

        posts = newPosts

        res.sendStatus(204)
    }
)