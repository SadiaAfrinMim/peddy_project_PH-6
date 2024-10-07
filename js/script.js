// loaddata kore sob data show korbo

const loadData = async () => {
  const response = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  displayData(data.pets);
 
};
// Function to load category data
const loadCategoryData = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  btnShowEachPet(data.categories);
};

// Function to display buttons for each category
const btnShowEachPet = (categories) => {
  const btnshoweachpet = document.getElementById("btnshoweachpet");
  btnshoweachpet.innerHTML = ""; // Clear previous buttons

  categories.forEach((element) => {
    const { category, category_icon, id } = element;

    // Create a button for each category
    const btncreate = document.createElement("div");
    btncreate.innerHTML = `
      <button onclick="handleCategoryClick('${id}', '${category}')" id="btn-${id}" class="w-full py-4 rounded-lg border border-[#0E7A81] border-opacity-40 bg-white hover:bg-purple-300 flex items-center font-bold justify-center gap-2 category-each-btn">
        <img class="w-12 inline-block" src="${category_icon}" alt="${category}" />
        ${category}
      </button>
    `;
    btnshoweachpet.appendChild(btncreate);
  });
};

// Function to handle category button click
const handleCategoryClick = (id, category) => {
  deactivateAllButtons();
  activateButton(id);
  spacificCategory(category);
};

// Function to deactivate all category buttons
const deactivateAllButtons = () => {
  const buttons = document.getElementsByClassName("category-each-btn");
  for (let btn of buttons) {
    btn.classList.remove("rounded-full");
    btn.classList.add("rounded-lg");
  }
};

// Function to activate the clicked button
const activateButton = (id) => {
  const activeButton = document.getElementById(`btn-${id}`);
  if (activeButton) {
    activeButton.classList.add("rounded-full");
    activeButton.classList.remove("rounded-lg");
  }
};

loadCategoryData();


// spacific btn click and show data

const spacificCategory = async (anyid) => { 
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${anyid}`
  );

  const data = await response.json();

  const datashowcontainer = document.getElementById("datashowcontainer");
  const totalTime = 2000;
  const interval = 1000;

  let slice = totalTime / interval;

  const intvId = setInterval(function () {
    datashowcontainer.classList.remove("grid");
    datashowcontainer.innerHTML = ` 
                       <div class="flex justify-center items-center h-full">
            <span class="loading loading-bars loading-lg"></span>
        </div>
                       `;

    slice = slice - 1;
  }, interval);

  setTimeout(function () {
    clearInterval(intvId);  

    displayData(data.data);
    
  }, totalTime);
  
};

loadCategoryData();



// display all data
const displayData = (fulldata) => {


  const datashowcontainer = document.getElementById("datashowcontainer");
  datashowcontainer.innerHTML = " ";
  // data show na korle no content show korbe tar condition
  if (fulldata.length === 0) {
    datashowcontainer.classList.remove("grid");
    datashowcontainer.innerHTML = `
        <div class="bg-purple-300 lg:py-12 py-8 rounded-xl">
        <img class="mx-auto animate-pulse" src="images/error.webp" alt="">
        <h1 class="lg:text-5xl text-3xl text-center font-bold">No Available Information</h1>
     </div>
        `;
  } else {
    datashowcontainer.classList.add("grid");
  }
  fulldata.forEach((element) => {
    console.log(element);
    const { pet_name, gender, date_of_birth, price, image, breed, petId } =
      element;

    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 p-4 border border-gray-300  shadow-xl">
                                <figure class="">
                                  <img class="w-full h-[180px] object-cover rounded-xl"
                                    src=${image}
                                    alt="Shoes"
                                    class="rounded-xl" />
                                </figure>
                                <div class="space-y-4">
                                  <h2 class="card-title pt-4">${
                                    pet_name ? pet_name : "not found"
                                  }</h2>
                                 <div class="space-y-2 text-[#131313B3]">
                                    <p><i class="fa-solid fa-cookie-bite"></i></i>&nbsp &nbspBreed: ${
                                      breed ? breed : "not found"
                                    }</p>
                                    <p><i class="fa-solid fa-calendar-days"></i>&nbsp &nbspBirth: ${
                                      date_of_birth
                                        ? date_of_birth
                                        : "not available"
                                    }</p>
                                    <p><i class="fa-solid fa-venus-mars"></i>&nbsp &nbspGender: ${
                                      gender ? gender : "unknown"
                                    }</p>
                                    <p><i class="fa-solid fa-dollar-sign"></i>&nbsp &nbspPrice : ${
                                      price ? `${price}$` : "not found"
                                    }</p>
                                 </div>
                               <div class="divider"></div>
                               <div class="flex justify-between gap-4">
                                <button  onclick = "likeImageShow('${image}')" class="rounded-md lg:py-2 lg:px-3 py-3 px-4 outline outline-1 text-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></button>
                                <button id="btndisable" onclick ="counting()" class="rounded-md font-bold outline outline-1 lg:px-4 py-2 px-8 md: text-[#0E7A81]">Adopt</button>
                                <button onclick="addingModal('${petId}')" class="rounded-md lg:px-4 py-2 px-8 font-bold outline outline-1 text-[#0E7A81]">Details</button>
                               </div>
                                </div>
                              </div>
                              
        `;

    datashowcontainer.appendChild(card);
  });
};

const sortingPriceData = (allPrice) => {
  return allPrice.sort((a, b) => {
      const priceA = a.price ? a.price : 0;
      const priceB = b.price ? b.price : 0;
      return priceB - priceA;  // Sort in descending order by price
  });
};

// Sorting function (triggered by button click)
const sorting = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  const data = await response.json();
  const sortedData = sortingPriceData(data.pets);

  const datashowcontainer = document.getElementById("datashowcontainer");
const totalTime = 2000;
const interval = 1000;

let slice = totalTime / interval;

const intvId = setInterval(function () {
  datashowcontainer.classList.remove("grid");
  datashowcontainer.innerHTML = ` 
                     <div class="flex justify-center items-center h-full">
          <span class="loading loading-bars loading-lg"></span>
      </div>
                     `;

  slice = slice - 1;
}, interval);

setTimeout(function () {
  clearInterval(intvId);  
  displayData(sortedData);
  
}, totalTime);
  
};


// show all clicked images
const likeImageShow = (image) => {
  const showImageContainer = document.getElementById("showimage");

  const showImage = document.createElement("div");

  showImage.innerHTML = `
         <img class= "rounded-xl h-[150px]" src = "${image}" alt="">
        `;
  showImageContainer.appendChild(showImage);
};
// details modal
const addingModal = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();
  addingmodalspcific(data.petData);
};
const addingmodalspcific = (pet) => {
  const detailmodal = document.getElementById("modal-content");

  detailmodal.innerHTML = `
                               
    <figure class="">
      <img class= "h-400 w-full rounded-2xl"
        src=${pet.image}
        alt="Shoes"
        class="rounded-xl" />
    </figure>
    <div class="space-y-4">
      <h2 class="card-title pt-4">${
        pet.pet_name ? pet.pet_name : "not found"
      }</h2>
     <div class="space-y-2 text-[#131313B3]">
        <p><i class="fa-solid fa-cookie-bite"></i></i>&nbsp &nbspBreed: ${
          pet.breed ? pet.breed : "not found"
        }</p>
        <p><i class="fa-solid fa-calendar-days"></i>&nbsp &nbspBirth: ${
          pet.date_of_birth.split("-")[2] ? pet.date_of_birth.split("-")[0] : "not available"
        }</p>
        <p><i class="fa-solid fa-venus-mars"></i>&nbsp &nbspGender: ${
          pet.gender ? pet.gender : "unknown"
        }</p>
        <p><i class="fa-solid fa-syringe"></i>&nbsp &nbspVaccinated status: ${
          pet.vaccinated_status ? pet.vaccinated_status : "unknown"
        }</p>
        <p><i class="fa-solid fa-dollar-sign"></i>&nbsp &nbspPrice : ${
          pet.price ?  `${pet.price}$` : "not found"
        }</p>
     </div>
   <div class="divider"></div>
   <p class="font-bold text-xl">Description</p>
   <p>${pet.pet_details}</p>
    
    </div>
  </div>
  
   
 `;

  document.getElementById("custommodal").showModal();
};

const adoptModal = () => {
  const adopmodal = document.getElementById("modal-content");

  const modal = document.getElementById("custommodaladoption").showModal();
};

const counting = () => {
  // Get the modal element
  const adopt = document.getElementById("custommodaladoption");

  adopt.showModal();

  const count = document.getElementById("count");

  let counter = 3;
  count.textContent = `${counter}`;

  const interval = setInterval(function () {
    counter -= 1;

    if (counter > 0) {
      count.textContent = `${counter}`;
    } else {
      clearInterval(interval);
      adopt.close();
    }
  }, 1000);
};

const sortingBtn = () => {};

loadData();
