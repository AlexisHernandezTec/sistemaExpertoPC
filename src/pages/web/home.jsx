import React, { useEffect, useState } from "react";
import axios from "@/libs/axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Avatar,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import styles from "@/styles/globals.css";
import ActionButton from "@/components/ActionButton";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

function Home() {
  const [dataProblems, setDataProblems] = useState([]);
  const [dataFailures, setDataFailures] = useState([]);
  const [dataSolutions, setDataSolutions] = useState([]);
  let answers = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/problems");
        setDataProblems(response?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const getFailure = async () => {
    try {
      const response = await axios.post("/problems", {
        answers,
      });
      setDataFailures(response?.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    if (dataFailures.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get("/solutions", {
            params: {
              failure: dataFailures,
            },
          });
          setDataSolutions(response?.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [dataFailures]);

  dataProblems?.map((problem) => {
    let answer = {
      problem: problem?.diagnosticos,
      val: 0,
    };
    answers.push(answer);
  });

  return (
    <div>
      <CardContent>
        <h1 className="flex justify-center items-center text-lg">
          Sistema Experto PC
        </h1>
        {Object.keys(dataFailures).length == 0 && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Errores</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h3 className="text-red-600">
                Selecciona los errores que te aparezcan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {dataProblems.map((item, index) => (
                  <div key={item.id} className="mb-0">
                    <FormGroup>
                      <FormControlLabel
                        required
                        control={
                          <Checkbox
                            onChange={(e) => {
                              let error = answers.filter(
                                (e) => e.problem == item.diagnosticos
                              );
                              if (error.length > 0) {
                                let updatedValue = e.target.checked ? 1 : 0;

                                answers.forEach((answer) => {
                                  if (answer.problem == item.diagnosticos) {
                                    answer.val = updatedValue;
                                  }
                                });
                              }
                            }}
                          />
                        }
                        label={item.diagnosticos}
                      />
                    </FormGroup>
                  </div>
                ))}
              </div>
              <ActionButton
                handlerClick={() => {
                  getFailure();
                }}
              >
                Save
              </ActionButton>
            </AccordionDetails>
          </Accordion>
        )}
        {Object.keys(dataFailures).length > 0 && (
          <Accordion expanded={true}>
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>{dataFailures}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {dataSolutions?.map((ds) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DoneAllRoundedIcon
                          color="success"
                          className="bg-green-100 rounded w-max h-max"
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ds?.solucion} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        )}
        {Object.keys(dataFailures).length > 0 && (
          <div className="flex justify-center items-center">
            <ActionButton handlerClick={() => setDataFailures([])}>
              Reload
            </ActionButton>
          </div>
        )}
      </CardContent>
    </div>
  );
}

export default Home;
