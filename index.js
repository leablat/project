const DOM = {
    taskDate: null,
    date: null,
    time: null,
    allTaskBody: null,
};

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function init() {
    DOM.taskDate = document.querySelector("#taskDate")
    DOM.date = document.querySelector("#date")
    DOM.time = document.querySelector("#time")

    DOM.allTaskBody = document.querySelector("#allTask")

    const SaveButton = document.querySelector("#SaveButton");
    SaveButton.addEventListener("click", SaveButtonFn);


    const clearButton = document.querySelector("#clearButton");
    clearButton.addEventListener("click", clearTasksFn);

    function SaveButtonFn(event) {
        if (!DOM.taskDate.validity.valid || !DOM.date.validity.valid || !DOM.time.validity.valid) {
            alert('Required field!')
            return
        }
        tasks.push(new Task(DOM.taskDate.value, DOM.date.value, DOM.time.value))

        localStorage.setItem("tasks", JSON.stringify(tasks));

        draw(tasks);

        clearForm();
    }

}
function clearForm() {

    DOM.taskDate.value = "";
    DOM.date.value = "";
    DOM.time.value = "";
}
function clearTasksFn() {
    DOM.allTaskBody.innerHTML = "";
    localStorage.removeItem("tasks");
    tasks = [];
}

function clearFn() {
    DOM.allTaskBody.innerHTML = "";

}

function draw(tasksArray) {
    if (Array.isArray(tasksArray) === false) return;
    clearFn();

    for (let index = 0; index < tasksArray.length; index++) {
        const currentTask = tasksArray[index];

        const spanRow = document.createElement("span")
        spanRow.className = "noteTask";

        const divTaskId = document.createElement("div");
        divTaskId.innerText = currentTask.taskNumber;

        const divTaskDate = document.createElement("textarea");
        divTaskDate.innerText = currentTask.taskDate;
        divTaskDate.className = 'divTaskDate'; 
        divTaskDate.cols = "30";
        divTaskDate.rows = "6";
        divTaskDate.readOnly=true;

        const divData = document.createElement("div");
        divData.innerText = currentTask.date;

        const divTime = document.createElement("div");
        divTime.innerText = currentTask.time;


        const divActions = document.createElement("div");
        const divDataTime = document.createElement("div");
        divDataTime.append(divData, divTime)
        divDataTime.className = 'divDataTime'
        const buttonDelete = document.createElement("i");
        buttonDelete.className = "bi bi-x-octagon-fill";
        
        divActions.append(buttonDelete);
        divActions.className = 'divActions';

        spanRow.onmouseover = function () {
            divActions.style.visibility = 'visible';
        }
        spanRow.onmouseleave = function () {
            divActions.style.visibility = 'hidden';
        }

        buttonDelete.addEventListener("click", function () {
            tasks.splice(index, 1);

            draw(tasks);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        spanRow.append(divActions, divTaskDate, divDataTime);

        DOM.allTaskBody.append(spanRow);
    }

}

init()