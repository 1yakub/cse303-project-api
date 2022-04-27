const {Router} = require('express');
const router = Router();
// const db=require('../databse');
const controller = require('../controller/section');

//BASE API URL
//http://localhost:4000/api/user

/***************  
LOCAL API URL  
api/user               
***************/

router.use((req,res,next)=>{
    // console.log('Hello');
    next();
})

router.post('/add-new-user',controller.addNewCourse);
router.get('/get-all-users',controller.getAllCourses);
router.delete('/delete-user-by-id/:id',controller.deleteCourseById)
router.put('/edit-user-by-id/:id',controller.editCourseById);
router.post('/get-all-sections-by-semester',controller.getAllCourses)
router.post('/get-filtured-revinew',controller.getFilteredRevinew);
router.post('/get-all-unused-sections',controller.getAllUnusedSections)
router.post('/get-section-wise-comparison',controller.getSectionWiseComparison)
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