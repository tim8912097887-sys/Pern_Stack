
export const handleData = (req,res,next) => {
    if(!req.body) {
        res.status(400);
        throw new Error('Please include request body');
    }
    const { name,price,image } = req.body;
    if(!name || !price || !image) {
        res.status(400);
        throw new Error('Please insert all value');
    }
    if(name.length > 255 || name.length < 2) {
        res.status(400);
        throw new Error('Name must be in the length 2 ~ 255');
    }
    if(image.length > 255 || image.length < 2) {
        res.status(400);
        throw new Error('Image must be in the length 2 ~ 255');
    }
    next();
}