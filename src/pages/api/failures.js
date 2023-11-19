import mySqlQuery from "@/helpers/mariadb";
import { createRouter } from "next-connect";

const router = createRouter();

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).end(err.message);
  },
});
router.get(GET);
async function GET(req, res, next) {
  try {
    let dataFailures = await mySqlQuery(`select * from fallas`);
    return res.status(200).json(dataFailures);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Possibly some error occurred with the DB");
  }
}
