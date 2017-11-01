/* eslint-disable */
'use strict';

let db;
const express = require('express');
const moment = require('moment');
const router = express.Router();
const mongo = require('../mongo');
const uid = require('uid2');

// Collections
const DATA_COLLECTION = 'userdetails';
const SURVEY_DATA_COLLECTION = 'surveydata';
const USER_SURVEY_TAKEN = 'surveytakendata'

mongo.connect((_db) => {
  db = _db;
});

router.get('/data', (req, res) => {
    db.collection(DATA_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, 'Failed to get user data.');
        } else {
            res.status(200).json(docs);
        }
    });
});

// GET for questions being taken
router.get('/questions', (req, res) => {
    db.collection(SURVEY_DATA_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, 'Failed to get questions.');
        } else {
            res.status(200).json(docs);
        }
    });
});

// POST for surveyTaken
router.post('/surveyTaken', (req, res) => {
    console.log('inside Survey taken');
    console.log(req);
    if (!(req.body.firstName || req.body.lastName || req.body.grade || req.body.course || req.body.survey)) {
        handleError(res, 'Invalid user input', 'Mandatory fields must be filled.', 400);
    }

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        grade: req.body.grade,
        course: req.body.course,
        survey: req.body.survey
    }

    db.collection(USER_SURVEY_TAKEN).insertOne(newUser, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to POST survey taken data.');
        } else {
            res.status(201).json(doc);
        }
    });

});


router.post('/getAllSurveys', (req, res) => {

  if(!req.body || req.body.length == 0) {
    res.status(400).send('Need teacher name');
    return;
  }
  db.collection(SURVEY_DATA_COLLECTION).find({}).toArray(function(err, docs) {
    if(err){
      console.log(err);
      res.status(500).send(err);
    } else {
      // console.log("Found the following records");
      // console.dir(docs);
      res.status(200).json(docs);
    }
  });
});

router.put('/updateSurvey/:survey', (req, res) => {
  console.dir(req.params.survey);
  if(!req.body || req.body.length == 0) {
    res.status(400).send('Invalid survey id');
    return ;
  }

});

router.post('/postExcelData', (req, res) => {

    console.log('<<-- POST EXCEL DATA ->>');
    if(!req.body || req.body.length == 0) {
      resp.status(400).send('Invalid Survey Data');
      return;
      // handleError(res, 'Excel Parsing error', 'Size is either zero or undefined', 400);
    }
    const key = uid(5);
    let survey = {};
    survey._id = key;
    survey = Object.assign(survey, req.body);
    survey.isSurveyEnabled = survey.isSurveyEnabled ? survey.isSurveyEnabled : false;
    survey.postedOn =  moment().format('LLL');

    /*res.status(201).json(survey);*/
     db.collection(SURVEY_DATA_COLLECTION).insertOne(survey, function(err, doc) {
        if (err) {
          console.log(err);
            //handleError(res, err.message, 'Failed to POST survey taken data.');
          res.status(400).send(err);
        } else {
            res.status(201).json(survey);
        }
    });
});

module.exports = router;
