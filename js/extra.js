const loadData = async() =>{
    document.getElementById('spinner').classList.remove('hidden');
        console.log("Loading data...");
    const response = await fetch(` https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await response.json()
    displayData(data.pets)
    
    
    
}

const displayData = (bal) => {
     document.getElementById('spinner').classList.add('block')
     
    
    setTimeout(()=> {
        
       console.log( loadData());              // Calls loadData() after 5 seconds
       
    }, 5000);
}

// Call displayData to initiate the process
displayData();
