// Integration test
const axios = require('axios');
const assert = require('assert'); 
const { response } = require('express');

const port = 3000

const performAddArticle = (payload) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:'+port+'/articles', payload)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error)
            });
    })
}

const performGetArticle = (query, author) => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:'+port+'/articles?query='+query+'&author='+author+'')
        .then(function (response) {
            resolve(response.data)
        })
        .catch(function (error) {
            reject(error)
        })
        .then(function () {
            // always executed
            reject(0)
        });
    }) 
} 

describe('Add article', function() {
    const payload = {
        author: 'Matt P.',
        title: 'Basic Software Engineering',
        body: 'Software Engineering is one of the...'
    }
    before(async function() {
        try {
            response1 = await performAddArticle(payload)
            response2 = await performGetArticle(payload.title, payload.author)
        } catch(err) {
            console.log(err)
        }
    });
    
    expectedResponse1 = 1 // success response
    describe('Response message', function() {
        it('Should return success message', function() {
            assert.strictEqual(response1.success, expectedResponse1)
        });
    })
    
    expectedResponse2 = payload.title
    describe('Presence in database', async function() {
        it('Should exist in database', function() {
            assert.strictEqual(response2.data[0].title, expectedResponse2)
        });
    })
});

describe('Get article', function() {
    const payload = {
        author: 'Jhonny',
        title: 'Object-oriented Programming',
        body: 'Programming is a...'
    }
    before(async function() {
        try {
            await performAddArticle(payload)
            response1 = await performGetArticle(payload.title, payload.author)
            response2 = await performGetArticle('words that not in the database', payload.author)
        } catch(err) {
            console.log(err)
        }
    });
    
    expectedGetResponse1 = payload.title 
    describe('Exist in database', function() {
        it('Should return correct data as given query', function() {
            assert.strictEqual(response1.data[0].title, expectedGetResponse1)
        });
    })
    
    expectedGetResponse2 = [] // empty response
    describe('Don\'t exist in database', async function() {
        it('Should return empty array', function() {
            assert.deepStrictEqual(response2.data, expectedGetResponse2)
        });
    })
});


