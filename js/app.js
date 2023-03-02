const loadAllData = async ()=>{
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    const res = await fetch(url);
    const data = await res.json();
    showAllData(data.data.tools.slice(0, 6))

}
const showAllData =(data)=>{
    // data = data.slice(0, 6)
    // console.log(data)
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML ="";
    data.forEach(singleData => {
        // console.log(singleData.features)
        const {id, image, features, name, published_in}= singleData
        cardContainer.innerHTML += `
        <div class="col">
        <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol id="list-container" class="list-container">
                <li>${features[0]}</li>
                <li>${features[1]}</li>
                <li>${features[2]? features[2] : "No Data Available"}</li> 


                </ol>

            </div>
            

            <div class="footer">
                <div>
                    <h5 class="card-title">${name}</h5>
                    <div class="d-flex align-items-center gap-2">
                        <button><i class="fa fa-calendar-days"></i></button>
                        <p>${published_in}</p>
                    </div>

                </div>
                <div class="arrow">
                    <i onclick="loadSingleData('${id}')" data-bs-toggle="modal" data-bs-target="#dataModal" class="fa fa-arrow-right"></i>
                </div>

            </div>
        </div>
    </div>
        
        `;
        
        
    });
    

};
const showAllDataTogether = () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data);
        showAllData(data.data.tools);
      });
  };

  const loadSingleData =(id)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>showSingleData(data.data))

}
const showSingleData=(data)=>{
    console.log(data)
    const {description, pricing, features }=data
    const modalBody=document.getElementById('modal-body')
    modalBody.innerHTML="";
    modalBody.innerHTML += `
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col ">
      <div class="card modal-feature">
        <h5 class="title">${description}</h5>
        <div class="card-body">
          <div class="d-flex gap-2">
            <div class="modal-card">${pricing? pricing[0].price : 'Free Of Cost'}<br>
                ${pricing?pricing[0].plan : "Basic"}</div>
            <div class="modal-card">${pricing?pricing[1].price : 'Free Of Cost'}<br>
            ${pricing?pricing[1].plan : "Pro"}</div>
            <div class="modal-card">${pricing?pricing[2].price: "Free of Cost/"}<br>
            ${pricing?pricing[2].plan:"Enterprise"}</div>

          </div>
          <div class="d-flex mt-3">
            <div class="features">
                <h5>Features</h5>
                <ul>
                    <li>${features[1].feature_name}</li>
                    <li>${features[2].feature_name}</li>
                    <li>${features[3].feature_name}</li>

                </ul>
            </div>
            <div class="integrations">
                <h5>Integrations</h5>
                <ul>
                    <li>Customizable responses</li>
                    <li>Multilingual support</li>
                    <li>Seamless integration</li>

                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="images/card2.png" class="card-img-top" alt="...">
        <p class="accuracy">94% accuracy</p>
        <div class="card-body">
          <h5 class="card-title text-center">Hi, how are you doing today?</h5>
          <p class="card-text text-center">I'm doing well, thank you for asking. How can I assist you today?</p>
        </div>
      </div>
    </div>
    
    
</div>
    `
}







loadAllData()

