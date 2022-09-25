import {Request, Response, Router} from "express";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {postRouterValidation} from "../middlewares/postRouter-validation-middleware";
import {postsRepository} from "../repositories/posts-repository";

export const postsRouter = Router({})

postsRouter.post('/',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    (req: Request, res: Response) => {
        const newPost = postsRepository.createNewPost(req.body)

        if (!newPost) {
            return res.sendStatus(404)
        }

        res.status(201).send(newPost)
    }
)

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.giveAllPosts()

    if (!posts) {
        return res.sendStatus(404)
    }

    res.status(200).send(posts)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
    const post = postsRepository.givePostById(req.params.id)

    if (!post) {
        res.sendStatus(404)
    }

    return res.status(200).send(post)
})

postsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    (req: Request, res: Response) => {
        const isUpdate = postsRepository.updatePost(req.body.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)

        if (!isUpdate) {
            return res.sendStatus(404)
        }

        const post = postsRepository.givePostById(req.body.id)
        res.status(204).send(post)
    }
)

postsRouter.delete('/:id',
    authenticationGuardMiddleware,
    (req: Request, res: Response) => {
        const isDeleted = postsRepository.deletePostById(req.body.id)

        if (!isDeleted) {
            return res.sendStatus(404)
        }

        res.sendStatus(204)
    }
)