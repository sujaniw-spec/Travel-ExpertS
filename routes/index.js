var express = require('express');
var router = express.Router();

var GreetMessage = require('./Greeting'); // module for greeting
//Greeting msg
var greeingMsg;

//Clear the cache to get random greeting again
function clearModule(moduleName) {
  let mp = require.resolve(moduleName)
  if (require.cache[mp]) {
    GreetMessage = null;
    delete require.cache[mp]
    console.log(`[clear] module: ${mp}`)
  }
}


//Relaod the Random creeting module again
function requireReload(moduleName) {
  console.log("REQUIRED RELOAD***********************")
  clearModule(moduleName);
  //require(moduleName);

  return require(moduleName);
}

/* GET home page. */
router.get('/', function (req, res, next) {
  GreetMessage = requireReload('./Greeting');//get the greeting

  res.render('index', {
    greeting: GreetMessage.myGreeting,
    title: " to TravelExpert",
    //usern: 'SUJANI', dt: (Date()).toString(), imgPath: '/img/Logo.jpg'

  });

});



//if request page is not found
// router.use((req, res, next) => {
//   res.status(404).redirect("Page404.html");
// });



module.exports = router;