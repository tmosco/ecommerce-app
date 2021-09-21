// const errorHandler =(code) =>{
//     console.log(code);
//     let message ="";
//     if(code === 11000){
// message ="The Name already exists in the database";
// return message;
//     }
//     else if(message ==="not Admin"){
        
//     }
//     // console.log(err)
//     // res.status(500).json({
//     //     success:false,
//     //     error:err.message

//     // })
// }

// export default errorHandler;



const errorHanler = (res, req, code) => {
    console.log(code);
  if (code === 11000) {
    return res
      .status(401)
      .json({ success: false, error: "The Name already exists" });
  } else if (code === "not Admin") {
    return res
      .status(405)
      .json({ success: false, message: "Unauthorised route" });
  }
};

export default errorHanler;
