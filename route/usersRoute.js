const express = require('express');
const router = express.Router();
const UsersCont = require('../controller/UsersCont');
const path = require('path');


router.get("/insertInfo", (req, res) => {
    res.render("C:/Users/dell/Desktop/testNode/view/formulaire.ejs");
});

router.get("/updateInfo", (req, res) => {
    res.render("C:/Users/dell/Desktop/testNode/view/prestationEdit.ejs");
});

router.get('/viewFiche/:userId', UsersCont.bringInfoDetails);

router.get('/update/:userId', UsersCont.bringInfo);
router.get('/delete/:userId', UsersCont.deleteInfo);

router.get('/', UsersCont.selectInfo);
router.post('/insertInfo', UsersCont.insertInfo);
router.post('/updateInfo', UsersCont.updateInfo);


module.exports = router;
