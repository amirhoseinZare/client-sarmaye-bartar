const all = [...document.querySelectorAll(".status-info")]

all.slice(0,20).forEach(item=>{
    if(item.querySelector(".ant-tag").innerHTML === "Undeployed"){
        item.querySelector("button").click()
    }
})