'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var category = ['music', 'sport', 'art', 'business', 'conference', 'party', 'festival', 'science and technology'];

var validateDate = function validateDate(date) {
  var re = /\d{4}-\d{2}-\d{2}/;
  return re.test(date);
};

var validateTime = function validateTime(time) {
  var re = /\d{2}:\d{2}/;
  return re.test(time);
};

exports.default = {
  verifyBody: function verifyBody(req, res, next) {
    var bd = req.body;
    if (!bd.title || bd.title.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Title not included in body'
      });
    }
    if (!bd.location || bd.location.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Location not included in body'
      });
    }
    if (!bd.startdate || bd.startdate.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'startDate not included in body'
      });
    }
    if (!bd.enddate || bd.enddate.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'EndDate not included in body'
      });
    }
    if (!bd.starttime || bd.starttime.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'startTime not included in body'
      });
    }
    if (!bd.endtime || bd.endtime.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'EndTime not included in body'
      });
    }
    if (!bd.category || bd.category.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'category not included in body'
      });
    }
    if (!bd.description || bd.description.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'description not included in body'
      });
    }
    if (!bd.organizer || bd.organizer.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Organizer not included in body'
      });
    }
    if (!bd.organizerdescription || bd.organizerdescription.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'organizerdescription not included in body'
      });
    }
    return next();
  },
  verifyDate: function verifyDate(req, res, next) {
    if (!validateDate(req.body.startdate.trim()) || !validateDate(req.body.enddate.trim())) {
      return res.status(400).json({
        status: 400,
        message: 'Date must be in the format dd-mm-yyyy'
      });
    }
    var startdateList = req.body.startdate.trim().split('-');
    var enddateList = req.body.enddate.trim().split('-');
    if (Number(startdateList[2]) > 31 || Number(enddateList[2]) > 31) {
      return res.status(400).json({
        status: 400,
        message: 'Date cannot be greater than 31'
      });
    }
    if (Number(startdateList[1]) > 12 || Number(enddateList[1]) > 12) {
      return res.status(400).json({
        status: 400,
        message: 'Month cannot be greater than 12'
      });
    }
    return next();
  },
  verifyTime: function verifyTime(req, res, next) {
    if (!validateTime(req.body.starttime.trim()) || !validateTime(req.body.endtime.trim())) {
      return res.status(400).json({
        status: 400,
        message: 'Time must be in the format hr:mm'
      });
    }
    var starttimeList = req.body.starttime.split(':');
    var endtimeList = req.body.endtime.split(':');
    if (Number(starttimeList[0]) > 23 || Number(endtimeList[0]) > 23) {
      return res.status(400).json({
        status: 400,
        message: 'Hour cannot be greater than 23'
      });
    }
    if (Number(starttimeList[1]) > 59 || endtimeList[1] > 59) {
      return res.status(400).json({
        status: 400,
        message: 'Minute cannot be greater tha 59'
      });
    }
    return next();
  },
  isValidCategory: function isValidCategory(req, res, next) {
    if (!req.body.category || req.body.category.trim().length < 1) {
      return res.status(206).json({
        status: '206',
        message: 'category must not be empty'
      });
    }
    for (var i = 0; i < category.length; i += 1) {
      if (req.body.category.trim().toLowerCase() === category[i]) {
        return next();
      }
    }
    return res.status(400).json({
      status: 400,
      message: "category must be one of these  ['music', 'sport', 'art', 'business', 'conference', 'party', 'festival', 'science and technology']"
    });
  },
  verifyEventRegister: function verifyEventRegister(req, res, next) {
    if (!req.body.name || req.body.name.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Name not Included in body'
      });
    }
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Email not Included in body'
      });
    }
    return next();
  },
  isFileAvailable: function isFileAvailable(req, res, next) {
    if (!req.file || req.file === '' || req.file === null) {
      req.imagepath = 'https://res.cloudinary.com/fast-food/image/upload/v1539239518/samples/imagecon-group.jpg';
      return next();
    }
    return next();
    // return `${req.protocol}://${req.headers.host}/${req.file.path}`;
  }
};