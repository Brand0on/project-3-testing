'use strict';

const express = require('express');
const routeGuard = require('../middleware/routeGuard');
const eventsRouter = express.Router();
const Event = require('../models/event');
const Attendence = require('./../models/attendence');
// const upload = require('./upload');

// - GET /events -> Fetch all events
eventsRouter.get('/', (req, res, next) => {
  Event.find()
    .then((events) => res.json({ events }))
    .catch((error) => next(error));
});

// - GET /events/random -> Get 3 random quotes
eventsRouter.get('/random', (req, res, next) => {
  Event.find()
    .then((events) => {
      const randomIndex = Math.floor(Math.random() * events.length);
      const randomEvent = events[randomIndex];
      res.json({ event: randomEvent });
    })
    .catch((error) => next(error));
});

// - GET /events/:Id -> Fetch single event
eventsRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Event.findById(id)
    .then((event) => res.json({ event }))
    .catch((error) => next(error));
});

// - POST - /events - Creates a new events
eventsRouter.post('/', routeGuard, (req, res, next) => {
  const { eventName, description, createdUser, picture, location, dateTime } =
    req.body;
  Event.create({
    eventName,
    description,
    createdUser,
    picture,
    location,
    dateTime
  })
    .then((event) => res.json({ event }))
    .catch((error) => next(error));
});

// - PATCH /events/:Id - Update a single event
eventsRouter.patch('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { eventName, description, createdUser, picture, location, dateTime } =
    req.body;
  Event.findByIdAndUpdate(
    id,
    { eventName, description, createdUser, picture, location, dateTime },
    { new: true }
  )
    .then((event) => res.json({ event }))
    .catch((error) => next(error));
});

// DELETE - /quotes/:id - Deletes an existing event
eventsRouter.delete('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Event.findByIdAndDelete(id)
    .then(() => res.json({ success: true }))
    .catch((error) => next(error));
});

// - POST /events/:Id/going -> Create the attendance
eventsRouter.post('/:id/going', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Attendence.create({
    joiningUser: req.user._id,
    joiningEvent: id
  })
    .then((attend) => {
      res.json({ attend });
    })
    .catch((error) => {
      next(error);
    });
});

// - DELETE /events/:Id/notgoing -> Delete the attendance
eventsRouter.post('/:id/notgoing', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Attendence.findOneAndDelete({
    joiningUser: req.user._id,
    joiningEvent: id
  })
    .then((attend) => {
      res.json({ attend });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = eventsRouter;
