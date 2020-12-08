require('dotenv').config();
const fakeRequest = require('supertest');
const app = require('../index.js');
// const pool = require('../utils/pool.js');


describe('app endpoints', () => {

  // afterAll(async() => {
  //   await pool.end();
  // });

  it('gets video games', async() => {
    const expectation = 
    [
      {
        'id': '7',
        'title': 'Catherine',
        'description': 'Man in underwear puzzles through affair',
        'url': 'www.catherine.com'
      },
      {
        'id': '3',
        'title': 'fallout 3',
        'description': 'blowing stuff up and also killing and more blowing stuff up',
        'url': 'www.fallout.com'
      }
    ];

    const data = await fakeRequest(app)
      .get('/videogames')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  it('posts video games', async() => {
    const expectation = 
      {
        'id': '21',
        'title': 'Catherine',
        'description': 'Man in underwear puzzles through affair',
        'url': 'www.catherine.com'
      };

    const data = await fakeRequest(app)
      .post('/videogames')
      .send({
        'title': 'Catherine',
        'description': 'Man in underwear puzzles through affair',
        'url': 'www.catherine.com'
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  it('deletes video game', async() => {
    const expectation = 
    [
      {
        'id': '7',
        'title': 'Catherine',
        'description': 'Man in underwear puzzles through affair',
        'url': 'www.catherine.com'
      },
      {
        'id': '3',
        'title': 'fallout 3',
        'description': 'blowing stuff up and also killing and more blowing stuff up',
        'url': 'www.fallout.com'
      }
    ];

    await fakeRequest(app)
      .delete('/videogames/21')
      .expect('Content-Type', /json/);

    const data = await fakeRequest(app)
      .get('/videogames')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  it('updates video games', async() => {
    const expectation = 
      {
        'id': '3',
        'title': 'fallout 3',
        'description': 'blowing stuff up and also killing',
        'url': 'www.fallout.com'
      };

    const data = await fakeRequest(app)
      .put('/videogames')
      .send({
        'description': 'blowing stuff up and also killing',
        'id': '3',
        'title': 'fallout 3',
        'url': 'www.fallout.com'
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

});
