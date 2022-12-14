const router = require("express").Router();
const fs = require("fs");

router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      res.send(data);
    }
  });
});

// POST request to add a note
router.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note  `);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
    };

    // Obtain existing notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new Note
        parsedNotes.push(newNote);

        // Write new notes back to the file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully added your newNote!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting Note");
  }
});

router.delete("/api/notes/:id", (req, res) => {
  if (req.body) {
    const oldNote = {
      title: req.body.title,
      text: req.body.text,
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      const parsedData = JSON.parse(data);
      parsedData.pop(oldNote);
      const stringifiedData = JSON.stringify(parsedData, null, 4);
      fs.writeFile("./db/db.json", stringifiedData, (writeErr) =>
        writeErr ? console.log(writeErr) : console.log("Deleted")
      );
    });

    res.json(`Delete successful`);
  } else {
    res.json("Error in deleting note");
  }
});

module.exports = router;
