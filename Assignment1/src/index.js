const options=[
    {
        "previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cat.jpeg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cooking couple shoot portofilio(1).jpg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "bali-kelingking-beach-plastic-removal-drive.key"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "NextByk Investor Pitch 2021.ppt"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "title": "interns-performance-report-june-2021.key"
    }
];
let selectedItem=1;
//create util function for creating elements
const createDomElement=(name,atrs,children)=>{
    let item=document.createElement(name);
    for(let key in atrs){
        item.setAttribute(key,atrs[key]);
    }
    for(child of children){
        item.appendChild(child);
    }
    return item;
}
//truncate text to fit in
const truncateText=(text)=>{
    if(text.length<=35)return text;
    let left=text.slice(0,17);
    let right=text.slice(text.length-15,text.length);
    let newText=left+'...'+right;
    return newText;
}
// create updateView function
const updateView=(currItem)=>{

//get the hold of list
const List=document.querySelector(".list");
//get hold of preview
const Preview=document.querySelector(".preview");
    selectedItem=currItem;
    //remove previousItem
    while(Preview.childNodes.length>0){
        Preview.removeChild(Preview.childNodes[0]);
    }
    while(List.childNodes.length>0){
        List.removeChild(List.childNodes[0]);
    }

    //add all items
    options.forEach((option,index)=>{
        if(index===selectedItem){
            const Image=createDomElement("img",{src:option.previewImage,class:"previewImage"},[]);
            const title=document.createTextNode(option.title);
            Preview.appendChild(Image);
            Preview.appendChild(title);
        }
        const thumbnail=createDomElement("img",{class:"thumbnail",src:option.previewImage},[])
        const thumbnailBox=createDomElement("div",{class:"thumbnailBox"},[thumbnail]);
        const title=document.createTextNode(truncateText(option.title));
        const titleBox=createDomElement("div",{class:"textBox"},[title]);
        const listItem=createDomElement("div",{class:`listItem ${index===selectedItem?'selected':''}`},[thumbnailBox,titleBox]);
        listItem.appendChild(title);
        //handle click;
        listItem.addEventListener("click",(event)=>{
            event.preventDefault();
            updateView(index);
        })
        List.appendChild(listItem);
    })
}
updateView(0,0);
document.addEventListener("keydown",(event)=>{
    if(event.key==="ArrowUp"){
        event.preventDefault();
        let newIndex=(selectedItem-1+options.length)%(options.length);
        updateView(newIndex);
    }
    if(event.key==="ArrowDown"){
        event.preventDefault();
        let newIndex=(selectedItem+1+options.length)%(options.length);
        updateView(newIndex);
    }
})
