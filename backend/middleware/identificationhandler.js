export const handleIdentification = (req,res,next) => {
    const { id } = req.param;
    if(typeof id !== "number") {
        res.status(400);
        throw new Error('Id must be number');
    }
    next();
}