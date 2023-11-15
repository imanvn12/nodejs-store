const { AdminEpisodeController } = require('../../http/controllers/admin/episode.controller');
const { uploadvideo } = require('../../utils/multer');

const router = require('express').Router();

router.post('/create', uploadvideo.any('video'), AdminEpisodeController.createEpisode);
router.patch('/delete/:episodeID', AdminEpisodeController.deleteEpisode);
router.post('/update/:episodeID', uploadvideo.any('video'), AdminEpisodeController.createEpisode);

module.exports = {
    AdminApiEpisodeRouter: router
}