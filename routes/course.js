const {Router} = require('express');
const router = Router();
// const db=require('../databse');
const controller = require('../controller/course');

//BASE API URL
//http://localhost:4000/api/course


/***************  
LOCAL API URL  
api/course               
***************/

router.use((req,res,next)=>{
    // console.log('Hello');
    next();
})

router.post('/add-new-course',controller.addNewCourse);
router.get('/get-all-courses',controller.getAllCourses);
router.delete('/delete-course-by-id/:id',controller.deleteCourseById)
router.put('/edit-course-by-id/:id',controller.editCourseById);
router.post('/get-course-enrollment-data',controller.getCourseEnrollmentData)
module.exports = router;

/* 
SELECT COUNT(*) AS "Sections",
ROUND((COUNT(*)/12.0),2) AS "Classroom 6",
ROUND((COUNT(*)/14.0),2) AS "Classroom 7"
FROM (SELECT *
    FROM seas_department_t INNER JOIN seas_course_t ON deptcode=dept_id
    INNER JOIN seas_section_t ON course_id=courseid)
WHERE noofenrolledstudent BETWEEN 1 AND 10
AND semester = "Summer" AND YEAR = '2021'
CREATE TABLE Users (
    username varchar(255),
    password varchar(255),
   
);
*/