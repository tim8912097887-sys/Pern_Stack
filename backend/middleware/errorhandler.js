
export const handleError = (err,req,res,next) => {
     if(res.statusCode === 200) {
          const statusCode = err.statusCode || err.status || 500;
          res.status(statusCode);
     } 
     res.json({ success: false,message: err.message });
}