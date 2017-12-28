/*document.addEventListener('DOMContentLoaded', ClearContent);*/




function listElement(in_number, in_text) {
var elem = document.getElementById('sectionID2');
var newDiv = document.createElement("div");
var newDiv2 = document.createElement("div");
var newDiv3 = document.createElement("div");
var newDiv4 = document.createElement("div");
var newDiv5 = document.createElement("div");
var newDiv6 = document.createElement("div");
var newDiv7 = document.createElement("div");
var newDiv8 = document.createElement("div");
var newDiv9 = document.createElement("div");

var newDiv10 = document.createElement("input");
var newDiv11 = document.createElement("button");

newDiv.classList.add("row");

newDiv2.classList.add("items-list");newDiv2.classList.add("col");newDiv2.classList.add("col-lg-8");
newDiv2.classList.add("col-md-12");newDiv2.classList.add("col-sm-12");
newDiv3.classList.add("row");newDiv3.classList.add("list-item");
newDiv4.classList.add("col-1");newDiv4.classList.add("grbtn");
newDiv5.classList.add("triangle-up");newDiv5.classList.add("trhoverup");newDiv5.classList.add("localup");
newDiv6.classList.add("triangle-down");newDiv6.classList.add("trhoverdown");newDiv6.classList.add("localdown");
$(newDiv5).data('mykey', in_number);$(newDiv6).data('mykey', in_number);

newDiv7.classList.add("col-1");newDiv7.classList.add("item-number");newDiv7.innerHTML = in_number;
newDiv8.classList.add("col-7");
newDiv9.classList.add("col-3");

newDiv10.classList.add("form-control");newDiv10.classList.add("field");newDiv10.value = in_text;
newDiv10.disabled = true;
newDiv11.classList.add("itmbtn");newDiv11.classList.add("btn"); newDiv11.classList.add("btnremove");newDiv11.classList.add("btn-primary");
newDiv11.innerHTML = "remove"; $(newDiv11).data('mykey', in_number);

/*$(newDiv11).data('mykey', in_number);*/

/*$(newDiv5).children('.localup')*/
/*$('.localup').on('click', function() {
    debugger;
    console.log(this);
    let jqThis = $(this);
    console.log(jqThis.data + 'up');
})*/

newDiv9.appendChild(newDiv11);
newDiv8.appendChild(newDiv10);
newDiv4.appendChild(newDiv5);
newDiv4.appendChild(newDiv6);
newDiv3.appendChild(newDiv4);
newDiv3.appendChild(newDiv7);newDiv3.appendChild(newDiv8);newDiv3.appendChild(newDiv9);
newDiv2.appendChild(newDiv3);
newDiv.appendChild(newDiv2);
elem.appendChild(newDiv);
}


function ClearContent() {
      document.getElementById('sectionID2').innerHTML='';
      /*document.getElementById('sectionID').innerHTML='test';*/	
		/*document.getElementById('sectionID').innerHTML = `<div class="row" id = "Event">
		         <h6 class="col-8" style = "max-width:15%; padding-top:1rem;" id = "Eventtext"></h6>
		           <div class="col-1 grbtn">
		             <div class = "triangle-up trhoverup"></div>
		             <div class = "triangle-down trhoverdown"></div>
		           </div> <button class="btn btn-primary col-2" id = 'Editname'>Edit name</button>
		         <button class="btn btn-primary col-2" id = 'Deletebtn'>Delete</button>
		    </div>`;*/
};

function getListfromDb(event) {

	$.ajax({
      url: '/admin/getdata/'+event ,
      method: 'GET',
      success: function(data) {
      	   var results = data.result;
            for (let item of results) {
		        listElement(item.ordr,item.Name); 
		      }
			                $('.localup').on('click', function() {
							    let jqThis = $(this);
							    let l_order =jqThis.data('mykey');
							    let curevent = localStorage.getItem('current-event');

							    changeOrder(l_order, event, 'up')
							    	.then(function() {
									    ClearContent();
							    		renderList(curevent);
							    	})
							    	.catch(function(err) {
							    		console.error(err);
							    	})
							});

							$('.localdown').on('click', async function() {
							    let jqThis2 = $(this);
							    let l_order =jqThis2.data('mykey');
							    let curevent2 = localStorage.getItem('current-event');
							    /*changeOrder(l_order, event, 'down');
							    ClearContent();
							    renderList(curevent2);/*curevent это не id события, а его порядковый номер в выводе*/
                                //changeOrder(l_order, event, 'down');

						    	await changeOrder(l_order, event, 'down');
							    ClearContent();
					    		renderList(curevent2);

							});

							$('.btnremove').on('click', async function() {
							    let jqThis2 = $(this);
							    let l_order =jqThis2.data('mykey');
							    let curevent3 = localStorage.getItem('current-event');
						    	await removeItem(l_order, event);
							    ClearContent();
					    		renderList(curevent3);

							});

      },
      error: function (data) {
        console.error('error', data)
      }
    });
}

function changeOrder (ordr, event, direction) {

	//alert('/admin/changeOrder/'+ ordr +"/"+event+"/"+direction);
    /*$.ajax({
      url: '/admin/changeOrder/'+ ordr +"/"+event+"/"+direction ,
      method: 'GET',
      success: function(data) {
      },
      error: function (data) {
        console.error('error', data)
      }
    });*/

    var promise = $.ajax({
      url: '/admin/changeOrder/'+ ordr +"/"+event+"/"+direction ,
      method: 'GET'
    });
    return promise;
};

function removeItem (ordr, event) {

    var promise = $.ajax({
      url: '/admin/removeItem/'+ ordr +"/"+event ,
      method: 'GET'
    });
    return promise;
};

async function getEvents(cur_event) {
	    /*cur_event порядковый номер в выводе, а не id события*/

    let return_value;

    let promise = $.ajax({
      url: '/admin/getEvents',
      method: 'GET'
    });

    let data = await promise;

  	var results = data.result;

    var l_current_event = +0;
  	if (!!cur_event) {
       l_current_event = +cur_event;
  	}

  	if ((cur_event >= results.length)||(cur_event < 0))
  	{
  		l_current_event = +0;
  	}

    localStorage.setItem('current-event', l_current_event);
	item=results[l_current_event];
	SetEvent(item.Event);
    return_value=item.id;
   
    return return_value;
}

function SetEvent(item) {
	document.getElementById('Eventtext').innerHTML = "Event:" + item;
}

async function renderList(in_curevent){
  let l_var = await getEvents(in_curevent);
  getListfromDb(l_var);
}

function onClickEventUp() {
	let curevent = localStorage.getItem('current-event');
	ClearContent();
	curevent = +curevent+1;
	localStorage.setItem('current-event', curevent);
	renderList(curevent);
}
function onClickEventDown() {
	let curevent = localStorage.getItem('current-event');
	ClearContent();
	curevent = curevent-1;
	localStorage.setItem('current-event', curevent);
	renderList(curevent);
}

function onClickCreateEvent() {
    var prName = prompt('Введите название события');

	$.ajax({
      url: "/admin/CreateEvent/'"+ prName+"'",
      method: 'GET',
      success: function(data) {
      	 console.log('data');
      },
      error: function (data) {
        console.log('error');
      }})};


function ChangeEventName () {

	var val = document.getElementById("Eventtext").textContent;
    var prName = prompt('Введите название события', val.substr(6, (val.length-6)));

    let curevent4 = localStorage.getItem('current-event');

	let promise = $.ajax({
      url: "/admin/EditEvent/'"+ prName+"'/" + curevent4,
      method: 'GET',
      success: function() {
      	console.log('succ')
      }
    });

	return promise;
}


async function onClickEditName() {
	try {
   	  await ChangeEventName();
	} catch (err) {
		console.error(err);
	}
    console.log('after await')
    let curevent6 = localStorage.getItem('current-event');
    ClearContent();
    renderList(curevent6);
}

function DeleteEvent () {

    let curevent4 = localStorage.getItem('current-event');

	let promise = $.ajax({
      url: "/admin/DeleteEvent/" + curevent4,
      method: 'GET'});

	return promise;
}

async function onClickDeleteEvent() {

	result = confirm('Вы действительно зотите удалить событие?');
	if 	(result==true) {
    await DeleteEvent();
    }

    ClearContent();
    renderList();
}


async function AddNewClient() {
	var prName = prompt('Введите имя');
    var curevent7 = localStorage.getItem('current-event');
      
    let promise = $.ajax({
      url: "/admin/AddClient/'"+ prName+"'/"+curevent7,
      method: 'GET'});

	return promise;
}



async function onClickAddClient() {

   try {
   	  await AddNewClient();
	} catch (err) {
		console.log('ошибка');
		console.error(err);
	}
	let curevent8 = localStorage.getItem('current-event');
	console.log('after await');
    ClearContent();
    renderList(curevent8);
}


function init() {
	renderList();
}

document.getElementById("Editname").addEventListener("click", onClickEditName);
document.getElementById("Deletebtn").addEventListener("click", onClickDeleteEvent);
document.getElementById("AddNewClient").addEventListener("click", onClickAddClient);
document.getElementById("createeventbtn").addEventListener("click", onClickCreateEvent);
document.getElementById("Eventup").addEventListener("click", onClickEventUp);
document.getElementById("Eventdown").addEventListener("click", onClickEventDown);

init();

/*
function getEvents() {

	l_flag = false;
  
    let return_value;

    let promise = $.ajax({
      url: '/admin/getEvents',
      method: 'GET'
    })

    // let data = promise;

    promise.then(function(data) {

	  	var results = data.result;

	    for (let item of results) {
		        if (!l_flag) {
		            l_flag=true;
				    SetEvent(item.Event);
				    return_value=item.id;
				    alert(return_value);
			          };

	        return return_value;	
    }
    .catch(function (data) {
      	alert('ошибка');
        console.error('error', data)
      }
    })
   
    // alert(return_value);
    return promise
    // return return_value;
}

function SetEvent(item) {
	document.getElementById('Eventtext').innerHTML = "Event:" + item;
}

function init(){
  getEvents().then(function(data){
    getListfromDb(data);
  	
  });
  
}

init();
*/

/*getListfromDb();*/

/*var tmp = `<div class="items-list col col-lg-8 col-md-12 col-sm-12">
 <div class="list-item row">
   <div class="col-1 grbtn">
     <div class = "triangle-up trhoverup"></div>
     <div class = "triangle-down trhoverdown"></div>
   </div>
   <div class="col-1 item-number">${number}</div>
   <div class="col-7"><input type="text" class="form-control field" value="${name}"></div>
   <div class="col-3"><button class="btn btn-primary itmbtn">remove</button></div>
 </div>`
var compile = _.template(tmp);
var result = compile({number: 1, name: 'asd'})
document.getElementById('#list').innerHTML = 'asdasd'*/