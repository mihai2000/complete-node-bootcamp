const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTourById = (req, res) => {
  const id = req.params.id * 1; //multiply a string with a number, will convert that string to a number
  const tour = tours.find((el) => el.id === id); //find the data for the id we need
  //if tour id we search is greater than the length
  // if (id > tours.length) {
  //if tour is undefined, if it is no tour
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};
exports.createTour = (req, res) => {
  //need middleware: data to put is available in req
  const newId = tours[tours.length - 1].id + 1; // get the last item on tours db(json), and increment it with 1 to put next item id
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    //with json.stringify with make the body to a json mode, without it is just an object
    JSON.stringify(tours),
    (err) => {
      //created status
      res.status(201).json({
        status: 'created with success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedTour = { ...tour, ...req.body };
  const updatedTours = tours.map((tour) =>
    tour.id === updatedTour.id ? updatedTour : tour
  );
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: updatedTour,
      });
    }
  );
};
exports.deleteTourById = (req, res) => {
  const id = req.params.id * 1;
  //need to find the index of the tour we want to delete
  const tour = tours.findIndex((tour) => tour.id === id);

  if (tour === -1) {
    // no tour fond in the array
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  //remove the tour from the array
  tours.splice(tour, 1);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Could not delete the tour',
        });
      }

      res.status(204).json({
        //204 no content , deleted
        status: 'success',
        data: null,
      });
    }
  );
};
