// display tool cards with API Data
const loadTool = async (tools) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    toggleSpinner(true);
    const data = await res.json();
    displayTools(data.data.tools.slice(0, 6));
}

const displayTools = tools =>{
    const toolsContainer = document.getElementById('tools-container');
    toggleSpinner(false);
    let tool = tools[0];
    toolsContainer.innerHTML = '';
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
    });

    // Sort By Date
    const sorting = (a, b)=>{
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        if(dateA > dateB){
            return 1;
        }
        else if(dateA < dateB){
            return -1;
        }
        else{
            return 0;
        }
    };
    
    const sortedData = tools.sort(sorting);
    
    document.getElementById('sort-by-date').addEventListener('click', function(){
        toolsContainer.innerHTML = '';
        tools.forEach(tool =>{
        const toolSortedDiv = document.createElement('div');
        toolSortedDiv.classList.add('col');
        toolSortedDiv.innerHTML = `
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
            <!--modal popup button--!>
            <button onclick="loadToolDetails('${tool.id}')" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalPopup"><i class="fs-2 fa-regular fa-circle-right"></i></button>
            </div>
            </div>
            </div>
            `;
            toolsContainer.appendChild(toolSortedDiv);
    })
})
}


// modal popup details
const loadToolDetails = (id) =>{
    const url2 = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url2)
    .then(res => res.json())
    .then(data => displayToolDetails(data.data))
}

const displayToolDetails = tool =>{
    console.log(tool);
    const modalContent = document.getElementById('modal-content-inside');
    let toolAccuracy = JSON.stringify(tool.accuracy.score);
        modalContent.innerHTML = `
        <button type="button" class="position-absolute top-0 end-0 translate-middle btn-close bg-danger p-2" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="modal-body m-0 d-flex flex-sm-row flex-md-row flex-column justify-content-center align-items-stretch">
            <div class="bg-danger-subtle bg-opacity-25 p-4 border border-danger-subtle rounded mr-auto-lg w-50-lg">
                <div>
                    <h1 class="modal-title fs-5" id="modalPopupLabel">${tool.description ? tool.description : 'No description found'}</h1>
                    <div class="d-flex p-4 text-center justify-content-center align-items-center">
                        <div class="bg-white rounded p-2 m-2">
                            <div class="text-success-emphasis fw-bold">${tool.pricing && tool.pricing === '0' ? tool.pricing[0].price : 'Free of Cost/'}</div>
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
                    <ul>${tool.integrations?.length ? tool.integrations.map((name) =>`<li>${name}</li>`).join(''):'No Data Found'}
                    </ul>
                    </div>
                    </div>
                </div>
            </div>
            <div class="p-3 w-50-lg mr-auto-lg">
                <div class="border border-secondary-subtle rounded p-4">
                <div class="position-relative">
                ${tool.accuracy.score?.length ? tool.accuracy.score.map((toolAccuracy) =>`<div class="z-3 position-absolute top-0 end-0 p-2 m-6 rounded-3 bg-danger text-white">[(toolAccuracy)*100 + "% accuracy"]</div>`).join(''):''}

                <div class="z-3 position-absolute top-0 end-0 p-2 m-6 rounded-3 bg-danger text-white">${tool.accuracy.score ? [toolAccuracy*100 + "% accuracy"] : ''}</div>
                <img src="${tool.image_link[0]}" class="img-fluid rounded">
                </div>
                <p class="fs-5 fw-bold text-center mt-4">${tool.input_output_examples ? tool.input_output_examples[0].input : 'Can you give any example?'}</p>
                <p class="text-center">${tool.input_output_examples ? tool.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                </div>
            </div>
        </div>`;
}

    
// Spinner to show on Loading Screen
const toggleSpinner = isLoading => {
const loaderSection = document.getElementById('spinner');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


loadTool();

// See More Button
const ShowAllTools = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    toggleSpinner(true);
    const data = await res.json();
    displayTools(data.data.tools);
    const seeMoreButton = document.getElementById('see-more');
    seeMoreButton.classList.add('d-none');
}
