import supertest from 'supertest';
import app from '../index';
import fs from 'fs'
import path from 'path';

const request = supertest(app);

describe('is image exist',() => {
    it('is image existance checker defined', ()=>{
        expect(fs.existsSync(path.join(__dirname,"..","..","thump-images","icelandwaterfall_3001_3040.jpg"))).toBe(false)
    })
    it('is image saved in thump-images',async () => {
        await request.get('/resize?name=icelandwaterfall&height=550&width=550')
        expect(fs.existsSync(path.join(__dirname,"..","..","thump-images","icelandwaterfall_550_550.jpg"))).toBe(true)
    })
})

describe('Testing responses', () => {
    it('getting api endpoint', async () => {
        const response = await request.get('/resize?name=icelandwaterfall&height=550&width=550');
        expect(response.status).toBe(200);
    }
)});