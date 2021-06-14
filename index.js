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
let selectedItem=0;
let scaleFactor=1;
let IntialPixelDensity=1;
let InitialScaleHeight=17;
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
//creates the preview section
const createPreview=(index,option)=>{
    const Preview=document.querySelector(".preview");
    //remove previousItem
    while(Preview.childNodes.length>0){
        Preview.removeChild(Preview.childNodes[0]);
    }
    const Image=createDomElement("img",{src:option.previewImage,class:"previewImage"},[]);
    const title=document.createTextNode(option.title);
    Preview.appendChild(Image);
    Preview.appendChild(title);
    return Preview;
}
//create ListItem
const createListItem=(index,option)=>{
    const textBox=createDomElement("div",{class:"textBox"},[]);
    const thumbnail=createDomElement("img",{class:"thumbnail",src:option.previewImage},[])
    const thumbnailBox=createDomElement("div",{style:`width:${5*scaleFactor}vh;height:${5*scaleFactor}vh;`,class:"thumbnailBox"},[thumbnail]);
    const listItem=createDomElement("div",{style:`width:${20*scaleFactor}vh;height:${6*scaleFactor}vh;`,class:`listItem ${index===selectedItem?'selected':''}`},[thumbnailBox,textBox]);
    return listItem;
}
let factor=1;
// fill text after adjustment
const fillText=(List,option,index)=>{
    let currChild=List.childNodes[index].childNodes[1];
            let l=0,r=option.title.length-1;
            let prefix='',suffix='',mid='...';
            let maxHeight=0;
            currChild.innerHTML='M';
            maxHeight=currChild.clientHeight;
            currChild.innerHTML=option.title;
            if(currChild.clientHeight<=3*maxHeight){mid='';}
                while(l<=r){
                currChild.innerHTML=prefix+mid+suffix;
                if(currChild.clientHeight>=4*maxHeight){
                    break;
                }
                currChild.innerHTML=prefix+option.title[l]+mid+suffix;
                if(currChild.clientHeight>=4*maxHeight){
                    break;
                }
                prefix+=option.title[l];
                l++;
                if(l<=r){
                    currChild.innerHTML=prefix+mid+option.title[r]+suffix;
                    if(currChild.clientHeight>=4*maxHeight){
                        break;
                    }
                    suffix=option.title[r]+suffix;
                    r--;
                }
            }
        List.childNodes[index].childNodes[1].innerHTML=prefix+mid+suffix;
        
}
// create updateView function
const updateView=(currItem)=>{
    selectedItem=currItem;
//get the hold of list
const List=document.querySelector(".list");
    while(List.childNodes.length>0){
        List.removeChild(List.childNodes[0]);
    }
    let Preview;
    //add all items
    options.forEach((option,index)=>{
        if(index===selectedItem){
            Preview=createPreview(selectedItem,option);
        }
         let listItem=createListItem(index,option);
         List.appendChild(listItem);
         fillText(List,option,index);
         //handle click;
        listItem.addEventListener("click",(event)=>{
            event.preventDefault();
            updateView(index);
        })
      
    })
}

//handle keyboard event
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
//Update dynamic
let ruler=document.getElementById('ruler');
ruler.innerHTML='M';
IntialPixelDensity=window.devicePixelRatio;
InitialScaleHeight=ruler.offsetHeight;
scaleFactor=ruler.offsetHeight/InitialScaleHeight;
ruler.innerHTML='';
scaleFactor*=(window.devicePixelRatio/IntialPixelDensity);
window.addEventListener('resize',()=>{
    let ruler=document.getElementById('ruler');
    ruler.innerHTML='M';
    scaleFactor=ruler.offsetHeight/InitialScaleHeight;
    ruler.innerHTML='';
    scaleFactor*=window.devicePixelRatio/IntialPixelDensity;
    console.log(scaleFactor,IntialPixelDensity,InitialScaleHeight);
    updateView(selectedItem);
});
updateView(selectedItem);
