// loaddata kore sob data show korbo

const loadData = async() =>{
    
   
    const response = await fetch(` https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await response.json()
    displayData(data.pets)
    
    
    
    
}
const loadCategoryData = async() =>{
  
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await response.json()
    btnShowEachPet(data.categories)
    
}


const btnShowEachPet = (category) =>{
    
   
    const btnshoweachpet = document.getElementById('btnshoweachpet')
    console.log(category);
    category.forEach(element => {
        console.log(element);
        const {category,category_icon} = element
        const btncreate = document.createElement('div')
       
        btncreate.innerHTML = `
        <button onclick ="spacificCategory('${category}')" class="outline-[#0E7A81] outline outline-1 rounded-xl py-2 px-10  border-[#0E7A811A] font-bold text-xl    hover:rounded-3xl ">
                    <img class="w-12 inline-block" src=${category_icon} alt="" srcset="">
                   ${category}</button>
        `
        btnshoweachpet.appendChild(btncreate)
        
    });
}
// spacific btn click and show data

const spacificCategory=async(anyid)=>{
  
  const  datashowcontainer= document.getElementById('datashowcontainer')
    const totalTime = 2000;
    const interval = 1000;
  
    let slice = totalTime / interval;
     
    const intvId = setInterval(function() {
      
        datashowcontainer.innerHTML= ` <div id="spinner">
                        <span  class="loading  loading-bars loading-lg"></span>
                       </div>`
        
      slice = slice - 1;
    }, interval);
  
    setTimeout(function() {
        
        displayData(data.data) 
      clearInterval(intvId);
      
    }, totalTime);
    
  
 
   
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${anyid}`)
    const data = await response.json()
    
    
    
    


}

loadCategoryData()






// display all data
const displayData=(fulldata)=>{
    
   
   

    const datashowcontainer = document.getElementById('datashowcontainer')
    datashowcontainer.innerHTML = " "
    // data show na korle no content show korbe tar condition
    if(fulldata.length ===0){
        datashowcontainer.classList.remove('grid')
        datashowcontainer.innerHTML = `
        <div class="bg-purple-300 lg:py-12 rounded-xl">
        <img class="mx-auto animate-pulse" src="images/error.webp" alt="">
        <h1 class="text-5xl text-center font-bold">No Available Information</h1>
     </div>
        `

    }
    else{
        datashowcontainer.classList.add('grid')

    }
    fulldata.forEach(element => {
        console.log(element);
        const{pet_name,gender,date_of_birth,price,image,breed,petId} = element
        

        const card = document.createElement('div')
        card.innerHTML = `
        <div class="card bg-base-100 p-4 border border-gray-300  shadow-xl">
                                <figure class="">
                                  <img class="w-full h-[180px] object-cover rounded-xl"
                                    src=${image}
                                    alt="Shoes"
                                    class="rounded-xl" />
                                </figure>
                                <div class="space-y-4">
                                  <h2 class="card-title pt-4">${pet_name?pet_name:"not found"}</h2>
                                 <div class="space-y-2 text-[#131313B3]">
                                    <p><i class="fa-solid fa-calendar-days"></i>Breed: ${breed?breed:"not found"}</p>
                                    <p><i class="fa-solid fa-calendar-days"></i>Birth: ${date_of_birth?date_of_birth:"not available"}</p>
                                    <p><i class="fa-solid fa-venus-mars"></i>Gender: ${gender?gender:"unknown"}</p>
                                    <p><i class="fa-solid fa-dollar-sign"></i>Price : ${price?price:"not found"
                                    }</p>
                                 </div>
                               <div class="divider"></div>
                               <div class="flex justify-between">
                                <button  onclick = "likeImageShow('${image}')" class="rounded-md py-2 px-3  outline outline-1 text-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></button>
                                <button onclick ="adoptModal()" class="rounded-md font-bold outline outline-1 px-4 py-2 text-[#0E7A81]">Adopt</button>
                                <button onclick="addingModal('${petId}')" class="rounded-md px-4 py-2 font-bold outline outline-1 text-[#0E7A81]">Details</button>
                               </div>
                                </div>
                              </div>
                              
        `

       
        datashowcontainer.appendChild(card)
        
        
    });
   
}
// show all clicked images
const likeImageShow=(image)=>{
    const showImageContainer = document.getElementById('showimage')
    
        
        const showImage = document.createElement('div')
        
        showImage.innerHTML = `
         <img class= "rounded-xl" src = "${image}" alt="">
        `
        showImageContainer.appendChild(showImage)
        
  



}
const addingModal=async(id)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await response.json()
    addingmodalspcific(data.petData);


    

}
const addingmodalspcific=(pet)=>{

    const detailmodal = document.getElementById('modal-content')
   
        detailmodal.innerHTML =`
                               
    <figure class="">
      <img class= "h-400 w-full rounded-2xl"
        src=${pet.image}
        alt="Shoes"
        class="rounded-xl" />
    </figure>
    <div class="space-y-4">
      <h2 class="card-title pt-4">${pet.pet_name?pet.pet_name:"not found"}</h2>
     <div class="space-y-2 text-[#131313B3]">
        <p><i class="fa-solid fa-calendar-days"></i>Breed: ${pet.breed?pet.breed:"not found"}</p>
        <p><i class="fa-solid fa-calendar-days"></i>Birth: ${pet.date_of_birth?pet.date_of_birth:"not available"}</p>
        <p><i class="fa-solid fa-venus-mars"></i>Gender: ${pet.gender?pet.gender:"unknown"}</p>
        <p><i class="fa-solid fa-dollar-sign"></i>Price : ${pet.price?pet.price:"not found"
        }</p>
     </div>
   <div class="divider"></div>
   <p class="font-bold text-xl">Description</p>
   <p>${pet.pet_details}</p>
    
    </div>
  </div>
  
   
 `

    
   
 
    


 

document.getElementById('custommodal').showModal()

}

const adoptModal =()=>{
    const adopmodal = document.getElementById('modal-content')
    
    
      const modal =  document.getElementById('custommodaladoption').showModal()
    
}

const counting=(()=>{
    
   
  
        const adopt =document.getElementById('custommodaladoption').showModal()
        
        
       
        

        const totalTime = 3000;
  const interval = 1000;

  let slice = totalTime / interval;

  const intvId = setInterval(function() {
    adopt.innerText = ` ${slice} seconds`;
    slice = slice - 1;
  }, interval);

  setTimeout(function() {
   
    clearInterval(intvId);
    adopt.classList.add("hidden")
    
  }, totalTime);

    
  
  
 
   
   

})

const sortingBtn = () =>{

}


loadData()