import request from 'supertest';
import app from '../src/main';

describe('countries endpoints', () => {
  const realFetch = global.fetch;
  afterEach(() => { global.fetch = realFetch as any; });

  it('GET /countries returns list', async () => {
    global.fetch = vi.fn(async () => ({ ok:true, json: async () => ([ { name:{common:'X'}, flags:{svg:'x.svg'} } ]) })) as any;
    const res = await request(app).get('/countries');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({ name: 'X', flag: 'x.svg' });
  });

  it('GET /countries/:name returns details', async () => {
    global.fetch = vi.fn(async () => ({ ok:true, json: async () => ([ { name:{common:'X'}, flags:{svg:'x.svg'}, population:100, capital:['C'] } ]) })) as any;
    const res = await request(app).get('/countries/X');
    expect(res.status).toBe(200);
    expect(res.body.population).toBe(100);
  });
});
