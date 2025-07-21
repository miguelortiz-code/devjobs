import flash from 'connect-flash';

const message = (req, res, next) =>{
    res.locals.message = req.flash();
    next();
}

export {message};