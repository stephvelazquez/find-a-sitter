var db = require('../db/db.js');

var dbHelpers = module.exports;

dbHelpers.getAllEntriesInTable = function(req, res, table) {
  table.findAll()
    .then(function(entries) {
      res.status(200).send(entries);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
}

dbHelpers.createNewEntry = function(req, res, table, newEntry) {
  table.create(newEntry)
  .then(function(entry) {
    res.status(200).send(entry);
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
}

dbHelpers.retrieveSpecificEntry = function(req, res, table, id) {
  return table.findOne({where: {id:id}});
}

dbHelpers.updateEntry = function(req, res, table, entry, id) {
  table.update(entry, {where: {id: id}})
    .then(function(newData) {
      res.status(200).send(newData);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
}

dbHelpers.deleteEntry = function(req, res, table) {
  var entryId = req.params.id
  table.findById(entryId)
    .then(function(entry) {
      entry.destroy();
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
}
