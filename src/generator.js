async function generateContent() {
  // load book data
  let bookData = await fetch("/assets/books.json").then((response) =>
    response.json()
  );

  for (const book of bookData) {
    generateCard(book);
  }
}

function generateCard(book) {
  // Init
  outerDiv = document.createElement("div");
  cardDiv = document.createElement("div");
  img = document.createElement("img");
  cardBodyDiv = document.createElement("div");
  cardTitleH5 = document.createElement("h5");
  addButton = document.createElement("button");

  // create Hierarchy
  outerDiv.append(cardDiv);
  cardDiv.append(img);
  cardDiv.append(cardBodyDiv);
  cardBodyDiv.append(cardTitleH5);
  cardBodyDiv.append(addButton);

  //   add content and attributes
  outerDiv.setAttribute(
    "class",
    "col-lg-2 col-md-3 col-4 d-flex align-items-stretch"
  );
  cardDiv.setAttribute("class", "card");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("src", book.imageLink);
  cardBodyDiv.setAttribute("class", "card-body");
  cardTitleH5.setAttribute("class", "card-title");
  cardTitleH5.innerHTML = book.title;
  addButton.setAttribute("class", "btn btn-dark");
  addButton.innerHTML = "Add to cart";

  // add to row
  row = document.getElementById("main_content_row");
  row.append(outerDiv);
}

async function getBookImageDescription(title)
{
  await fetch("/assets/books.json")
  .then((response) =>response.json())
  .then (data =>{
    console.log(data);
   data.forEach(element => {
  if(element.title===title)
  {
  const result1= document.getElementById("bookname");
  result1.innerText=element.title;
  const result2= document.getElementById("authorname");
  result2.innerText=element.author;
  const result3= document.getElementById("publishedyear");
  result3.innerText=element.year;
  const result4= document.getElementById("bookgenre");
  result4.innerText=element.genre;
  const result5= document.getElementById("description");
  result5.innerText=element.description;
  }
});
});}

async function getBookImage(title)
{
  await fetch("/assets/books.json")
  .then((response) =>response.json())
  .then (data =>{
   data.forEach(element => {
  if(element.title===title)
  {
  const result1= document.getElementById("image");
  result1.innerText=element.imageLink;
  }
});
});}