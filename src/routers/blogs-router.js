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
exports.blogsRouter = void 0;
const express_1 = require("express");
const authentication_guard_middleware_1 = require("../middlewares/authentication-guard-middleware");
const blogRouter_validation_middleware_1 = require("../middlewares/blogRouter-validation-middleware");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.post('/', authentication_guard_middleware_1.authenticationGuardMiddleware, ...blogRouter_validation_middleware_1.blogRouterValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blogs_repository_1.blogsRepository.createNewBlog(req.body.name, req.body.youtubeUrl);
    !newBlog ? res.sendStatus(404) : res.status(201).send(newBlog);
}));
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blogs_repository_1.blogsRepository.giveBlog(null);
    !blogs ? res.sendStatus(404) : res.status(200).send(blogs);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepository.giveBlog(req.params.id);
    !blog ? res.sendStatus(404) : res.status(200).send(blog);
}));
exports.blogsRouter.put('/:id', authentication_guard_middleware_1.authenticationGuardMiddleware, ...blogRouter_validation_middleware_1.blogRouterValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdate = yield blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl); // почему здесь не указал булеaн
    if (!isUpdate) {
        return res.sendStatus(404);
    }
    const blog = yield blogs_repository_1.blogsRepository.giveBlog(req.params.id);
    res.status(204).send(blog);
    // !isUpdate ? res.sendStatus(404) : (
    //         const blog = blogsRepository.giveBlogById(req.params.id)
    //         res.status(204).send(blog)
    //     )
}));
exports.blogsRouter.delete('/:id', authentication_guard_middleware_1.authenticationGuardMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_repository_1.blogsRepository.deleteBlogById(req.params.id);
    !isDeleted ? res.sendStatus(404) : res.sendStatus(204);
}));
