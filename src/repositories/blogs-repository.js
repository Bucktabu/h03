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
exports.blogsRepository = void 0;
const db_1 = require("./db");
exports.blogsRepository = {
    createNewBlog(name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: String(+new Date()),
                name: name,
                youtubeUrl: youtubeUrl
            };
            yield db_1.blogsCollection.insertOne(newBlog);
            return newBlog;
        });
    },
    giveBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (id) {
                filter.id = { $regex: id };
            }
            return db_1.blogsCollection.find(filter).toArray();
        });
    },
    updateBlog(id, name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.updateOne({ id: id }, { $set: { name: name, youtubeUrl: youtubeUrl } });
            return result.matchedCount === 1;
        });
    },
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
            // !blog ? false : (
            //     blogs = blogs.filter(b => b.id !== id),
            //     true
            // )
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.drop(); // remove()
            return result;
        });
    }
};
