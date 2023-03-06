async function generateContent() {
    // get book data
    let bookData = await fetch("/assets/books.json").then((response) => response.json());
  
    const languageFilter = document.getElementById("language-filter");
    const authorFilter = document.getElementById("author-filter");
    const genreFilter = document.getElementById("genre-filter");
  
    /* make cards for filtered data */
    function filterAndGenerateCards() {
      /* get filter values */
      let languageValue = languageFilter.value;
      let authorValue = authorFilter.value;
      let genreValue = genreFilter.value;
  
      // filter book data based on filter values (Note:  If any of the filters are set to an empty string, the filter-method is ignored and all books are included shown)
      let filteredBooks = bookData.filter((book) => {
        return (
          (languageValue === "" || book.language === languageValue) &&
          (authorValue === "" || book.author === authorValue) &&
          (genreValue === "" || book.genre === genreValue)
        );
      });
  
      /* create new cards for filtered data */
      let cardContainer = document.getElementById("main_content_row");
      cardContainer.innerHTML = "";
      for (const book of filteredBooks) {
        generateCard(book);
      }
    }
  
    /* create initial cards */
    for (const book of bookData) {
      generateCard(book);
    }
  
    /* Calls filterAndGenerateCards on change */
    languageFilter.addEventListener("change", filterAndGenerateCards);
    authorFilter.addEventListener("change", filterAndGenerateCards);
    genreFilter.addEventListener("change", filterAndGenerateCards);
  }
  