const loadTool = async (tools) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayTools(data.data.tools);
}

const displayTools = tools =>{
   
    const toolsContainer = document.getElementById('tools-container');
    let tool = tools[0];
    //display 6 tools only
    /* const seeAll = document.getElementById('see-more');
    if(dataLimit > tools.length){
        tools = tools.slice(0, 6);
        seeAll.classList.remove('d-none');
        }
        else{
            seeAll.classList.add('d-none');
        } */
    
    tools.forEach(tool =>{
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
            <div class="card h-100">
            <img src="${tool.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-text">Features</h4>
                <ol>
                <li>${tool.features[0]}</li>
                <li>${tool.features[1]}</li>
                <li>${tool.features[2]}</li>
                </ol>
            </div>
            <hr class="w-80 mx-3">
            <div class="mx-3 pb-3 d-flex justify-content-between align-items-center">
            <div>
            <h5 class="card-title">${tool.name}</h5>
            <p><i class="fa-regular fa-calendar-days"></i>&nbsp;&nbsp;${tool.published_in}</p>
            </div>
            <div>
            <button onclick="loadToolDetails('${tool.id}')" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalPopup"><i class="fs-2 fa-regular fa-circle-right"></i></button>
            </div>
            </div>
            </div>
            `;
        toolsContainer.appendChild(toolDiv);

       /*  const modalDiv = document.createElement('div');
        modalDiv.classList.add('modal-dialog');
        modalDiv.innerHTML = `
        <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
                `;
        modalPopup.appendChild(modalDiv); */
    });

}

const loadToolDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayToolDetails(data.data))
}

const displayToolDetails = tool =>{
    console.log(tool);
    const modalContent = document.getElementById('modal-content-inside');
        modalContent.innerHTML = `
        <button type="button" class="position-absolute top-0 end-0 translate-middle btn-close bg-danger p-2" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="modal-body d-flex justify-content-center align-items-stretch">
            <div class="bg-danger-subtle bg-opacity-25 p-4 border border-danger-subtle rounded w-50">
                <div>
                    <h1 class="modal-title fs-5" id="modalPopupLabel">${tool.description ? tool.description : 'No description found'}</h1>
                    <div class="d-flex p-4 text-center justify-content-center align-items-center">
                        <div class="bg-white rounded p-2 m-2">
                            <div class="text-success-emphasis fw-bold">${tool.pricing ? tool.pricing[0].price : 'Free of Cost/'}</div>
                            <div class="text-success-emphasis fw-bold">${tool.pricing ? tool.pricing[0].plan : 'Basic'}</div>
                        </div>
                        <div class="bg-white rounded p-2 m-2">
                            <div class="text-warning-emphasis fw-bold">${tool.pricing ? tool.pricing[1].price : 'Free of Cost/'}</div>
                            <div class="text-warning-emphasis fw-bold">${tool.pricing ? tool.pricing[1].plan : 'Pro'}</div>
                        </div>
                        <div class="bg-white rounded p-2 m-2">
                            <div class="text-danger-emphasis fw-bold">${tool.pricing ? tool.pricing[2].price : 'Free of Cost/'}</div>
                            <div class="text-danger-emphasis fw-bold">${tool.pricing ? tool.pricing[2].plan : 'Enterprise'}</div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around">
                    <div>
                    <h5>Features</h5>
                        <ul>
                            <li>${tool.features[1].feature_name}</li>
                            <li>${tool.features[2].feature_name}</li>
                            <li>${tool.features[3].feature_name}</li>
                        </ul>
                    </div>
                    <div>
                    <h5>Integrations</h5>
                        <ul>
                            <li>${tool.integrations ? tool.integrations[0] : 'No Data Found'}</li>
                            <li>${tool.integrations ? tool.integrations[1] : 'No Data Found'}</li>
                            <li>${tool.integrations ? tool.integrations[2] : 'No Data Found'}</li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            <div class="p-3 w-50">
                <div class="border border-secondary-subtle rounded p-4">
                <div class="position-relative">
                <div class="z-3 position-absolute top-0 end-0 p-2 m-6 rounded-3 bg-danger text-white">${tool.accuracy.score ? tool.accuracy.score : 'No data for'} accuracy</div>
                <img src="${tool.image_link[0]}" class="img-fluid rounded">
                </div>
                <p class="fs-5 fw-bold text-center mt-4">${tool.input_output_examples ? tool.input_output_examples[0].input : 'Can you give any example?'}</p>
                <p class="text-center">${tool.input_output_examples ? tool.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                </div>
            </div>
        </div>`;
}
// {/* <div class="modal-header">
// <h1 class="modal-title fs-5" id="modalPopupLabel">${tool.description}</h1>

// </div> */}
// <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  
//       </div>

/* 
loadToolDetails = () =>{

    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res=>res.json())
    .then(data=>showToolDetails(data.data.tools))
}

const showToolDetails = id=>{
    console.log(id[0]);
}

loadToolDetails(); */

    // for(let i=01; i++, i<13){
    //     const id = i;
    // }

// displayToolDetails = id =>{

// }

// const loadToolDetails = async id =>{
//     const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data.data);
// }

/* const processSearch = (tools, dataLimit) =>{
    toggleSpinner(true);
    loadTool(tools, 6);
}
document.getElementById('see-more').addEventListener('click', function(){
    processSearch();
});


document.getElementById('sort-date').addEventListener('click', function(){
    toggleSpinner(true);
    });
 */

    /* const date1 = new Date('16 March 2017');
    const date2 = new Date('01/22/2021');
    const date3 = new Date('2000-12-31');
    const dates = [date1, date2, date3];
    
    dates.sort(function(a, b){
        return a - b 
    });
    
    console.log(dates); */
    // const publishedDate = data;
    // console.log(publishedDate);
    // var isDescending = true; //set to false for ascending
    // console.log(publishedDate.sort((a,b) => isDescending ? new Date(b).getTime() - new Date(a).getTime() : new Date(a).getTime() - new Date(b).getTime()));

/* const toggleSpinner = isLoading => {
const loaderSection = document.getElementById('spinner');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
        setTimeout(toggleSpinner(false), 5000);
    }
}  */

loadTool();