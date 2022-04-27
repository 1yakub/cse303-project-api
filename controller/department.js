
const db=require('../databse');


//Create 
exports.addNewDepartment= async(req,res,next)=>{
        const {username,password}=req.body;
        // console.log(username,password)
    
        if(username && password){
            const new_query=`INSERT INTO DEPARTMENT (username,password)  VALUES ( ?,?);`
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
exports.getAllDepartments=async (req,res,next)=>{
    const new_query=`SELECT * FROM DEPARTMENT;`
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
exports.editDepartmentById=async (req,res,next)=>{
    const userId= req.params.id
    const query = req.body.query
    const data = req.body.data
    console.log(req.body)
    const new_query=`UPDATE DEPARTMENT 
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
exports.deleteDepartmentById=async (req,res,next)=>{
   const userId= req.params.id
//    console.log(userId);
    const new_query=`DELETE FROM DEPARTMENT WHERE _id = ${userId};`
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

exports.getSectionByCapacity = async(req,res,next)=>{
    console.log(req.body)
    const year=req.body.year
    const semester= req.body.semester
    const urange = req.body.urange
    const lrange = req.body.lrange
    const new_query=`select DEPARTMENT_ID, count(SECTION_ID) as summary
     from SECTION INNER JOIN COURSE ON 
     SECTION.COURSE_ID = COURSE.COURSE_ID
      INNER JOIN DEPARTMENT ON COURSE.MAJOR_ID = DEPARTMENT.DEPARTMENT_ID 
      where SEMESTER_NAME=? and SM_YEAR=? and 
      ENROLLED BETWEEN ${urange} and ${lrange} and SCHOOL_ID='SETS' group by DEPARTMENT_ID;`
    try {
     db.query(new_query,[semester,year],(err,data)=>{
         if(!err){
             console.log(data)
             res.status(200).send({
                 data:data,
                 message:"filtured section",
                 
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