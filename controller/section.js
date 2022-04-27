
const db=require('../databse');


//Create 
exports.addNewCourse= async(req,res,next)=>{
        const {username,password}=req.body;
        // console.log(username,password)
    
        if(username && password){
            const new_query=`INSERT INTO USERS (username,password)  VALUES ( ?,?);`
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
    const new_query=`SELECT * FROM USERS;`
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
    const new_query=`UPDATE Users 
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
    const new_query=`DELETE FROM Users WHERE _id = ${userId};`
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


exports.getFilteredRevinew = async(req,res,next)=>{
    console.log(req.body)
    const year=req.body.year
    const semester= req.body.semester
    const school = req.body.school
    const new_query=`select SCHOOL_ID,
     SUM(ENROLLED*CREDIT_HOUR) as data from SECTION 
     INNER JOIN COURSE ON SECTION.COURSE_ID = COURSE.COURSE_ID 
     INNER JOIN DEPARTMENT ON COURSE.MAJOR_ID = DEPARTMENT.DEPARTMENT_ID
      WHERE SEMESTER_NAME=? and SM_YEAR=? and SCHOOL_ID =?;`
    try {
     db.query(new_query,[semester,year,school],(err,data)=>{
         if(!err){
             console.log(data)
             res.status(200).send({
                 data:data,
                 message:"filtured",
                 
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


exports.getAllUnusedSections= async(req,res,next)=>{
    console.log(req.body)
    const year=req.body.year
    const semester= req.body.semester
    
    const new_query=`select SCHOOL_ID, sum(ENROLLED) as totalen,avg(ENROLLED) as averageen ,
    avg(ROOM.CAPACITY) as avgcapacity, (avg(ROOM.CAPACITY)-avg(ENROLLED)) as diffrence
     from SECTION INNER JOIN COURSE ON SECTION.COURSE_ID = COURSE.COURSE_ID 
     INNER JOIN DEPARTMENT ON COURSE.MAJOR_ID = DEPARTMENT.DEPARTMENT_ID
      INNER JOIN ROOM ON SECTION.ROOM_ID = ROOM.ROOM_ID
       WHERE SEMESTER_NAME=? and SM_YEAR=? group by SCHOOL_ID`
    try {
     db.query(new_query,[semester,year],(err,data)=>{
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

exports.getSectionWiseComparison = async(req,res,next)=>{
    //
    console.log(req.body)
    const year=req.body.year
    const semester= req.body.semester
    const urange=req.body.urange
    const lrange=req.body.lrange
    const new_query=`SELECT COUNT(*) AS Sections,ROUND((COUNT()/14.0),2) AS Slot_of_7,
     ROUND((COUNT()/16.0),2) AS Slot_of_8
     from (select from SECTION 
    where SEMESTER_NAME=? and SM_YEAR=? and ENROLLED BETWEEN ${urange} and ${lrange} )as dadao;`
    try {
     db.query(new_query,[semester,year],(err,data)=>{
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