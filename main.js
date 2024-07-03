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
let taskInput = document.getElementById("task-input"); // 할일 입력상자
let addBtn = document.getElementById("add-btn"); // 추가 버튼
let taskItems = []; // 할일 배열
let task = document.querySelector(".task");
let taskList = document.getElementById("task-list");
let resetBtn = document.getElementById("reset-btn");
let bottomLine = document.getElementById("bottom_line"); // bottom_line
let tabs = document.querySelectorAll(".tabs div");
let mode = "all"; // 선택된 탭 id
let filerList = []; // 지정된 할일 배열
const MAX_TASKS = 6;
taskInnerHTML();
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
tabs.forEach((tab) => tab.addEventListener("click", (e) => bottomLineIndicator(e)));

// 탭 클릭시 이벤트 - 언더바 이동
function bottomLineIndicator(e) {
    bottomLine.style.left = e.target.offsetLeft + "px";
    bottomLine.style.width = e.target.offsetWidth + "px";

    tabs.forEach((tab) => tab.classList.remove("active"));
    e.target.classList.add("active");
    // 모든 탭의 폰트를 기본 폰트로 설정
    tabs.forEach((tab) => {
        tab.style.fontWeight = "normal";
    });
    // 클릭된 탭의 폰트를 굵게 설정
    e.target.style.fontWeight = "bold";
    filter(e);
}

// taskInput 값 변경 시 addBtn 상태 업데이트
taskInput.addEventListener("input", function () {
    if (taskInput.value.trim() !== "") {
        addBtn.disabled = false;
    } else {
        addBtn.disabled = true;
    }
});

// 버튼 클릭 시 addTask 함수 호출
addBtn.addEventListener("click", addTask);

// 엔터 키 입력 시 addTask 함수 호출
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.isComposing) {
        event.preventDefault(); // 폼 제출 방지
        if (!addBtn.disabled) {
            addTask();
        }
    }
});

taskInput.addEventListener("focus", function (event) {
    event.target.value = "";
}); // task-input 초기화 , valid-feedback 초기화

// reset
resetBtn.addEventListener("click", function () {
    taskInput.value = "";
    taskItems = [];
    filerList = [];
    taskList.innerHTML = "";
});

// 함수
function addTask() {
    // 입력 필드 값 확인 후 실행 방지
    if (taskInput.value.trim() === "") {
        return;
    }

    if (taskItems.length >= MAX_TASKS) {
        alert("할일은 6개까지만 입력 가능합니다.");
        addBtn.disabled = false;
        return;
    }

    console.log("taskInput.value : ", taskInput.value);
    // 할일 등록 함수
    let taskArrey = {
        ID: Date.now(),
        taskContent: taskInput.value.trim(),
        taskCompleted: false,
    };

    console.log(taskArrey);
    taskItems.push(taskArrey);
    console.log(taskItems);
    taskInput.value = "";
    addBtn.disabled = true;
    taskInnerHTML(); // taskList에 taskItem의 상태를 추가 함수 호출
}

function taskInnerHTML() {
    // 할일 목록 함수
    let resultHTML = "";
    let list = [];
    if (mode === "all") {
        // all
        list = taskItems;
    } else if (mode === "onGoing" || mode === "done") {
        // onGoing
        list = filerList;
    }

    if (list.length == 0) {
        resultHTML = `<div class="taskEmpty">등록한 데이터가 없습니다.</div>`;
    }
    for (let i = 0; i < list.length; i++) {
        let item = list[i].taskContent;
        if (list[i].taskCompleted === true) {
            resultHTML += `<div class="task on">
                                <div class="task-done">${item}</div>
                                <div class="task-buttons">
                                    <button type="button" class="btn btn-warning" onclick="completeTask(${list[i].ID})" ><i class="bi bi-check-circle"></i></button>
                                    <button type="button" class="btn btn-dark" onclick="deleteTask(${list[i].ID})" ><i class="bi bi-trash"></i></button>
                                </div>
                            </div>`;
        } else {
            resultHTML += `<div class="task">
                                ${item}
                                <div class="task-buttons">
                                    <button type="button" class="btn btn-success" onclick="completeTask(${list[i].ID})" ><i class="bi bi-circle"></i></button>
                                    <button type="button" class="btn btn-dark" onclick="deleteTask(${list[i].ID})"><i class="bi bi-trash"></i></button>
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
    filerList = [];
    if (mode === "onGoing") {
        // onGoing
        for (i = 0; i < taskItems.length; i++) {
            if (taskItems[i].taskCompleted === false) {
                filerList.push(taskItems[i]);
            }
        }
        taskInnerHTML();
    } else if (mode === "done") {
        // done
        for (let i = 0; i < taskItems.length; i++) {
            if (taskItems[i].taskCompleted === true) {
                filerList.push(taskItems[i]);
            }
        }
        taskInnerHTML();
    }
}

function filter(e) {
    console.log("선택 : ", e.target.id);
    mode = e.target.id;
    filerList = [];
    if (mode === "all") {
        // all
        taskInnerHTML();
    } else if (mode === "onGoing") {
        // onGoing
        for (i = 0; i < taskItems.length; i++) {
            if (taskItems[i].taskCompleted === false) {
                filerList.push(taskItems[i]);
            }
        }
        taskInnerHTML();
    } else if (mode === "done") {
        // done
        for (let i = 0; i < taskItems.length; i++) {
            if (taskItems[i].taskCompleted === true) {
                filerList.push(taskItems[i]);
            }
        }
        taskInnerHTML();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `.modal .modal-body {max-height: ${document.body.clientHeight * 0.8}px;overflow-y: auto;}.modal-open .modal{overflow-y: hidden !important;}`;
    document.head.appendChild(style);
});
