const cors = require("cors");
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// code = frc9ecc490509fe73bb582de69e1f767
// access_token = frOMjAa0luaTKNo9kOT7c3PtqPHhbnoY7H41AmX17UNphD0oI3
app.post('/token', async (req,res,next) => {
  try {
    const auth = await axios({
      baseURL: "https://connect.deezer.com/oauth/access_token.php",
      method: "POST",
      params: {
        app_id: "508522",
        secret: "7b18cd1e861866ca0a2bef3a3657a8ac",
        code: "fr5924ced815d0952aa7074b5d25519a",
      },
    })

    console.log(auth)
    // res.status(200).json(auth)
  } catch (err) {
    console.log(err)
  }
})

app.get('/track', async (req, res, next) => {
  try {
    const track = await axios({
      baseURL: "https://api.deezer.com/track/3135551",
      method: "GET",
      headers: {
        id: "int",
        title: "string"
      }
    })

    console.log(track)
    res.status(200).json(track.data)
  } catch (err) {
    console.log(err)
  }
})

app.get('/search', async (req, res, next) => {
  try {
    const search = await axios({
      baseURL: "https://api.deezer.com/search",
      method: "GET",
      params: {
        q: "alanwalker"
      }
    })

    console.log(search.data)
  } catch (err) {
    console.log(err)
  }
})


app.listen(port, (_) => console.log("Server run at port", port));
