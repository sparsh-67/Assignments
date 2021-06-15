const options=[
    {
        "previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title":  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cooking couple shoot portofilio(1).jpg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from `de Finibus Bonorum et Malorum` by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "title": "interns-performance-report-june-2021.key"
    }
];
let selectedItem=0;
let scaleFactor=1;
let IntialPixelDensity=1;
let InitialScaleHeight=1;
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
    const textBoxWrapper=createDomElement("div",{class:"textBoxWrapper"},[textBox]);
    const thumbnail=createDomElement("img",{class:"thumbnail",src:option.previewImage},[])
    const thumbnailBox=createDomElement("div",{style:`width:${5*scaleFactor}vh;height:${5*scaleFactor}vh;`,class:"thumbnailBox"},[thumbnail]);
    const listItem=createDomElement("div",{style:`width:${20*scaleFactor}vh;height:${6*scaleFactor}vh;`,class:`listItem ${index===selectedItem?'selected':''}`},[thumbnailBox,textBoxWrapper]);
    return listItem;
}
let factor=1;
// fill text after adjustment
const fillText=(List,option,index)=>{
    let currChild=List.childNodes[index].childNodes[1].childNodes[0];
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
        List.childNodes[index].childNodes[1].childNodes[0].innerHTML=prefix+mid+suffix;
        
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
//create dynamic ruler
let ruler=createListItem(0,{title:'M'});
let List=document.querySelector('.list');
List.appendChild(ruler);
//need pixel size to scale
IntialPixelDensity=window.devicePixelRatio;
fillText(List,{title:'M'},List.childNodes.length-1)
let curr=List.childNodes[List.childNodes.length-1].childNodes[1].childNodes[0];
//initial height to scale
InitialScaleHeight=curr.offsetHeight;
scaleFactor=curr.offsetHeight/InitialScaleHeight;
List.removeChild(List.lastChild);
scaleFactor*=(window.devicePixelRatio/IntialPixelDensity);
List.style.columnGap=`${2*scaleFactor}vh`;
//event listner for resize window
window.addEventListener('resize',()=>{
    let ruler=createListItem(0,{title:'M'});
    let List=document.querySelector('.list');
    List.appendChild(ruler);
    fillText(List,{title:'M'},List.childNodes.length-1)
    let curr=List.childNodes[List.childNodes.length-1].childNodes[1].childNodes[0];
    scaleFactor=curr.offsetHeight/InitialScaleHeight;
    scaleFactor*=(window.devicePixelRatio/IntialPixelDensity);
    List.removeChild(List.lastChild);
    List.style.columnGap=`${2*scaleFactor}vh`;
    updateView(selectedItem);
});
updateView(selectedItem);
