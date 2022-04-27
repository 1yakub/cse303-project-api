const {Router} = require('express');
const router = Router();
// const db=require('../databse');
const controller = require('../controller/department');

//BASE API URL
//http://localhost:4000/api/department

/***************  
LOCAL API URL  
api/department               
***************/

router.use((req,res,next)=>{
    // console.log('Hello');
    next();
})

router.post('/add-new-department',controller.addNewDepartment);
router.get('/get-all-departments',controller.getAllDepartments);
router.delete('/delete-department-by-id/:id',controller.deleteDepartmentById)
router.put('/edit-department-by-id/:id',controller.editDepartmentById);
router.post('/get-section-by-capacity',controller.getSectionByCapacity)
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