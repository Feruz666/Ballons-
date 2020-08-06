

var card_board = document.getElementById('card_board');
var card_board_header = document.getElementById('card_board_header');
var minimize_btn = document.getElementById("minimize_btn");
var title_header = document.getElementById("title_header");
var card_header_title_place = document.getElementById("card_header_title_place");
preventSelection(document);
var card_board_maximized = document.getElementById("card_board_maximized");
var calendar_tr = document.getElementById("calendar_tr");
var data = null;
default_date = new Date();
var store = [];
var city = [];
var all = [];
$(document).ready(function(){
    calendar_tr.value = default_date.format("yyyy-mm-dd");
    $.ajax({
        url: "http://127.0.0.1:8000/balons",
        data: {
            balon_date:calendar_tr.value,
        },
        success: function(data){
            for(var i=0; i<=data['balons'].length-1; i++){
                if(data['balons'][i]['balon_status'] == 'Склад'){
                    store.push(data['balons'][i]);
                }
                else{
                    city.push(data['balons'][i]);
                }
            }
            update(store, city, data);
        },
        dataType: "json"
      });
});


card_header_title_place.onmousedown = function(e) {

  var coords = getCoords(card_board);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;

  card_board.style.position = 'absolute';
  document.body.appendChild(card_board);
  moveAt(e);

  card_board.style.zIndex = 1000; // над другими элементами

  function moveAt(e) {
    card_board.style.left = e.pageX - shiftX + 'px';
    card_board.style.top = e.pageY - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
  };

  card_board.onmouseup = function() {
    document.onmousemove = null;
    card_board.onmouseup = null;
  };

}

card_board.ondragstart = function() {
  return false;
};

function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}


$(document).ready(function(){
    $('#minimize_btn').on('click', function(){
        minimize();
    });
    $('#maximize_btn').on('click', function(){
        maximize();
    });
});

function maximize(){
    card_board.style.display = 'inline-block';
    card_board_maximized.style.display = 'none';
    
}

function minimize(){
    card_board_maximized.style.display = 'block';
    card_board.style.display = 'none';
  
}


function preventSelection(element){
    var preventSelection = false;
  
    function addHandler(element, event, handler){
      if (element.attachEvent) 
        element.attachEvent('on' + event, handler);
      else 
        if (element.addEventListener) 
          element.addEventListener(event, handler, false);
    }
    function removeSelection(){
      if (window.getSelection) { window.getSelection().removeAllRanges(); }
      else if (document.selection && document.selection.clear)
        document.selection.clear();
    }
    function killCtrlA(event){
      var event = event || window.event;
      var sender = event.target || event.srcElement;
  
      if (sender.tagName.match(/INPUT|TEXTAREA/i))
        return;
  
      var key = event.keyCode || event.which;
      if (event.ctrlKey && key == 'A'.charCodeAt(0))  
      {
        removeSelection();
  
        if (event.preventDefault) 
          event.preventDefault();
        else
          event.returnValue = false;
      }
    }
  
    // не даем выделять текст мышкой
    addHandler(element, 'mousemove', function(){
      if(preventSelection)
        removeSelection();
    });
    addHandler(element, 'mousedown', function(event){
      var event = event || window.event;
      var sender = event.target || event.srcElement;
      preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
    });
  
   
    addHandler(element, 'mouseup', function(){
      if (preventSelection)
        removeSelection();
      preventSelection = false;
    });
  
    
    addHandler(element, 'keydown', killCtrlA);
    addHandler(element, 'keyup', killCtrlA);
  }

  var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);





function simpleTemplating(data) {
    var html = '';
    $.each(data, function(index, item){
        html += '<tr class="pure-table-odd">'+'<td class="tb-highlight" style="background:#f8f2da">'+ item.balon_num +'</td>'+'<td>'+ item.balon_status +'</td>'+'<td>'+ item.balon_state +'</td>'+'<td>'+ item.date +'</td>'+'</tr>';
    });
    html += '';
    return html;
}
function update(data, data2, data3){
    $('#pagination-container').pagination({
        dataSource: data,
        locator: 'balons',
        pageSize: 14,
        callback: function(data, pagination) {
            var html = simpleTemplating(data);
            $('#data-container').html(html);
        }
    });
    $('#pagination-container2').pagination({
        dataSource: data2,
        locator: 'balons',
        pageSize: 14,
        callback: function(data, pagination) {
            var html = simpleTemplating(data);
            $('#data-container2').html(html);
        }
    });
    $('#pagination-container3').pagination({
        dataSource: data3,
        locator: 'balons',
        pageSize: 14,
        callback: function(data, pagination) {
            var html = simpleTemplating(data);
            $('#data-container3').html(html);
        }
    });
}

$("#calendar_tr").datepicker({
    maxDate: new Date(),
    dateFormat:'yyyy-mm-dd',
    onSelect: function(selected, evnt){
        $.ajax({
            url: "http://127.0.0.1:8000/balons",
            data: {
                balon_date:selected,
            },
            success: function(data){
                store = [];
                city = [];
                for(var i=0; i<=data['balons'].length-1; i++){
                    if(data['balons'][i]['balon_status'] == 'Склад'){
                        store.push(data['balons'][i]);
                    }
                    else{
                        city.push(data['balons'][i]);
                    }
                }
                update(store, city, data);
            },
            dataType: "json"
        });
    }
});



$(document).ready(function(){
    $('#calendar_tr').on('change', function(){ alert(' я не искал ответ в гугле :D ') });
});


$("#id_balon_status").change(function() {
  if ($(this).val() == "Город") {
    $("#id_balon_state").attr("disabled", "disabled");
  } else {
    $("#id_balon_state").removeAttr("disabled");
  }
}).trigger("change");

$("#btn").on("click", function(){
  if(!$("#id_balon_num").val() == ""){
    if(!isNaN(parseInt($("#id_balon_num").val()))){
      const csrftoken = getCookie('csrftoken');
      data = {balon:{balon_num:parseInt($("#id_balon_num").val(),10),balon_status: $("#id_balon_status").val(),balon_state: $("#id_balon_state").val(),date: default_date.format("yyyy-mm-dd")}};
      console.log(data);
      $.ajax({
        url: "http://127.0.0.1:8000/api/balons/",
        data: JSON.stringify(data),
        type: 'POST',
        headers:{'X-CSRFToken': csrftoken},
        contentType: 'application/json; charset=utf-8',
        success: function(data){
          Toast.add({
            text: "Баллон " + $("#id_balon_num").val() + " успешно добавлен",
            color: '#28a745',
            autohide: true,
            delay: 5000
            });
            postUpdate();
        },
        error: function(){
          Toast.add({
            text: "Внутреняя ошибка",
            color: '#FF7373',
            autohide: true,
            delay: 5000
            });
        },
    });
    }else{
      Toast.add({
        text: "Неверно введен номер баллона",
        color: '#FF7373',
        autohide: true,
        delay: 5000
        });
    }
  }else{
    Toast.add({
      text: "Неверно введен номер баллона",
      color: '#FF7373',
      autohide: true,
      delay: 5000
      });
  }
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function postUpdate(){
  $.ajax({
    url: "http://127.0.0.1:8000/balons",
    data: {
        balon_date:calendar_tr.value,
    },
    success: function(data){
        store = [];
        city = [];
        for(var i=0; i<=data['balons'].length-1; i++){
            if(data['balons'][i]['balon_status'] == 'Склад'){
                store.push(data['balons'][i]);
            }
            else{
                city.push(data['balons'][i]);
            }
        }
        update(store, city, data);
    },
    dataType: "json"
});
}

