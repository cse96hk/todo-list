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

// 이벤트
addBtn.addEventListener("click", addTask); //  입력버튼 클릭시
taskInput.addEventListener("focus", function (event) {
    event.target.value = "";
    validFeedback.textContent = "";
}); // task-input 초기화 , valid-feedback 초기화

//함수
function addTask() {
    // 할일 등록 함수
    let taskVal = taskInput.value;
    if (taskVal === "") {
        //alert("할일 내용을 입력하세요.");
        validFeedback.textContent = "할일 내용을 입력하세요.";
        return false;
    }
    console.log(taskVal);
    taskItems.push(taskVal);
    console.log(taskItems);
    taskInnerHTML();
}

function taskInnerHTML() {
    // 할일 목록 함수
    let resultHTML = "";
    for (let i = 0; i < taskItems.length; i++) {
        let item = taskItems[i];
        resultHTML += `<div class="task">
                        ${item}
                        <div class="task-buttons">
                            <button>check</button>
                            <button>delete</button>
                        </div>
                    </div>`;
    }

    taskList.innerHTML = resultHTML; // taskList에 resultHTML의 상태를 추가
}
