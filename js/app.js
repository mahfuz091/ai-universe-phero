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
    

}






loadAllData()

