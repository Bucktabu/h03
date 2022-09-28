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
exports.postsRepository = void 0;
const db_1 = require("./db");
exports.postsRepository = {
    createNewPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                id: String(+new Date()),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: 'Simple name' //blogsCollection.find({id: blogId}).name
            };
            yield db_1.postsCollection.insertOne(newPost);
            return newPost;
        });
    },
    givePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (id) {
                filter.id = { $regex: id };
            }
            return db_1.postsCollection.find(filter).toArray();
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.updateOne({ id: id }, { $set: { title: title, shortDescription: shortDescription, content: content, blogId: blogId } });
            return result.matchedCount === 1;
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.drop();
            return result;
        });
    }
};
