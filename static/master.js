let btn = document.createElement('button');
btn.innerText = "Загрузить новости";
btn.classList.add("btn", "btn-success", "mb-3");
document.querySelector("#root").append(btn);

btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.innerText = "Загружаю...";

    try {
        const response = await fetch("/api/v1/news");
        const newsList = await response.json();

        const tableBody = document.querySelector("#newsTableBody");
        tableBody.innerHTML = '';

        newsList.forEach(news => {
            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            titleCell.className = 'news-title';
            titleCell.textContent = news.title;
            row.appendChild(titleCell);

            const textCell = document.createElement('td');
            textCell.className = 'news-text';
            textCell.textContent = news.text;
            row.appendChild(textCell);

            const authorCell = document.createElement('td');
            authorCell.className = 'news-author';
            authorCell.textContent = news.author;
            row.appendChild(authorCell);

            const dateCell = document.createElement('td');
            dateCell.className = 'news-date';
            dateCell.textContent = formatDate(news.date);
            row.appendChild(dateCell);

            tableBody.appendChild(row);
        });

        document.getElementById("newsCounter").textContent = `Всего новостей: ${newsList.length}`;

    } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
        document.getElementById("newsCounter").textContent = "Ошибка загрузки новостей.";
    } finally {
        btn.disabled = false;
        btn.innerText = "Загрузить новости";
    }
});

function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
}