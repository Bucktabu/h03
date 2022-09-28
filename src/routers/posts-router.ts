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

        !newPost ? res.sendStatus(404) : res.status(201).send(newPost)
    }
)

postsRouter.get('/', async (req: Request, res: Response) => {
    const posts: postsType = await postsRepository.givePost(null)

    !posts ? res.sendStatus(404) : res.status(200).send(posts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    const post: postsType = await postsRepository.givePost(req.params.id)

    !post ? res.sendStatus(404) : res.status(200).send(post)
})

postsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    async (req: Request, res: Response) => {
        const isUpdate = await postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)

        if (!isUpdate) {
            return res.sendStatus(404)
        }

        const post = postsRepository.givePost(req.params.id)
        res.status(204).send(post)
    }
)

postsRouter.delete('/:id',
    authenticationGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsRepository.deletePostById(req.params.id)

        !isDeleted ? res.sendStatus(404) : res.sendStatus(204)
    }
)