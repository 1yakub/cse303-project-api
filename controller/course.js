
const db=require('../databse');


//Create 
exports.addNewCourse= async(req,res,next)=>{
        const {username,password}=req.body;
        // console.log(username,password)
    
        if(username && password){
            const new_query=`INSERT INTO COURSE (username,password)  VALUES ( ?,?);`
            try {
                db.query(new_query,[username,password],(err,row)=>{
                    if(!err){
                        // consSole.log(row)
                        res.status(200).send({
                            message:"Created",
                            
                        })
                    }
                    else{
                        res.status(500).send({message:err})
                        console.log(err)
                    }
                })
                
                
            } catch (error) { 
                console.log(error)
            }
        }
}

//read
exports.getAllCourses=async (req,res,next)=>{
    const new_query=`SELECT * FROM COURSE;`
   try {
    db.query(new_query,(err,data)=>{
        if(!err){
            // console.log(data)
            res.status(200).send({
                data:data,
                message:"Created",
                
            })
        }
        else{
            res.status(500).send({message:err})
            console.log(err)
        }
    })
   } catch (error) {
       console.log(error);
   }
}

//update
exports.editCourseById=async (req,res,next)=>{
    const userId= req.params.id
    const query = req.body.query
    const data = req.body.data
    console.log(req.body)
    const new_query=`UPDATE COURSE 
    SET 
        ${query}
    WHERE
        _id = ${userId};`
   try {
    db.query(new_query,data,(err,data)=>{
        if(!err){
            // console.log(data)
            res.status(200).send({
                data:data,
                message:"Created",
                
            })
        }
        else{
            res.status(500).send({message:err})
            console.log(err)
        }
    })
   } catch (error) {
       console.log(error);
   }
}

//delete
exports.deleteCourseById=async (req,res,next)=>{
   const userId= req.params.id
//    console.log(userId);
    const new_query=`DELETE FROM COURSE WHERE _id = ${userId};`
   try {
    
    db.query(new_query,(err,data)=>{
        if(!err){
            // console.log(data)
            res.status(200).send({
                message:"Deleted",
                
            })
        }
        else{
            res.status(500).send({message:err})
            console.log(err)
        }
    })
   } catch (error) {
       console.log(error);
   }
}


exports.getCourseEnrollmentData = async(req,res,next)=>{
    console.log(req.body)
    const year=req.body.year
    const semester= req.body.semester
    const range = req.body.range
    const new_query=`select SCHOOL_ID, count(SECTION_ID) as t from COURSE 
    inner join SECTION on COURSE.COURSE_ID=SECTION.COURSE_ID 
    INNER JOIN DEPARTMENT ON COURSE.MAJOR_ID = DEPARTMENT.DEPARTMENT_ID and 
    SEMESTER_NAME= ? and SM_YEAR=? and ENROLLED =? group by SCHOOL_ID`
    try {
     db.query(new_query,[semester,year,range],(err,data)=>{
         if(!err){
             console.log(data)
             res.status(200).send({
                 data:data,
                 message:"filtured unused",
                 
             })
         }
         else{
             res.status(500).send({message:err})
             console.log(err)
         }
     })
    } catch (error) {
        console.log(error);
    }
}