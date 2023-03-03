const loadTool = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayTools(data.data.tools);
}

const displayTools = tools =>{
    const toolsContainer = document.getElementById('tools-container');
    let tool = tools[0];
    console.log(tool);
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
            <i class="fs-2 fa-regular fa-circle-right"></i>
            </div>
            </div>
            </div>
            `;
        toolsContainer.appendChild(toolDiv);
    })
}
    // Tools.forEach(Tool =>
    //     console.log(Tool)
    // )
  /*   
        `
    
// })

 */
loadTool(11);