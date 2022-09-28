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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
let posts = [{
        "id": "1",
        "title": "First post",
        "shortDescription": "This is first post",
        "content": "Just text 1",
        "blogId": "01",
        "blogName": "name01"
    },
    {
        "id": "2",
        "title": "Second post",
        "shortDescription": "This is second post",
        "content": "Just text 2",
        "blogId": "02",
        "blogName": "name02"
    },
    {
        "id": "3",
        "title": "Third post",
        "shortDescription": "This is third post",
        "content": "Just text 3",
        "blogId": "03",
        "blogName": "name03"
    }
];
describe('/posts', () => {
    // beforeAll(async  () => {
    //     await request(app).delete('testing/all-data')
    // })
    it('Should return all posts', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(201, posts);
    })); // get
    it('Should return posts by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .get('/posts/1')
            .expect(200, {
            "id": "1",
            "title": "First post",
            "shortDescription": "This is first post",
            "content": "Just text 1",
            "blogId": "01",
            "blogName": "name01"
        });
    })); // get be id
    it('Shouldn`t return posts by id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts/0')
            .expect(404);
    })); // error get by id
    it('Shouldn`t create post with incorrect input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/posts')
            .send({
            title: '',
            shortDescription: '',
            content: '',
            blogId: ''
        })
            .expect(400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(201, posts);
    })); // error post
    it('Should create post with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/posts')
            .send({
            title: 'New post',
            shortDescription: 'This is new post',
            content: 'Just new post',
            blogId: '04'
        })
            .expect(201);
        const createdPost = createResponse.body;
        expect(createdPost).toEqual({
            id: expect.any(String),
            title: 'New post',
            shortDescription: 'This is new post',
            content: 'Just new post',
            blogId: '04'
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(201, [createdPost]);
    })); // post
    it('Shouldn`t update post with incorrect input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/posts/3')
            .send({ title: '' })
            .expect(400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts/3')
            .expect(200, {
            "id": "3",
            "title": "Third post",
            "shortDescription": "This is third post",
            "content": "Just text 3",
            "blogId": "03",
            "blogName": "name03"
        });
    })); // error put
    it('Shouldn`t update post that not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/posts/0')
            .send({ title: 'Correct title' })
            .expect(404);
    }));
    it('Should update post with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/posts/3')
            .send({ title: 'New title' })
            .expect(204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts/3')
            .expect(200, {
            "id": "3",
            "title": "New title",
            "shortDescription": "This is third post",
            "content": "Just text 3",
            "blogId": "03",
            "blogName": "name03"
        });
    }));
    it('Shouldn`t delete post that not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/post/0')
            .expect(404);
        yield (0, supertest_1.default)(src_1.app)
            .get('/post/0')
            .expect(404);
    }));
    it('Should delete post', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/post/4')
            .expect(204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/post/4')
            .expect(404);
    }));
});
