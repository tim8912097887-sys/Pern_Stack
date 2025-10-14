
export const handleError = (err,req,res,next) => {
     if(res.statusCode === 200) res.status(500);
     res.json({ success: false,message: err.message });
}