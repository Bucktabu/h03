import request from "supertest"
import {app} from '../../index'

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
]

describe('/posts', () => {
    // beforeAll(async  () => {
    //     await request(app).delete('testing/all-data')
    // })

    it('Should return all posts', async () => {
        await request(app)
            .get('/posts')
            .expect(201, posts)

    }) // get

    it('Should return posts by id', async () => {
        const createResponse = await request(app)
            .get('/posts/1')
            .expect(200, {
                    "id": "1",
                    "title": "First post",
                    "shortDescription": "This is first post",
                    "content": "Just text 1",
                    "blogId": "01",
                    "blogName": "name01"
                }
            )
    }) // get be id

    it('Shouldn`t return posts by id', async () => {
        await request(app)
            .get('/posts/0')
            .expect(404)
    }) // error get by id

    it('Shouldn`t create post with incorrect input data', async () => {
        await request(app)
            .post('/posts')
            .send({
                title: '',
                shortDescription: '',
                content: '',
                blogId: ''
            })
            .expect(400)

        await request(app)
            .get('/posts')
            .expect(201, posts)
    }) // error post

    it('Should create post with correct input data', async () => {
        const createResponse = await request(app)
            .post('/posts')
            .send({
                title: 'New post',
                shortDescription: 'This is new post',
                content: 'Just new post',
                blogId: '04'
            })
            .expect(201)

        const createdPost = createResponse.body

        expect(createdPost).toEqual({
            id: expect.any(String),
            title: 'New post',
            shortDescription: 'This is new post',
            content: 'Just new post',
            blogId: '04'
        })

        await request(app)
            .get('/posts')
            .expect(201, [createdPost])
    }) // post

    it('Shouldn`t update post with incorrect input data', async () => {
        await request(app)
            .put('/posts/3')
            .send({title: ''})
            .expect(400)

        await request(app)
            .get('/posts/3')
            .expect(200, {
                    "id": "3",
                    "title": "Third post",
                    "shortDescription": "This is third post",
                    "content": "Just text 3",
                    "blogId": "03",
                    "blogName": "name03"
                }
            )
    }) // error put

    it('Shouldn`t update post that not exist', async () => {
        await request(app)
            .put('/posts/0')
            .send({title: 'Correct title'})
            .expect(404)
    })

    it('Should update post with correct input data', async () => {
        await request(app)
            .put('/posts/3')
            .send({title: 'New title'})
            .expect(204)

        await request(app)
            .get('/posts/3')
            .expect(200, {
                    "id": "3",
                    "title": "New title",
                    "shortDescription": "This is third post",
                    "content": "Just text 3",
                    "blogId": "03",
                    "blogName": "name03"
                }
            )
    })

    it('Shouldn`t delete post that not exist', async () => {
        await request(app)
            .delete('/post/0')
            .expect(404)

        await request(app)
            .get('/post/0')
            .expect(404)
    })

    it('Should delete post', async () => {
        await request(app)
            .delete('/post/4')
            .expect(204)

        await request(app)
            .get('/post/4')
            .expect(404)
    })
})