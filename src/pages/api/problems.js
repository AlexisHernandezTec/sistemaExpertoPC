import mySqlQuery from "@/helpers/mariadb";
import { createRouter } from "next-connect";

const router = createRouter();

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).end(err.message);
  },
});
router.get(GET).post(POST);
async function GET(req, res, next) {
  try {
    let dataProblems = await mySqlQuery(`select * from diagnosticos`);
    return res.status(200).json(dataProblems);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Possibly some error occurred with the DB");
  }
}
async function POST(req, res, next) {
  let { answers } = req.body;
  try {
    let answersSelected = answers.filter((e) => Number(e.val) == 1);
    let answersDB = await mySqlQuery(
      `select * from v_respuestas_diagonosticos_dataset where valido = 1`
    );
    let dataFailures = [];
    answersSelected.forEach((as) => {
      answersDB.forEach((adb) => {
        if (as.problem == adb.diagnosticos) dataFailures.push(adb.falla);
      });
    });
    if (Object.keys(dataFailures).length == 0)
      return res.status(500).json("Answers cant be null");
    const frequency = dataFailures.reduce((c, e) => {
      c[e] = (c[e] || 0) + 1;
      return c;
    }, {});

    const failure = Object.keys(frequency).reduce((a, b) =>
      frequency[a] > frequency[b] ? a : b
    );
    return res.status(200).json(failure);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Possibly some error occurred with the DB");
  }
}
