//load spinner
const spinner = document.getElementById("spiner");
const spinnerLoding = (isloading) => {
  console.log(spinner);
  if (isloading === true) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

/* load catagory */
const loadCatagories = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCatagories(data.data.news_category))
    .catch((error) => console.log(error));
};

/* display catagory */
const displayCatagories = (data) => {
  //   console.log(data);

  const catagoryContainer = document.getElementById("catagory-container");
  catagoryContainer.classList.add("catagoryContainer");

  data.forEach((catagory) => {
    // console.log(catagory.category_id, catagory.category_name);

    const catagoryDiv = document.createElement("div");
    catagoryDiv.innerHTML = `
    <p onclick="loadNews('${catagory.category_id}')">${catagory.category_name}</p>
    `;
    catagoryContainer.appendChild(catagoryDiv);
  });
};

/* loadNews */
const loadNews = (category_id) => {
  // load spinner
  // spinner start
  spinnerLoding(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));
};

/* display news */
const displayNews = (data) => {
  //   console.log(data);

  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";

  data.forEach((news) => {
    // console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("mb-4");
    newsDiv.innerHTML = `
    <div class="card mb-3 border" style="max-width: 100%">
    <div class="row g-0">
            <div class="col-md-4">
              <img src="${
                news.thumbnail_url
              }" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title ">${news.title}</h5>
                <p class="card-text elips">
                  ${news.details}
                </p>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
              <div class="d-flex justify-content-around mb-3">
                <div class="d-flex gap-4 ">
                    <img class="auther-img" src="${
                      news.author.img ? news.author.img : "no data available"
                    }">
                    <h5>${
                      news.author.name ? news.author.name : "no data available"
                    }</h5>
                    <p>view:${
                      news.total_view ? news.total_view : "no data available"
                    }</p>
                </div>
                <button onclick="loadDetailsModal('${
                  news._id
                }')" class="btn btn-primary h-2 w-3" data-bs-toggle="modal"
                data-bs-target="#newsDetailsButton">details</button>
              </div>
            </div>
          </div>
          </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
  // spinner end
  spinnerLoding(false);
};

const loadDetailsModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]));
};

const displayNewsDetails = (data) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.textContent = "";
  // console.log(data);
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal-content");
  modalDiv.innerHTML = `
  <div class="modal-header">
                <h5 class="modal-title" id="newsDetailsButtonLabel">
                  ${data.title}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="col-md-4">
                <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="..." />
                </div>

                <div class="d-flex gap-4 my-5 ">
                    <img class="auther-img" src="${data.author.img}">
                    <h5>${data.author.name}</h5>
                    <p>view:${data.total_view}</p>
                    <p>Rating:${data.rating.number}</p>
                </div>

                <p class="card-text ">
                ${data.details}
                </p>

              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
  `;
  modalContainer.appendChild(modalDiv);
};

loadCatagories();
const redirect = () => {
  window.location.href = "blog.html";
};
