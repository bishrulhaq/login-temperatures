const weatherServices = require("../services/weatherServices");
const weatherDetails = async (req, res) => {
    try {
        await weatherServices.getWeatherByUserId(req.user.id).then(async (weather) => {
            if (!weather) {
                return res.status(401).json({message: 'No Data Found!'})
            } else {
                return res.status(200).json({data: weather})
            }
        });
    } catch (e) {
        return res.status(500).json({message: e});
    }
};

module.exports = {weatherDetails};