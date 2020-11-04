const admin = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new Error('Invalid Request')
        }

        if (req.user.role !== 'ADMIN') {
            throw new Error('Not Authorized')
        }
        next();

    } catch (e) {
        res.status(403).send()
    }
}

module.exports = admin