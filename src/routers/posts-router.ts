import {Request, Response, Router} from "express";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {postRouterValidation} from "../middlewares/postRouter-validation-middleware";
import {postsRepository, postsType, postType} from "../repositories/posts-repository";

export const postsRouter = Router({})

postsRouter.post('/',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    async (req: Request, res: Response) => {
        const newPost: postType = await postsRepository.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)

        if (newPost) {
            res.status(201).send(newPost)
        } else {
            res.sendStatus(404)
        }
    }
)

postsRouter.get('/', async (req: Request, res: Response) => {
    const posts: postsType = await postsRepository.givePost(null)

    if (posts) {
        res.status(200).send(posts)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    const post: postsType = await postsRepository.givePost(req.params.id)

    if (post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    async (req: Request, res: Response) => {
        const isUpdate = await postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)

        if (isUpdate) {
            const post = postsRepository.givePost(req.params.id)
            res.status(204).send(post)
        } else {
            res.sendStatus(404)
        }
    }
)

postsRouter.delete('/:id',
    authenticationGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsRepository.deletePostById(req.params.id)

        if (isDeleted) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
)