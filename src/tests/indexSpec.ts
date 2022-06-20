import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';
import resize from '../utils/utils';

const request = supertest(app);

describe('api tests', () => {
    it('is image saved in thump-images', async () => {
        if (
            fs.existsSync(
                path.join(
                    path.resolve('./'),
                    'thump-images',
                    'icelandwaterfall_550_550.jpg'
                )
            )
        ) {
            fs.unlink(
                path.join(
                    path.resolve('./'),
                    'thump-images',
                    'icelandwaterfall_550_550.jpg'
                ),
                () => {
                    console.log('deleted image before test');
                }
            );
        }
        await request.get('/resize?name=icelandwaterfall&height=550&width=550');
        expect(
            fs.existsSync(
                path.join(
                    path.resolve('./'),
                    'thump-images',
                    'icelandwaterfall_550_550.jpg'
                )
            )
        ).toBe(true);
    });
});

describe('functionality test', () => {
    it('test resize function', async () => {
        if (
            fs.existsSync(
                path.join(
                    path.resolve('./'),
                    'thump-images',
                    'icelandwaterfall_550_550.jpg'
                )
            )
        ) {
            fs.unlink(
                path.join(
                    path.resolve('./'),
                    'thump-images',
                    'icelandwaterfall_550_550.jpg'
                ),
                () => {
                    console.log('deleted image before test');
                }
            );
        }
        await resize(
            path.resolve('./') + '/images/fjord.jpg',
            400,
            200,
            path.resolve('./') + '/thump-images/fjord_400_200.jpg'
        );
        expect(
            fs.existsSync(path.resolve() + '/thump-images/fjord_400_200.jpg')
        ).toBe(true);
    });
});

describe('Testing responses', () => {
    it('getting api endpoint', async () => {
        if (
            fs.existsSync(
                path.join(
                    path.resolve('./'),
                    'thump-images',
                    'icelandwaterfall_550_550.jpg'
                )
            )
        ) {
            fs.unlink(
                path.join(
                    path.resolve('./'),
                    'thump-images',
                    'icelandwaterfall_550_550.jpg'
                ),
                () => {
                    console.log('deleted image before testing');
                }
            );
        }
        const response = await request.get(
            '/resize?name=icelandwaterfall&height=550&width=550'
        );
        expect(response.status).toBe(200);
    });
    it('bad request if width or height not number', async () => {
        const response = await request.get(
            '/resize?name=icelandwaterfall&height=abc&width=550'
        );
        expect(response.status).toBe(400);
    });
    it('bad request if width or height value is less than or equal 0', async () => {
        const response = await request.get(
            '/resize?name=icelandwaterfall&height=0&width=550'
        );
        expect(response.status).toBe(400);
    });
    it('file not found', async () => {
        const response = await request.get(
            '/resize?name=&height=550&width=550'
        );
        expect(response.status).toBe(404);
    });
});
