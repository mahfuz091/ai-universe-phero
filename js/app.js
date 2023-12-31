let fetchData = [];


const loadAllData = async (dataLimit)=>{
    try{
        const url = "https://openapi.programming-hero.com/api/ai/tools"
        const res = await fetch(url);
        const data = await res.json();
        showAllData(data.data.tools, dataLimit )
    }
    catch(error){
        alert(error.message)

    }

}
const showAllData =(data, dataLimit)=>{


  
    const seeMore = document.getElementById("see-more")
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML ="";

    if (dataLimit && data.length >6){
        
        data = data.slice(0, 6)
        fetchData = data
        
        seeMore.classList.remove("d-none")

    }
    else{
        seeMore.classList.add("d-none")
        fetchData=data
        
       
    }
    if (fetchData.length>6){
        seeMore.classList.add("d-none")
    }
    else{
        seeMore.classList.remove("d-none")
    }
    

  
    data.forEach(singleData => {
        const {id, image, features, name, published_in}= singleData
        // console.log(features)
        cardContainer.innerHTML += `
        <div class="col">
        <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol id="${id}" class="list-container">
                
                </ol>

            </div>
            

            <div class="footer">
                <div>
                    <h5 class="card-title">${name}</h5>
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa fa-calendar-days"></i>
                        <p>${published_in}</p>
                    </div>

                </div>
                <div>
                    <button onclick="loadSingleData('${id}')" class="fa fa-arrow-right border-0 arrow-btn" data-bs-toggle="modal" data-bs-target="#dataModal"></button>
                </div>

            </div>
        </div>
    </div>
    
        
        `;
        
        const liContainer = document.getElementById(id)
        features.forEach(item=>{
            liContainer.innerHTML+=`
            <li>${item}</li>
            `
            
        })
                    
        toggleSpinner(false);

        
    });
    
    

};
const showAllDataTogether = () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data);
        showAllData(data.data.tools);
      })
      .catch((error) => {
        alert(error.message)
      })
  };

const loadSingleData =(id)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>showSingleData(data.data))
    .catch(error=>{
        alert(error.message)
    })

}
const showSingleData=(data)=>{
   
    const {description, pricing, features, image_link, input_output_examples, integrations, accuracy}=data
    console.log(features)
    
    const modalBody=document.getElementById('modal-body')
    modalBody.innerHTML="";
    modalBody.innerHTML += `
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col ">
      <div class="card modal-feature modal-main-card">
        <h5 class="title">${description}</h5>
        <div class="card-body">
          <div class="d-flex gap-2">
            <div class="modal-card basic">${pricing? pricing[0].price : 'Free Of Cost/'}<br>
                ${pricing?pricing[0].plan : "Basic"}</div>
            <div class="modal-card pro">${pricing?pricing[1].price : 'Free Of Cost/'}<br>
            ${pricing?pricing[1].plan : "Pro"}</div>
            <div class="modal-card enterprise">${pricing?pricing[2].price: "Free of Cost/"}<br>
            ${pricing?pricing[2].plan:"Enterprise"}</div>

          </div>
          <div class="d-flex mt-3">
            <div class="features">
                <h5>Features</h5>
                <ul id="modal-features" >
                    
                    

                </ul>
            </div>
            <div  class="integrations">
                <h5 >Integrations</h5>
                <ul  id="modal-integrations">
                    
                    

                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card modal-main-card">
        <img src="${image_link[0]}" class="card-img-top modal-img" alt="...">
        <p id="accuracy" class="accuracy d-none"></p>
        <div class="card-body">
          <h5 class="card-title text-center">${input_output_examples?input_output_examples[0].input: "Can you give any example?"}</h5>
          <p class="card-text text-center">${input_output_examples?input_output_examples[0].output:"No! Not Yet! Take a break!!!"}</p>
        </div>
      </div>
    </div>
    
    
</div>
    `;
    const featuresContainer = document.getElementById('modal-features')
    for (const key in features) {

        featuresContainer.innerHTML += `
         <li>${features[key].feature_name}</li>
        `
    }
    
    const accuracyContainer = document.getElementById("accuracy")
    if(accuracy.score){
        accuracyContainer.classList.remove('d-none')
        accuracyContainer.innerText =`${accuracy.score*100} % accuracy`
    }
    else{
        accuracyContainer.classList.add('d-none')
    }
    const integrationsContainer = document.getElementById("modal-integrations")
    if (integrations){
        integrations.forEach(el=>{
            
           
            integrationsContainer.innerHTML += `
            <li>${el}</li>
            `
        })
    }
    else{
        integrationsContainer.innerHTML += `
        <p>No Data Found</p>
        `
    }
   

    
}
const shortByDate =()=>{
    
    fetchData.sort(function(a,b){
        return new Date(b.published_in) - new Date(a.published_in);})
    
        showAllData(fetchData)

      
}


const toggleSpinner = isLoading =>{
    const loader = document.getElementById('loader');

    if(isLoading){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none') 
    }
}

toggleSpinner(true);


loadAllData(6);

