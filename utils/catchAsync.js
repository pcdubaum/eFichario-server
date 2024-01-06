module.exports = cathAsync = fn => {
    return(req, res, next) => { 
        fn(req, res, next).cath(err => next)
    }
}

