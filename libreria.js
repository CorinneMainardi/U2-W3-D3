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
                class="card-img-top" heigth="100"
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
        const buyBtn = document.querySelector(".buyBtn");
        const removeBtn = document.querySelector(".removeBtn");

        removeBtn.addEventListener("click", () => {
          newCol.remove();
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
getBooks();
