let vDOM = []; 
function createDomElement(existingDom, currentDom){
    let parentElement = document.getElementById("main-area")
    let added = 0, deleted = 0, updated = 0;

    // comparing our new dom to the old dom
    currentDom.forEach((item)=>{
        // check if an item alredy exist with this id in the oldDom
        let existingItem = existingDom.find((oldItem)=>{
            return oldItem.id === item.id;
        });

        if(existingItem){
            updated++;
            // If it exists update it
            let existingChld = document.querySelector(`[data-id='${item.id}']`)
            existingChld.children[0].innerHTML = item.title;
            existingChld.children[1].innerHTML = item.description;
        }else{
            added++;
            // If it deosn't exist in the DOM the crete it
            let childElement = document.createElement("div");
            childElement.dataset.id = item.id;   //store the if for future use
            
            let grandChildren1 = document.createElement('span')
            grandChildren1.innerHTML =  item.title;

            let grandChildren2 = document.createElement('span')
            grandChildren2.innerHTML =  item.description;

            let grandChildren3 = document.createElement('button')
            grandChildren3.innerText =  "delete";
            grandChildren3.setAttribute("onclick", "deleteTodo(" + item.id +")")

            // APPENDING the children
            childElement.appendChild(grandChildren1)
            childElement.appendChild(grandChildren2)
            childElement.appendChild(grandChildren3)
            parentElement.appendChild(childElement)
        }
    })
    // Any item left in the existingDom arrat no longer exists in the data , so remove it  
    existingDom.forEach((oldItem)=>{
        if(!currentDom.some(item => item.id === oldItem.id) ){
            deleted++;
            let childToRemove = document.querySelector(`[data-id='${oldItem.id}']`)
            parentElement.removeChild(childToRemove)
        }
    })
    console.log(`Added elments :- ${added}`)
    console.log(` Updated elements :- ${updated}`)
    console.log(` Deleted elements :- ${deleted}`)
    console.log("----")
}

function updateVirtualDom(data) {
    let existingDom = [...vDOM];
    vDOM = data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
    }));

    createDomElement(existingDom, vDOM);
}

window.setInterval(()=>{
    let todos = [];
    for (let i=0; i < Math.floor(Math.random() * 50); i++){
        todos.push({
            title:"GYM",
            description:"go to gym at 6-7pm",
            id:i+1,
        })
    }
    updateVirtualDom(todos)
}, 5000)