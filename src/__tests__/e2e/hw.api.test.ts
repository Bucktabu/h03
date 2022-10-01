import request from 'supertest'
import {app} from "../../index";

describe('/posts', () => {
    it('Expected 401', async  () => {
        await request(app)
            .post('/blogs')
            .send({
                "name": "string",
                "youtubeUrl": "https://www.youtube.com/watch?v=vuzKKCYXISA&t=2677s&ab_channel=IT-KAMASUTRA"
            })
            .expect(401)
    })
})