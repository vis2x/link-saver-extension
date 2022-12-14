
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); 

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
 
tabBtn.addEventListener("click", function(){
    // Requires the chrome api to run this code... meaning it will only work on Chrome
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        let activeTab = tabs[0];
        let activeTabID = activeTab.url;
        myLeads.push(activeTabID);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
})

// "dblclick" for double click
deleteBtn.addEventListener("click", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href="${leads[i]}">  
                ${leads[i].replace('https://www.','')}
            </a>
        </li>`;
        // == Alternative way of doing the same thing as the line above ==
        //
        // let li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(textContent)
    }
    ulEl.innerHTML = listItems  
}