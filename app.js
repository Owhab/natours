const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

// Get all the tours

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

// Get a single tour by id

app.get("/api/v1/tours/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "Invalid id..",
    });
  }
  res.status(200).json({
    status: "success",
    data: { tour },
  });
});

// Creata a new tour
app.post("/api/v1/tours", (req, res) => {
  const newId = tours.length + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// Patch Request to update a tour
app.patch("/api/v1/tours/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: "failed",
      message: "Invalid Id",
    });
  }
  res.status(200).json({
    status: "Success",
    message: "Updated Successfully.",
  });
});

app.patch("/api/v1/tours/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: "failed",
      message: "Invalid Id",
    });
  }
  res.status(200).json({
    status: "Success",
    message: "Updated Successfully.",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("Natours app listen on port: ", port);
});
