import React, {useState} from "react"
import './App.css';
import { Typography, Button, Container, Grid, Card, CardContent, CardMedia, Divider, CardActions, Box, Fade, ThemeProvider, Link } from "@material-ui/core"
import { motion } from "framer-motion"
import { red, blue, green } from "@material-ui/core/colors";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {createMuiTheme} from "@material-ui/core/styles"
import Wave from 'react-wavify'
import Dream from "./Images/dream2.svg"
import BLM from "./Images/blm.svg"
import Factory from "./Images/factory.svg"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import { FormatQuote } from "@material-ui/icons";
import wealthInequality from "./Images/wealthinequality.jpeg"
import healthcare from "./Images/healthcare.png"
import studentDebt from "./Images/studentDebt.jpeg"

function App() {
  const [openData, setOpenData] = useState(false);
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      }
    }
  }
    
  const item = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.2, type: "spring", stiffness: 100, damping: 15
      }
    }
  }
  const [income, setIncome] = useState("")

  const handleIncomeChange = (event) => {
    setIncome(event.target.value);
  };
  const [race, setRace] = useState("")

  const handleRaceChange = (event) => {
    setRace(event.target.value);
  };
  const [gender, setGender] = useState("")

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const [loading, setLoading] =  useState(false);
  const [result, setResult] =  useState("");
  const [score, setScore] = useState("");
  const stats = [
    {"White": {Intercept: 36.82, Slope: 0.32, Mobility: 10.6}},
    {"Black": {Intercept: 25.43, Slope: 0.28, Mobility: 2.5}},
    {"Asian": {Intercept: 51.44, Slope: 0.18, Mobility: 16.9}},
    {"Hispanic": {Intercept: 36.14, Slope: 0.26, Mobility: 7.1}},
    {"American Indian/Alaska Native": {Intercept: 25.16, Slope: 0.31, Mobility: 3.3}}
  ]
  const simulate = () => {
    var intercept = 0;
    var slope = 0;
    var mobilityScore = 0;
    for (const i in stats) {
      if(race === Object.keys(stats[i])[0]) {
        intercept = stats[i][race].Intercept
        slope = stats[i][race].Slope
        mobilityScore = stats[i][race].Mobility
      }
    }
    var prediction = slope * income + intercept
    prediction = prediction.toFixed(2)
    if(gender === "Female") {
      mobilityScore *= 0.75;
    }
    mobilityScore = mobilityScore.toFixed(2)
    setResult(prediction)
    setScore(mobilityScore)
  }
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[400]
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
          <motion.div 
          initial={{y: -100, opacity: 0}}
          animate={{y: -20, opacity: 1}}
          transition={{ duration: 0.2, type: "spring", stiffness: 50}}>
          <Card elevation={8} style={{width: "450px", padding: "10px", textAlign: "center", margin: "50px auto", borderRadius: "5px"}}>
            <CardMedia>
              <img 
                  src={Dream}
                  width="300px"
                  alt="MainImg"
              />
            </CardMedia>
            <CardContent>
              <Typography variant="h5" style={{margin: "10px 0px"}}>Welcome to the American Dream Simulator</Typography>
              <Typography variant="body2">This is a simulator that will take into account various factors, including socioeconomic status, race, and gender. From there, the data will be processed and your predicted income percentile will be outputed, in addition to your social mobility score, which indicates how easy it is to achieve upwards social mobility.</Typography>
            </CardContent>
            <Button variant="contained" color="primary" style={{margin: "10px 0px", borderRadius: "10px", textTransform: "none", color: "white"}} onClick={() => setOpenData(true)}>Get Started</Button>
          </Card>
        </motion.div>
        {openData ? 
          (
            <>
              <motion.div variants={container} initial="hidden" animate="visible">
                <Grid container justify="center" spacing={5}>
                  <motion.div variants={item} initial="hidden" animate="visible">
                    <Grid item>
                      <FormControl style={{width: "200px", marginRight: "20px"}}>
                        <InputLabel id="select-income">Household Income</InputLabel>
                        <Select
                          labelId="select-incomet-label"
                          id="select-income"
                          value={income}
                          onChange={handleIncomeChange}
                        >
                          <MenuItem value={15}>Poor (less than $30k)</MenuItem>
                          <MenuItem value={30}>Lower-middle class ($30k-$50k)</MenuItem>
                          <MenuItem value={55}>Middle class ($50k-$100k)</MenuItem>
                          <MenuItem value={90}>Upper-middle class ($100k-$375k)</MenuItem>
                          <MenuItem value={99}>Rich (more than $375k)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </motion.div>
                  <motion.div variants={item} initial="hidden" animate="visible">
                    <Grid item>
                    <FormControl style={{width: "200px", marginRight: "20px"}}>
                        <InputLabel id="select-income">Race/Ethnicity</InputLabel>
                        <Select
                          labelId="select-incomet-label"
                          id="select-income"
                          value={race}
                          onChange={handleRaceChange}
                        >
                          <MenuItem value={"American Indian/Alaska Native"}>American Indian/Alaska Native</MenuItem>
                          <MenuItem value={"Asian"}>Asian</MenuItem>
                          <MenuItem value={"Black"}>Black</MenuItem>
                          <MenuItem value={"Hispanic"}>Hispanic</MenuItem>
                          <MenuItem value={"White"}>White</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </motion.div>
                  <motion.div variants={item} initial="hidden" animate="visible">
                    <Grid item>
                    <FormControl style={{width: "200px"}}>
                        <InputLabel id="select-income">Gender</InputLabel>
                        <Select
                          labelId="select-incomet-label"
                          id="select-income"
                          value={gender}
                          onChange={handleGenderChange}
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </motion.div>
                </Grid>
              </motion.div>
              <br></br>
              <motion.div 
              style={{margin: "20px auto", textAlign: "center"}}>
                <Button 
                  variant="outlined" 
                  component={motion.div} 
                  color="primary"
                  whileHover={{scale: 1.05,transition: { duration: 0.2 }}}
                  whileTap={{ scale: 0.95 }}
                  onClick={simulate}>
                    Simulate
                </Button>
              </motion.div>
              {result ? 
                (
                  <motion.div 
                  initial={{y: 200, opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{ duration: 0.1, type: "spring", stiffness: 100 }}
                  style={{textAlign: "center"}}>
                    <Card style={{width: "350px", margin: "10px auto", borderRadius: "5px", padding: "5px"}} elevation={4}>
                      <CardContent>
                        <Typography variant="h6"><strong>Predicted income percentile:</strong></Typography>
                        <Typography variant="h5">{result}</Typography>
                        <Typography variant="h6"><strong>Mobility score:</strong> </Typography>
                        <Typography variant="h5">{score}</Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
                :
                <></>
              }
            </>
            )
          :
          <></>
        }
        <div style={{marginLeft: "50px"}}>
          <Typography variant="h6"><strong>Sources:</strong></Typography>
          <ul>
            <li>
              <Link href="https://scholar.harvard.edu/files/hendren/files/slides_for_website_v2.pdf" target="_blank">https://scholar.harvard.edu/files/hendren/files/slides_for_website_v2.pdf</Link>
            </li>
            <li>
              <Link href="http://www.equality-of-opportunity.org/assets/documents/race_summary.pdf" target="_blank">http://www.equality-of-opportunity.org/assets/documents/race_summary.pdf</Link>
            </li>
            <li>
              <Link href="https://en.wikipedia.org/wiki/Gender_pay_gap_in_the_United_States" target="_blank">https://en.wikipedia.org/wiki/Gender_pay_gap_in_the_United_States</Link>
            </li>
          </ul>
        </div>
        <div>
          
        </div>
        <div style={{width: "400px", margin: "10px auto"}}>
          <Typography style={{textAlign: "center", fontWeight: "bold"}}>Some interesting stats</Typography>
                <Carousel showArrows emulateTouch infiniteLoop style={{width:"400px"}}>
                  <div>
                  <img 
                      src={wealthInequality}
                      width="400px"
                      alt="wealth inequality"
                    />
                  </div>
                  <div>
                    <img 
                      src={healthcare}
                      width="400px"
                      alt="healthcare"
                    />
                  </div>
                  <div>
                    <img 
                      src={studentDebt}
                      width="400px"
                      alt="student debt"
                    />
                  </div>
              </Carousel>
            </div>
        <Wave fill={blue[400]}
                paused={false}
                options={{
                    height: 30,
                    amplitude: 25,
                    speed: 0.2,
                    points: 3
                }}
            />
            <div style={{background: blue[400], position: "relative", bottom: "8px", padding: "20px", color: "white"}}>
              <Typography variant="h4" style={{color: "white", fontWeight: "bold", textAlign: "center"}}>About</Typography>
              <Grid container style={{padding: "10px"}} spacing={4}>
                <Grid item style={{width: "60%"}}>
                  <Container style={{margin: "10px 0px", fontSize:"18px"}}>
                    <Typography variant="body">In America, this idea of the American Dream is something that has been heavily ingrained into our culture. It's the idea that anybody can achieve success within American society regardless of background or circumstance. While this is typically associated with financial success, people also interpret this as the dream that everybody can have equal footing to achieve their personal form of success.</Typography>
                  </Container>
                  <Container style={{margin: "10px 0px", fontSize:"18px"}}>
                    <Typography variant="body">While we have all been told to constantly pursue that metaphorical green light which we have envisioned for ourselves, the reality for millions of people is that they can't reach said light due to their circumstances, often ones they have no control over.</Typography>
                  </Container>
                  <Container style={{margin: "10px 0px", fontSize:"18px"}}>
                    <Typography variant="body">These circumstances include, but are not limited to: race, socioeconomic status, and gender. Any of these factors can play a significant role in where somebody ends up in society, and empirical evidence backs this up (see sources). The reality is, our society is deeply flawed on a systemic level towards certain groups of people, and towards people with lower income in general. This makes it much harder for those people to make a relatively comfortable living in the US.</Typography>
                  </Container>
                </Grid>
                <Grid item>
                    <div style={{margin: "10px auto", width: "300px"}}>
                      <img 
                        src={BLM}
                        width="300px"
                        alt="BLM"
                      />
                  </div>
                </Grid>
              </Grid>
              <Typography variant="h4" style={{color: "white", fontWeight: "bold", textAlign: "center"}}>Inspiration</Typography>
              <Grid container style={{padding: "10px"}} spacing={4}>
                <Grid item>
                  <img
                    src={Factory}
                    width="300px"
                    alt="Factory"
                    style={{
                      marginLeft:"50px"
                    }}
                  />
                </Grid>
                <Grid item style={{width: "60%", textAlign: "right", marginLeft: "auto"}}>
                  <Container style={{margin: "10px 0px", fontSize:"18px"}}>
                    <Typography variant="body">My dad, who grew up in a poor part of Staten Island after his mom immigrated from England, is what one would probably describe as a typical American Dream success story. He was able to overcome his circumstances growing up, worked his way up to become a professor and researcher, and was able to comfortably raise a family.</Typography>
                  </Container>
                  <Container style={{margin: "10px 0px", fontSize:"18px"}}>
                    <Typography variant="body">As a result, for a lot of my life, I thought that anyone could achieve similar results through purely hard-work, which I have only recently realized isn't the case for a significant portion of our population.</Typography>
                  </Container>
                  <Container style={{margin: "10px 0px", fontSize:"18px"}}>
                    <Typography variant="body">The truth is, for every success story in this country, there are often hundreds, or even thousands of people who were used to get to that point of success (refer to Amazon for an easy example). There are many who are subjected to do harsh work as a consequence of their socioeconomic conditions, and that work is used to primarily benefit the rich people in control. I have only recently noticed this, and realized just how lucky I have been despite a lot of my personal struggles. It really puts things in perspective, and one of my main motives in life now is to uplift those around me who don't have the same opportunities that I do.</Typography>
                  </Container>
                </Grid>
              </Grid>
              <div style={{padding: "0px 10px", textAlign: "right", marginLeft: "auto", width: "60%"}}>
              </div>
            </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
