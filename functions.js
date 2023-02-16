const parentEL = document.querySelector('.tasks');
const dates = JSON.parse(localStorage.getItem('storeD')) ?? [];
console.log(dates);

function newTask() {
   // 1. Get and format Date
   const curDate = new Intl.DateTimeFormat('GB-en', {
      day: "2-digit",
      month: "long",
      year: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
   }).format(new Date());
   // 2. store date
   dates.push(curDate);
   render();

   localStorage.setItem('storeD', JSON.stringify(dates));
}

function deleteTask(e) {

   const task = e.target.closest('.task');
   if (!task) return;
   const ID = +task.id.slice(-1);
   dates.splice(ID, 1);
   render();
   localStorage.setItem('storeD', JSON.stringify(dates));

}

function render() {
   let element = ``;
   for (const [idx, date] of dates.entries()) {
      element += `<div class="task" id="task--${idx}">${date}</div>`;
   }
   // 4. display element
   // parentEL.innerHTML = null;
   if (!dates.length) {
      parentEL.innerHTML = `<h1>No data</h1>`;
      return;
   }
   parentEL.innerHTML = element;
}

render();

document.querySelector('.button').addEventListener('click', newTask);

// delete on selected checkbox.
parentEL.addEventListener('click', deleteTask);
