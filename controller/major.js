
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