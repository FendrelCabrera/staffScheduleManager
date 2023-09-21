const express = require('express');
const next = require('next');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const dbPath = path.join(__dirname, 'db.json');

app.prepare().then(() => {
  const server = express();
  const jsonParser = bodyParser.json();

  server.get('/api/allstaff', (req, res) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return res.status(500).json({ error: 'Error reading JSON file.' });
      }

      try {
        const scheduleData = JSON.parse(data);
        res.json(scheduleData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ error: 'Error parsing JSON.' });
      }
    });
  });

  server.post("/api/addstaff", jsonParser, (req, res) => {
    const { dept, staffCode, name } = req.body;

    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if(err) {
        console.error("Error reading JSON File:", err);
        return res.status(500).json({error: "Error reading JSON file."});
      }

      try {
        let dataObject = JSON.parse(data);
        dataObject[dept][staffCode] = [name, "0000000"];

        fs.writeFile(dbPath, JSON.stringify(dataObject, null, 2), (writeErr) => {
          if(writeErr) {
            console.error("Error writing to db.json", writeErr);
            return res.status(500).json({error: "Error writing to db.json"});
          }

          return res.json({message: "Schedule updated successfully"});
        })
      } catch(parseError) {
        console.log("Error parsing JSON", parseError);
        return res.status(500).json({error: "Error parsing JSON"});
      }
    })
  })

  server.post('/api/updateschedule', jsonParser, (req,  res) => {
    //console.log("Server accessed", req.body);
    const { dept, staffCode, schedule } = req.body;

    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if(err) {
        console.error("Error reading JSON File:", err);
        return res.status(500).json({error: "Error reading JSON file."});
      }

      try {
        let dataObject = JSON.parse(data);
        dataObject[dept][staffCode][1] = schedule;

        fs.writeFile(dbPath, JSON.stringify(dataObject, null, 2), (writeErr) => {
          if(writeErr) {
            console.error("Error writing to db.json", writeErr);
            return res.status(500).json({error: "Error writing to db.json"});
          }

          return res.json({message: "Schedule updated successfully"});
        })
      } catch(parseError) {
        console.log("Error parsing JSON", parseError);
        return res.status(500).json({error: "Error parsing JSON"});
      }
    })
  })

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) {
      console.error('Server startup error:', err);
      return;
    }
    console.log('> Ready on http://localhost:3000');
  });
  
}).catch((ex) => {
  console.error(ex);
  process.exit(1);
});
