/*document.addEventListener('DOMContentLoaded', init);*/


function InsertElement(in_number, in_name) {

    var tmp = `<div class='itemDiv col-md-6 col-lg-6 col-sm-12'>
                           <div class="item-number"><%= num %></div>
                           <div class="iteminput"><input type="text" class="form-control field" value = '<%= username %>' disabled></div>
              </div>`

    var compileFn = _.template(tmp);
    var result = compileFn({ num: in_number, username: in_name });

    document.getElementById('list').innerHTML += result;

}


function InsertChoiseElements() {
     $.ajax({
        url: '/waitlist/getEventNames',
        method: 'GET',
        success: function(data) {
            var results = data.result;
            /*console.log('results:');
            console.log(results);*/

            for (var key in results) {
                var el = results[key];
                console.log('results:');
                console.log(el.id);
                console.log(el.Event);
                
                var newLi1 = document.createElement("li");
                newLi1.classList.add("list2Item");
                /*newLi1.innerHTML = el.Event;*/
                var newA1 = document.createElement("a");
                newA1.setAttribute('href', 'http://localhost:8080/waitlist/'+el.id);
                newA1.innerHTML = el.Event;;
                /*newA1.setAttribute('href', 'http://localhost:8080/waitlist/'+el.id);*/
                newLi1.appendChild(newA1);
                document.getElementById('list2').appendChild(newLi1);

            }

        },
        error: function(data) {
            console.error('error', data);
        }
    });
}


function InsertEventName(event) {
    if (!event) return console.error('Event ID is undefined', event);

    $.ajax({
        url: '/waitlist/getEventNameById/' + event,
        method: 'GET',
        success: function(data) {
            var results = data.result;

            for (var key in results) {
                var l_id2 = results[key];
                document.getElementById('EventName').innerHTML = l_id2;
            }
        },
        error: function(data) {
            console.error('error', data);
        }
    });


}

function getListfromDb2(event) {

    InsertEventName(event);

    $.ajax({
        url: '/waitlist/getWaitlist/' + event,
        method: 'GET',
        success: function(data) {
            var results = data.result;
            for (let item of results) {
                InsertElement(item.ordr, item.Name);
            }
        },
        error: function(data) {
            console.error('error', data)
        }
    });
}

/*function setFirstID() {

    $.ajax({
        url: '/waitlist/getIdList/',
        method: 'GET',
        success: function(data) {
            var results = data.result;
            var flag = false;

            for (let item of results) {
                if (!flag) {
                    localStorage.setItem('curevent', item.id);
                    flag = true;
                }
                localStorage.setItem('maxevent', item.id);
            }
        },
        error: function(data) {
            console.error('error', data)
        }
    });
}*/

function ClearContent() {
    document.getElementById('list').innerHTML = '';
}


function rePaint(currentEventId) {
    ClearContent();
    getListfromDb2(currentEventId);
}


function init() {
    var currentEventId = /\/(\d+$)/.exec(window.location.href)[1];
    console.log('curevent:' + currentEventId);

    InsertChoiseElements();
    //setFirstID();
    setInterval(function() {
      rePaint(currentEventId);
    }, 1000);
}

/*function onClickLeftNext() {

    var l_id = localStorage.getItem('curevent');


    $.ajax({
        url: '/waitlist/getPreviousId/' + l_id,
        method: 'GET',
        success: function(data) {
            var results = data.result;

            for (var key in results) {
                console.log(results[key]);
                var l_id2 = results[key];
                localStorage.setItem('curevent', l_id2);
            }
            ClearContent();
            getListfromDb2(l_id2);

        },
        error: function(data) {
            console.error('error', data);
        }
    });



}

function onClickRightNext() {
    var l_id = localStorage.getItem('curevent');

    $.ajax({
        url: '/waitlist/getNextId/' + l_id,
        method: 'GET',
        success: function(data) {
            var results = data.result;

            for (var key in results) {
                console.log(results[key]);
                var l_id2 = results[key];
                localStorage.setItem('curevent', l_id2);
            }
            ClearContent();
            getListfromDb2(l_id2);

        },
        error: function(data) {
            console.error('error', data);
        }
    });
}*/

init();

/*document.getElementById("leftnext").addEventListener("click", onClickLeftNext);
document.getElementById("rightnext").addEventListener("click", onClickRightNext);*/