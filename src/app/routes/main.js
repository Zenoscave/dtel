/*jslint node: true, stupid: true */
var request = require('request');
var Question = require('../models/questions');

var primeBelow = function (n) {
    var isPrime = function (a) {
        n = Math.floor(n / 2) * 2 + 1;
        if (a % 2 === 0) return false
        for (var i = 3; i <= Math.floor(Math.sqrt(a)); i += 2)
            if (a % i === 0) return false
        return true;
    }
    while (!isPrime(n) && n > 2) n -= 2;
    return Math.max(n, 2);
}

module.exports = function (server, passport, auth) {
    server.post('/signup/android', passport.authenticate('signup'), function (req, res) {
        res.send({ "user_token": require('../../../common/secret')(Date.now()).toString(16) });
        res.end();
    });

    server.get('/questions', function (req, res, next) {
        Question.find({}, null, { sort: { id: 1 } }, function (err, docs) {
            if (err) res.err(err);

            var qs = docs,
                p = (qs.length === undefined) ? 1 : primeBelow(qs.length);

            var mult = Date.now() % (p - 1) + 1,
                shift = Date.now() % p,
                offset = Date.now() % (qs.length - p),
                is = Array.apply(null, Array(p))
                    .map(function (_, i) {
                        return (i * mult + shift) % p;
                    }),
                qs = is.map(function (e) { return qs[e+offset] });

            res.send(qs.map(function (e) {
                return {
                    id: e.id,
                    content: e.content,
                    answers: e.answers.map(function (ans) { return ans.answer; }),
                    subject: e.subject
                }
            }));
            res.end();
        });
    });

    server.get('/answer/:id', function (req, res) {
        Question.findOne({ 'id': req.params.id }, function(err, question) {
            res.send((err ? err: (question ?  question.answers : [])));
            res.end()
        })
    })
};
