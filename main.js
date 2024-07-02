/************ToDo List************
- 유저는 할일을 추가할 수 있다.
- 각 할일에 삭제와 체크버튼이 있다.
- 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
- 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
- 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
- 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
- 모바일 버전에서도 확인할 수 있는 반응형 웹이다
**********************************/

// 변수
let taskInput = document.getElementById("task-input");
let validFeedback = document.querySelector(".valid-feedback"); //  valid-feedback
let addBtn = document.getElementById("add-btn");
let taskItems = [];
let task = document.querySelector(".task");
let taskList = document.getElementById("task-list");
let resetBtn = document.getElementById("reset-btn");

// 이벤트
addBtn.addEventListener("click", addTask); //  입력버튼 클릭시
taskInput.addEventListener("focus", function (event) {
    event.target.value = "";
    validFeedback.textContent = "";
}); // task-input 초기화 , valid-feedback 초기화

// reset
resetBtn.addEventListener("click", function () {
    taskInput.value = "";
    taskItems = [];
    taskList.innerHTML = "";
});
//함수
function addTask() {
    // 할일 등록 함수
    //let taskVal = taskInput.value;
    let taskArrey = {
        ID: Date.now(),
        taskContent: taskInput.value,
        taskCompleted: false,
    };
    if (taskArrey["taskContent"] === "") {
        //alert("할일 내용을 입력하세요.");
        validFeedback.textContent = "할일 내용을 입력하세요.";
        return false;
    }
    console.log(taskArrey);
    taskItems.push(taskArrey);
    console.log(taskItems);
    taskInnerHTML(); // taskList에 taskItem의 상태를 추가 함수  호출
    taskInput.value = ""; // taskInput를 초기화
}

function taskInnerHTML() {
    // 할일 목록 함수
    let resultHTML = "";
    for (let i = 0; i < taskItems.length; i++) {
        let item = taskItems[i].taskContent;
        if (taskItems[i].taskCompleted === true) {
            resultHTML += `<div class="task on">
                        <div class="task-done">${item}</div>
                        <div class="task-buttons">
                            <button type="button" class="btn btn-warning" onclick="completeTask(${taskItems[i].ID})" ><i class="bi bi-check-circle"></i></button>
                            <button type="button" class="btn btn-dark" ><i class="bi bi-trash"></i></button>
                        </div>
                    </div>`;
        } else {
            resultHTML += `<div class="task">
                        ${item}
                        <div class="task-buttons">
                            <button type="button" class="btn btn-success" onclick="completeTask(${taskItems[i].ID})" ><i class="bi bi-circle"></i></button>
                            <button type="button" class="btn btn-dark" onclick="deleteTask(${taskItems[i].ID})"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>`;
        }
    }

    taskList.innerHTML = resultHTML; // taskList에 resultHTML의 상태를 추가
}

// 부트스트립 툴팁 활성화
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

function completeTask(id) {
    for (let i = 0; i < taskItems.length; i++) {
        if (taskItems[i].ID === id) {
            taskItems[i].taskCompleted = !taskItems[i].taskCompleted;
            break;
        }
    }
    taskInnerHTML();
}

function deleteTask(id) {
    for (let i = 0; i < taskItems.length; i++) {
        if (taskItems[i].ID === id) {
            taskItems.splice(i, 1);
            break;
        }
    }
    taskInnerHTML();
}
