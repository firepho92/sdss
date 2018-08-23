'use strict';

module.exports = function (router) {

  router.post('/', function (req, res) {
    console.log(req.body.token);
    var token = 'Hx8V2OQIgF79bRLviX6aB+zS6MyHpQyp0StYYbLJLqOsoIUmTZlZK/VTAQgmw/veLPBhm6I3jDIYAMAMk47qvmiVF+usw22csYIC1BtZi89olYpm/B/sxwqS2FARTs0GmyQJXDP8GcRBFlKqRLFgYWzoIyJHRzCDNA7XpiELnJo=';
    if(token === req.body.token) res.send(true);
    res.send(false);
  });

};
