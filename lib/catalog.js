/**
 * Manage catalog
 */

'use strict';

/**
 * Module dependencies.
 */

var CatalogNode = require('./catalog/node').CatalogNode;
var CatalogService = require('./catalog/service').CatalogService;
var utils = require('./utils');

/**
 * Initialize a new `Catalog` client.
 */

function Catalog(consul) {
  this.consul = consul;
  this.node = new Catalog.Node(consul);
  this.service = new Catalog.Service(consul);
}

Catalog.Node = CatalogNode;
Catalog.Service = CatalogService;

/**
 * Lists known datacenters
 */

Catalog.prototype.datacenters = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  }

  opts = utils.normalizeKeys(opts);
  opts = utils.defaults(opts, this.consul._defaults);

  var req = {
    name: 'catalog.datacenters',
    path: '/catalog/datacenters',
  };

  utils.options(req, opts);

  this.consul._get(req, utils.body, callback);
};

/**
 * Lists nodes in a given DC
 */

Catalog.prototype.nodes = function() {
  this.node.list.apply(this.node, arguments);
};

/**
 * Lists services in a given DC
 */

Catalog.prototype.services = function() {
  this.service.list.apply(this.service, arguments);
};

/**
 * Low-level register entity endpoint, see
 * https://www.consul.io/api/catalog.html#register-entity for body options
 */
Catalog.prototype.register = function(body, callback) {

 var req = {
   name: 'agent.catalog.register',
   path: '/catalog/register',
   type: 'json',
   body,
 };

 this.consul._put(req, utils.body, callback);
};

/**
 * Low-level deregister entity endpoint, see
 * https://www.consul.io/api/catalog.html#deregister-entity for body options
 */
Catalog.prototype.deregister = function(body, callback) {

 var req = {
   name: 'agent.catalog.deregister',
   path: '/catalog/deregister',
   type: 'json',
   body,
 };

 this.consul._put(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Catalog = Catalog;
