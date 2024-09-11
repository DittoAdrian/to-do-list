let tugas = [];

const formTambahTugas = document.getElementById("formTambahTugas");
formTambahTugas.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleTugas = document.getElementById("titleTugas");
  const dateTugas = document.getElementById("dateTugas");
  const selectTugas = document.getElementById("selectTugas");

  const titleValue = titleTugas.value;
  const dateValue = dateTugas.value;
  const selectValue = selectTugas.value;

  if (titleValue && dateValue && selectValue) {
    const tugasBaru = {
      titleValue,
      dateValue,
      selectValue,
      done: false,
    };
    tugas.push(tugasBaru);
    renderTugas();

    titleTugas.value = "";
    dateTugas.value = "";
    selectTugas.value = "Low";
  } else {
    alert("isi semua kolom form");
  }
});

function colorLevel(level){
  switch(level){
    case 'Low':
      return 'level-low';
    break;
    case 'Medium':
      return 'level-medium';
    break;
    case 'High':
      return 'level-high'
    break;
    }

}

function renderTugas() {
  const taskList = document.getElementById("ul-list-task");
  const taskDone = document.getElementById("ul-list-done");

  taskDone.innerHTML = "";
  taskList.innerHTML = "";

  tugas.forEach((task, index) => {
    const list = document.createElement("li");
    list.className = "li-list";

    if (task.done) {
      list.classList.add("done");
    }

    list.innerHTML = `
        <div class="${task.done ? 'list list-selesai' : 'list'}" onClick="tugasSelesai(${index})">

                            <div class="level">
                                <span class=${colorLevel(task.selectValue)}> ${task.selectValue} </span>
                            </div>
                            <div class="title-date">
                                <div>
                                    <img src=${
                                      task.done
                                        ? "images/checked.svg"
                                        : "images/uncheck.svg"
                                    } alt="">
                                    <h2>${task.titleValue}</h2>
                                </div>
                                <h3>${task.dateValue}</h3>
                            </div>               
        </div>
        ${!task.done ? `<button class="list-delete" onClick="tugasHapus(${index})"> Delete</button>` : ''}

        `;
    if (task.done) {
      taskDone.appendChild(list);
    } else {
      taskList.appendChild(list);
    }
  });
}

function tugasSelesai(index) {
  tugas[index].done = !tugas[index].done;
  renderTugas();
}

function tugasHapus(index) {
  tugas.splice(index, 1);
  renderTugas();
}

renderTugas();