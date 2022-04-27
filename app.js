const express = require("express");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require('./middleware/error-handler');
const corsUnblocker = require('./middleware/cros-unblocker');
/* import routes */
const users = require("./routes/user");
const schoolRoutes = require('./routes/school');
const courseRoutes=require('./routes/course');
const sectionRoutes = require('./routes/section')
const departmentRoutes = require('./routes/department');
/* initialize app */
const app = express();

/* middleware */
app.use(
  bodyParser.json(),
  cors({
    origin: "*",
  })
);
/* new commnet */
/* base API links */

app.use("/api/user", users);
app.use("/api/course",courseRoutes);
app.use('/api/school',schoolRoutes);
app.use('/api/section',sectionRoutes);
app.use('/api/department',departmentRoutes);

app.use(errorHandler.route);
app.use(errorHandler.next);

//APP LISTENING AT PORT
const port = 4000;
app.listen(port, () => {
  console.log(`Server running at Port: ${port}`);
});
