const sequelize = require('sequelize');
const User = require('../model/Users');
const dbconfig = require('../config/dbconfig');
var fs = require('fs');
var pdf = require('html-pdf');
var ejs = require('ejs');
const path = require('path');
const { STRING } = require('sequelize');


function insertInfo(req, res,next){
    var firstNameIng = req.body.firstname1;
    var lasttNameIng = req.body.lastname1;
    var strucBenef = req.body.structure;
    var firstNameRes = req.body.firstname2;
    var lastNameRes = req.body.lastname2;
    var nombreDepl = req.body.nbr_Dep;
    var numero = req.body.numero;
    var design = req.body.designation;
    var desc = req.body.description;
    var travail = req.body.travail;
    var ressource = req.body.ressource;
    console.log(ressource);
    var deplacement = req.body.depl;
    var travailType = '';
    
    for (i=0; i < travail.length; i++) {
        travailType = travailType + travail[i];
    }

    console.log(travailType);
    console.log(ressource.length);
    console.log(ressource[1]);
    var ressourceType = '';
    
    for (j=0; j<ressource.length; j++) {
        ressourceType = ressourceType + ressource[j];
}
    User.create({
        Type_Travail: travailType,
        Type_Ressource: ressourceType,
        depl_Info: deplacement,
        first_nameIng: firstNameIng,
        last_nameIng: lasttNameIng,
        struc_benef: strucBenef,
        first_nameRes: firstNameRes,
        last_nameRes: lastNameRes,
        nbr_Dep: nombreDepl,
        numero: numero,
        designation: design,
        description: desc,
      })
          .then(() => {
              res.redirect('/');
              console.log("data inserted");
          }) 
          .catch((error) => {
              console.log(error);
          });
}

function bringInfo(req, res, next) {
    const userId = req.params.userId;
    User.findOne({where: {id_user: userId}})
        .then((data) => {
            res.render('prestationEdit', {dataEdit: data});
        })
        .catch((error) => {
            console.log(error);
        })
}

function bringInfoDetails(req, res, next) {
    const filePathName = path.resolve(__dirname, 'C:/Users/dell/Desktop/testNode/view/details.ejs');
    const htmlString = fs.readFileSync(filePathName).toString();
    const userId = req.params.userId;
    User.findOne({where: {id_user: userId}})
        .then((data) => {
            const ejsData = ejs.render(htmlString, {dataDet: data});
            var options = { format: 'A4'};
            pdf.create(ejsData, options).toStream(function (err,stream) {
                stream.pipe(res);
            })
        })
        .catch((error) => {
            console.log(error);
        })
};
        
function updateInfo(req, res, next) {
    const userId = req.body.id;
    console.log(userId);
    User.update({
        first_nameIng: req.body.firstname1,
        last_nameIng: req.body.lastname1,
        struc_benef: req.body.structure,
        first_nameRes: req.body.firstname2,
        last_nameRes: req.body.lastname2,
        nbr_Dep: req.body.nbr_Dep,
        numero: req.body.numero,
        designation: req.body.designation,
        description: req.body.description,
    }, {
        where: {id_user: userId}
    })
        .then((data) => {
            res.redirect("/");
            console.log("data updated");
        })
        .catch((error) => {
            console.log(error);
        })
        
}

function deleteInfo(req, res, next) {
    const userId = req.params.userId;
    User.destroy({where: {id_user: userId}})
        .then((data) => {
            res.redirect("/");
            console.log("data deleted");
        })
        .catch((error) => {
            console.log(error);
        })
        
}

function selectInfo(req, res, next) {
    User.findAll({raw:true})
    .then((data) => {
        res.render('FichePrincipale', {prest:data})
    })
    .catch((error) => {
        console.log(error);
    });
}

module.exports.insertInfo = insertInfo;
module.exports.updateInfo = updateInfo;
module.exports.deleteInfo = deleteInfo;
module.exports.selectInfo = selectInfo;
module.exports.bringInfo = bringInfo;
module.exports.bringInfoDetails = bringInfoDetails;

