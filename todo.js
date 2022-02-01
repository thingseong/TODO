todos = JSON.parse(localStorage.getItem('ob'));
if (todos == null){
    todos = new Array();
}



function showTodo(){
    console.log(todos);
    document.getElementById('todolist').innerHTML = "";
    for (let t in todos){
        e = document.createElement('li');
        e.id = todos[t]['id'];
        e.setAttribute("onclick", "tmp(this)")
        let check = "unchecked"

        
        // check box
        checkBox = document.createElement('input');
        checkBox.setAttribute("onclick", "checkTodo(this)")
        checkBox.setAttribute('type', "checkbox");
        checkBox.setAttribute('class', "check");
        if(todos[t]['color'] == "t"){
            check = "checked"
            checkBox.setAttribute('checked', "");
        }
        e.setAttribute("class", check); // 줄긋기

        
        spanBtns = document.createElement('span');
        spanBtns.setAttribute("class", 'btns');

        // Up Btn
        upBtn = document.createElement('button');
        upBtn.setAttribute('class', 'btn fa fa-arrow-up');
        upBtn.setAttribute('onclick', 'upTodo(this)');
        // upBtn.innerText = 'UP';
        
        // Down Btn
        downBtn = document.createElement('button');
        downBtn.setAttribute('onclick', 'downTodo(this)');
        downBtn.setAttribute('class', 'btn fa fa-arrow-down');
        // downBtn.innerText = 'DOWN';
        
        // Del Btn
        delBtn = document.createElement('button');
        delBtn.setAttribute('onclick', 'delTodo(this)');
        delBtn.setAttribute('class', 'btn fa fa-trash');
        // delBtn.innerText = 'DEL';
        
        // li 오른쪽 부분
        spanBtns.append(upBtn, downBtn, delBtn);

        
        e.append(checkBox, todos[t]["todo"], spanBtns);



        document.getElementById('todolist').appendChild(e);
    }
    localStorage.setItem('ob', JSON.stringify(todos));
}

function generateID(){
    return Math.random().toString(36).substr(2, 16);
}


function addTodo(){

    id = generateID();
    todo = document.getElementById("todo").value;
    if(todo == ""){
        return myFunction("Failed to add (Enter your TODO)", false);
    }
    t = {"id": id,"todo":todo, "color":"f"}
    todos.push(t);
    showTodo()
    myFunction('Successfully added');
    document.getElementById("todo").value = "";

}

function delTodo(tmp){
    event.stopPropagation();
    tmp = tmp.parentNode;
    p = tmp.parentNode;
    id = p.id;
    color = "";
    let i = todos.findIndex(i => i.id == id);
    todos.splice(i,1);
    p.remove()
    myFunction("Successfully deleted")
    localStorage.setItem('ob', JSON.stringify(todos));            
}

function upTodo(tmp){
    event.stopPropagation();
    tmp = tmp.parentNode;
    p = tmp.parentNode;
    id = p.id;
    let i = todos.findIndex(i => i.id == id);
    todo = todos[i];
    if(i ==0){
        return;
    }

    todos.splice(i,1);
    todos.splice(i-1, 0 , todo);
    showTodo()
    

}

function downTodo(tmp){
    event.stopPropagation();
    tmp = tmp.parentNode;
    p = tmp.parentNode;
    id = p.id;
    color = "";
    let i = todos.findIndex(i => i.id == id);
    todo = todos[i];

    todos.splice(i,1);
    todos.splice(i+1, 0 , todo);

    showTodo()

}

function checkTodo(tmp){
    event.stopPropagation();
    p = tmp.parentNode;
    id = p.id;
    let i = todos.findIndex(i => i.id == id);
    if (tmp.checked == true){
        todos[i]["color"] = "t";
    }
    else todos[i]["color"] = "f";

    showTodo()
    
} 
function enter(event){
    if(event.keyCode == 13){
        addTodo();
    }
}
function myFunction(text, flag = true) { //toast msg
    var x = document.getElementById("snackbar");

    if(flag == true){
        x.className = "show";
        x.innerText = text;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    }
    else{
        x.className = "reject"
        x.innerText = text;
        setTimeout(function(){ x.className = x.className.replace("reject", ""); }, 3000);

    }
    
}
function showTime(){
    let today = new Date()
    time = document.getElementById("time");
    t = today.toLocaleString();
    time.innerText = t;
}
function showInfo(tmp){
    id = tmp.id;
    console.log(id);
    let i = todos.findIndex(i => i.id == id);
    todo = todos[i];
    info = todo['todo'];

    e = document.getElementById("info");
    e.innerText = "what? : " + info;
    

}
function tmp(t){
    var x = document.getElementById('drawer');
    if (x.className == "show"){
        x.className = "";
    }
    else{
        x.className = "show";
        showInfo(t);
    }
}


showTodo()
let t = setInterval(showTime, 1000);