const loadData = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await response.json();
    displayData(data.pets);
  };
  
  const sortingPriceData = (allPrice) => {
    if(sortingPriceData)
    
    return allPrice.sort((a, b) => {
      
      const priceA = a.price ?? 0;  
      const priceB = b.price ?? 0; 
  
      return priceB - priceA;  // 
    });
  };
  
  const displayData = (allPrice) => {
    const sortedAllPrice = sortingPriceData(allPrice);  
    console.log(sortedAllPrice); 
    


    allPrice.forEach(element => {
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
                                    <p><i class="fa-solid fa-cookie-bite"></i></i>Breed: ${breed?breed:"not found"}</p>
                                    <p><i class="fa-solid fa-calendar-days"></i>Birth: ${date_of_birth?date_of_birth:"not available"}</p>
                                    <p><i class="fa-solid fa-venus-mars"></i>Gender: ${gender?gender:"unknown"}</p>
                                    <p><i class="fa-solid fa-dollar-sign"></i>Price : ${price?price:"not found"
                                    }</p>
                                 </div>
                               <div class="divider"></div>
                               <div class="flex justify-between">
                                <button  onclick = "likeImageShow('${image}')" class="rounded-md py-2 px-3  outline outline-1 text-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></button>
                                <button id="btndisable" onclick ="counting()" class="rounded-md font-bold outline outline-1 px-4 py-2 text-[#0E7A81]">Adopt</button>
                                <button onclick="addingModal('${petId}')" class="rounded-md px-4 py-2 font-bold outline outline-1 text-[#0E7A81]">Details</button>
                               </div>
                                </div>
                              </div>
                              
        `

       
        datashowcontainer.appendChild(card)
    })
        


  };
  
  // Call loadData to initiate the process
  loadData();



  const spacificCategory=async(anyid)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${anyid}`)
     
    const data = await response.json()
    
    const  datashowcontainer= document.getElementById('datashowcontainer')
      const totalTime = 2000;
      const interval = 1000;
    
      let slice = totalTime / interval;
       
      const intvId = setInterval(function() {
        datashowcontainer.classList.remove('grid')
          datashowcontainer.innerHTML= ` 
                         <div class="flex justify-center items-center h-full">
              <span class="loading loading-bars loading-lg"></span>
          </div>
                         `
          
        slice = slice - 1;
      }, interval);
  
    
  
      setTimeout(function() {
        clearInterval(intvId);
        
          displayData(data.data) 
          
        
        
      }, totalTime);
     
      
   
  
  
  }