const localStorageKey = "bookCart-memory";
const getBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books", {})
    .then((response) => {
      console.log("SIAMO NEL THEN"); //faccio il console log per vedwere se sono nel then
      console.log("OGGETTO RESPONSE", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La risposta del server non è ok");
      }
    })
    //mi vado a prendere i libri
    .then((books) => {
      console.log("libri ", books); //faccio il console log per vedere se sono nel then
      const booksRow = document.getElementById("booksRow");

      books.forEach((book) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col", "col-12", "col-md-6", "col-lg-3");
        newCol.innerHTML = `
     <div class="card">
              <img
                src="${book.img}"
                class="card-img-top" heigth="70"
                alt="immagine copertina libro"
              />
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">
                  ${book.price}
                </p>
                 <a href="#"  class="btn btn-success buyBtn">Compra ora </a>
                <a href="#" class="btn btn-danger removeBtn">Scarta</a>
              </div>
              </div>
    `;
        booksRow.appendChild(newCol);
        const buyBtn = newCol.querySelector(".buyBtn");
        const removeBtn = newCol.querySelector(".removeBtn");

        removeBtn.addEventListener("click", () => {
          newCol.remove();
        });
        buyBtn.addEventListener("click", () => {
          addBookToChart(book);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
const addBookToChart = (book) => {
  let booksInLocalStorage = localStorage.getItem(localStorageKey);
  //controllo che non ci siano libri in localStorage
  if (!booksInLocalStorage) {
    booksInLocalStorage = [];
  } else {
    booksInLocalStorage = JSON.parse(booksInLocalStorage);
  }
  booksInLocalStorage.push(book);

  localStorage.setItem(localStorageKey, JSON.stringify(booksInLocalStorage));

  console.log("Libro aggiunto:", book);
  console.log("Array di libri inseriti:", booksInLocalStorage);
};
const cart = () => {
  const cartDropDown = document.getElementById("dropdown-menu");
  cartDropDown.innerHTML = ""; //CARELLO VUOTO
  const booksInLocalStorage = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  if (booksInLocalStorage.length === 0) {
    cartDropDown.innerHTML = "<li class='dropdown-item'>Il carrello è vuoto</li>";
    return;
  }
  booksInLocalStorage.forEach((book) => {
    const li = document.createElement("li");
    li.className = "dropdown-item";
    li.innerHTML = `${book.title} - ${book.price} <button class="btn bg-danger binBtn" data-index="${index}">
        <i class="fas fa-trash-alt"></i>
      </button>`;
    cartDropDown.appendChild(li);
  });
  const binBtn = cartDropDown.querySelectorAll(".binBtn");
  binBtn.forEach(btn);
};
getBooks();
