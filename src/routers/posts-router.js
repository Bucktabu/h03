"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const authentication_guard_middleware_1 = require("../middlewares/authentication-guard-middleware");
const postRouter_validation_middleware_1 = require("../middlewares/postRouter-validation-middleware");
const posts_repository_1 = require("../repositories/posts-repository");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.post('/', authentication_guard_middleware_1.authenticationGuardMiddleware, ...postRouter_validation_middleware_1.postRouterValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield posts_repository_1.postsRepository.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    !newPost ? res.sendStatus(404) : res.status(201).send(newPost);
}));
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_repository_1.postsRepository.givePost(null);
    !posts ? res.sendStatus(404) : res.status(200).send(posts);
}));
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepository.givePost(req.params.id);
    !post ? res.sendStatus(404) : res.status(200).send(post);
}));
exports.postsRouter.put('/:id', authentication_guard_middleware_1.authenticationGuardMiddleware, ...postRouter_validation_middleware_1.postRouterValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdate = yield posts_repository_1.postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (!isUpdate) {
        return res.sendStatus(404);
    }
    const post = posts_repository_1.postsRepository.givePost(req.params.id);
    res.status(204).send(post);
}));
exports.postsRouter.delete('/:id', authentication_guard_middleware_1.authenticationGuardMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_repository_1.postsRepository.deletePostById(req.params.id);
    !isDeleted ? res.sendStatus(404) : res.sendStatus(204);
}));
