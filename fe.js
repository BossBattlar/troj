var tol=document.getElementById("tok");
var token;
var url;


async function token_verifier(tok){
        const li =await fetch("/tokv",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "give_me":"data",
                // "yok":tol.value
                "yok":window.localStorage.getItem('token')
            })
        }).then(res=>res.json()).then((d)=>{
            window.localStorage.setItem("rno",d['dc']['username']);
            if(d['error']=='false'){
                localStorage.setItem("token", tol.value);
                document.getElementById('body').innerHTML=`    <div>
                <div id="D1">
                    <div id="details"> 
                        <h2>WELCOME </h2>
                        <p>${d['dc']['name']}</p>
                        <p>Collage: ${d['dc']['collegeName']}</p>
                        <p>Roll No: ${d['dc']['username']}</p>    
                    </div>
                    <div id="Logout">
                            <img src="${window.localStorage.rno.slice(0,4)?"https://teleuniv.net.in/sanjaya/student-images/":"http://teleuniv.net.in:81/sanjaya/student-images/"}${window.localStorage.rno}.jpg" id="img" alt="your img">
                            <input type="button" value="Log out" onclick="Logout()" />
                    </div>
                </div>
                <div id='components'>
                    <input type="button" value="get subjects" onclick="dat()" />
                </div>
            </div>
            `;
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
            
         var bdys=   `<div class="navb">
        <div class="nav">
          <ul>`
        var bdye=`
          </ul>
       </div>
    </div>`
            for(i in d){
                var lisi=`<li><a href="#">${d[i]['name'].slice(0,15)}</a>
                <div class="sub-menu-1">
                  <ul>
                    <li id="li"> <a href="https://api.tesseractonline.com/${d[i]['pdf']}" target="_blank" >pdf</a> </li>
                    <li id="li"> <a href="https://api.tesseractonline.com/${d[i]['video']}" target="_blank" >video</a> </li>
                    <li id="li"> <a href="#" onclick="write(${i})" >write-quiz</a> </li>
                  </ul>
                </div>
            </li>`
                bdys+=lisi
            }
            bdys=bdys+bdye
            document.getElementById('components').innerHTML=bdys;
        }else{
            
        }
    })
}

async function Logout(){
    window.localStorage.removeItem('token')
    window.location.href="/"
}

console.log('window loaded')
window.localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlcnJvciI6ZmFsc2UsInVzZXJuYW1lIjoiMjQ1MzIyNzMzMDYxIiwic3ViIjoxMjM3LCJyb2xlIjoiU1RVREVOVCIsImNvbGxlZ2VJZCI6MiwiY29sbGVnZU5hbWUiOiJOR0lUIiwibmFtZSI6IlRIRU5FVEkgQUJISVJBTSBSRUREWSIsImlhdCI6MTcwMzU5ODI5MSwiZXhwIjoxNzAzNjE5ODkxfQ.p91Fjgmbejl26KiYHDmnDwxCWQ4yrJWKEPE-riThBSY')
token_verifier()

console.log('token set')