/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';


// Gets a list of Things
exports.index = function(req, res) {
  res.json([]);
};

// Gets a single Thing from the DB
exports.show = function(req, res) {
  res.json([]);
};

// Creates a new Thing in the DB
exports.create = function(req, res) {
  res.json([]);
};

// Updates an existing Thing in the DB
exports.update = function(req, res) {
 res.json([]);
};

// Deletes a Thing from the DB
exports.destroy = function(req, res) {
  res.json([]);
};
