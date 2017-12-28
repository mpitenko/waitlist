const Sequelize = require('sequelize');
  

/*const sequelize = new Sequelize({
  database: 'sys',
  username: 'root',
  password: 'Newpass1',
  dialect: 'mysql'
});*/

/*var adm = '\'admin\'';
var password = '\'asd\'';

console.log(password);*/

/*sequelize.query("SELECT COUNT(*) FROM passwords WHERE username = "+ adm +" and password = "+ password).then(function(myTableRows) {
    for(let item of myTableRows)
    {
      console.log(item[0]); 
    }
});*/

/*sequelize.query("CALL write_log('first log');").then(function(myTableRows) {
    var x =10;
});*/

/*sequelize.query("Select p.*, e.event from Persons p, Event e where p.Event_id = e.id").then(function(myTableRows) {
      for(let item of myTableRows)
      {
        console.log(item[0].Name); 
      }
  });*/

//////////////////////////////////
/*const Sequelize = require('sequelize');*/
  

/*const sequelize = new Sequelize({
  database: 'sys',
  username: 'root',
  password: 'Newpass1',
  dialect: 'mysql'
});*/



/*sequelize.query("Select count(*) cnt from Persons p, Event e where p.Event_id = e.id").then(function(myTableRows) {
      for(let item of myTableRows)
      {
        k=item[0].cnt; 
      }
});*/


/*sequelize.query("Select p.*, e.event from Persons p, Event e where p.Event_id = e.id").then(function(myTableRows) {

  var results = myTableRows[0];
  
      for (let item of results) {
        console.log(item.Name); 
        console.log(item.event);
        console.log(item.ordr);
        console.log(item.PersonID);
        console.log(item.Event_id);
      }
  });*/

/*sequelize.query("CALL Clear_sessions();").then(function(myTableRows) {
    var x =10;
});*/
/////////////////////////////