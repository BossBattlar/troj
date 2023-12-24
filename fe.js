var tol=document.getElementById("tok");
var token;
var url;


async function token_verifier(){
        const li =await fetch("/tokv",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "give_me":"data",
                "yok":tol.value
            })
        }).then(res=>res.json()).then((d)=>{
            window.localStorage.setItem("rno",d['dc']['username']);
            if(d['error']=='false'){
                localStorage.setItem("token", tol.value);
                document.getElementById('body').innerHTML=`    <div>
                <div id="details">
                    <div>hello</div>
                    <h2>WELCOME </h2>
                    <p>${d['dc']['name']}</p>
                    <p>Collage: ${d['dc']['collegeName']}</p>
                    <p>Roll No: ${d['dc']['username']}</p>
                </div>
                <div id='components'>
                    <input type="button" value="get subjects" onclick="dat()" />
                </div>
            </div>`;
            }else{
                document.getElementById('lab').innerText="WRONG TOKEN TRY WITH ANOTHER ONE"
            }
        })
}
async function dat(){
    const re= await fetch("/subjects",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "rno":window.localStorage.getItem("rno"),
            "tok":window.localStorage.getItem("token"),
        })
    }).then(res=>res.json()).then(d=>{
        if(d['error']=='false'){
            delete(d['error'])
            let tex='';
            for(i in d){
                tex+=`<input type="button" value="${d[i]}" onclick=units(${i}) />`;
            }
            document.getElementById('components').innerHTML=tex;
        }else{
            
        }
    })
}
async function units(l){
    const ref= await fetch("/units",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "sub":l,
            "tok":window.localStorage.getItem('token')
        })
    }).then(res=>res.json()).then(d=>{
        if(d['error']=='false'){
            delete(d['error'])
            let tex='';
            for(i in d){
                tex+=`<input type="button" value="${d[i]}" onclick=topics(${i}) />`;
            }
            document.getElementById('components').innerHTML=tex;
        }else{
            console.log('error')
        }
    })
}

async function topics(l){
    const ref= await fetch("/topics",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "top":l,
            "tok":window.localStorage.getItem("token")
        })
    }).then(res=>res.json()).then(d=>{
        console.log(d)
        if(d['error']=='false'){
            delete(d['error'])
            let tex='';
            for(i in d){
                tex+=`<input type="button" value="${d[i]['name'].slice(0,15)}" onclick=topics(${i})/>
                <input type="button" value="" />`;
            }
            document.getElementById('components').innerHTML=tex;
        }else{
            
        }
    })
}
