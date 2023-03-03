function loadTool(){
    fetch('https://openapi.programming-hero.com/api/ai/tool/01')
    .then(res => res.json())
    .then(data => displayTools(data))
}

const displayTools = Tools =>{
    console.log(Tools.data);
    const ToolsContainer = document.getElementById('tools-container');
    // Tools.forEach(Tool =>
    //     console.log(Tool)
    // )
    const ToolDiv = document.createElement('div');
    ToolDiv.classList.add('col');
    ToolDiv.innerHTML = `
        <div class="card h-100">
            <img src="${Tools.data.image_link[1]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-text">Features</h4>
                <ol>
                <li>${Tools.data.features[1].feature_name}</li>
                <li>${Tools.data.features[2].feature_name}</li>
                <li>${Tools.data.features[3].feature_name}</li>
                </ol>
            </div>
        <div class="card-footer">
            <h5 class="card-title">${Tools.data.tool_name}</h5>
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
        `
    ToolsContainer.appendChild(ToolDiv);
// })
}

loadTool();