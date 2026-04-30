// создаём кнопку
let btn = document.createElement('button');
//модификация
btn.innerText = "Загрузить новости";
btn.classList.add("btn", "btn-primary");
//точка монтирования 
let root = document.querySelector("#root");
root.append(btn);

//Добавить обработчик 

btn.addEventListener("click", async event => {
    // new XMLHttpRequest()
    let response = await fetch("/api/v1/news ");
    let data = await response.json();

    let content = data.map(row => `<tr> 
        <th>${row.title}</th>
        <th>${row.text}</th>
        <th>${row.author}</th>
        <th>${row.date}</th>
        </tr> `)
    root.insertAdjacentHTML('beforeend',`
        <table>
        <thead>
        <tr>
        <th>title</th>
        <th>text</th>
        <th>author</th>
        <th>date</th>
        </tr>
        </thead>
        <tbody>
        ${content.join("")}
        </tbody>
        </table>
        `)
})
