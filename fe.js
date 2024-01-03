var tol=document.getElementById("tok");
var token;
var url;
async function dcd(){
    str=tol.value;
    ustr='';
    for(let i=0;i<str.length;i++){
        ustr+= String.fromCharCode(str.charCodeAt(i)-3);
    }
    token_verifier(ustr);
}
async function token_verifier(tk){
        const li =await fetch("/tokv",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "give_me":"data",
                "yok":tk
            })
        }).then(res=>res.json()).then((d)=>{
            window.localStorage.setItem("rno",d['dc']['username']);
            if(d['error']=='false'){
                localStorage.setItem("token", tk);
                document.getElementById('body').innerHTML=`    <div>
                <div id="D1">
                    <div id="details"> 
                        <h2>WELCOME</h2></br>
                        <h3>${d['dc']['name']}</h3></br>
                        <p>Collage: ${d['dc']['collegeName']}</p></br>
                        <p>Roll No: ${d['dc']['username']}</p></br>
                    </div>
                    <div id="Logout">
                            <img src="${window.localStorage.rno.slice(0,4)=='2453'?"https://teleuniv.net.in/sanjaya/student-images/":"http://teleuniv.net.in:81/sanjaya/student-images/"}${window.localStorage.rno}.jpg" id="img" alt="your img">
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
            console.log('hello')
        }else{
            
        }
    })
}
async function units(l){
    window.localStorage.setItem('uid',l)
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
            document.getElementById('components').innerHTML=tex+`<div id='back'><input type='button' value='back' onclick='dat()' /></div>`;
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
                    <li id="li"> <a href="https://youtu.be/6KbXK8LZoPc?si=ubRujktIyRi4d4vV" >write-quiz</a> </li>
                  </ul>
                </div>
            </li>`
                bdys+=lisi
            }
            bdys=bdys+bdye
            document.getElementById('components').innerHTML=`<div id='back'><input type='button' value='back' onclick='dat()' /></div>`+bdys;
        }else{
            
        }
    })
}

async function Logout(){
    window.localStorage.removeItem('token')
    window.location.href="/"
}

if(window.localStorage.getItem('token')){
        tol.value= window.localStorage.getItem('token');
        token_verifier(tol.value)
}
// window.onresize=function(){
//     return a(this, void 0, void 0, function() {
//         var n, i;
//         return s(this, function(e) {
//             return null === c && (c = function() {
//                 for (var e = function() {
//                     for (var e = {}, t = 0; t < 500; t++)
//                         e["".concat(t)] = "".concat(t);
//                     return e
//                 }(), t = [], n = 0; n < 50; n++)
//                     t.push(e);
//                 return t
//             }()),
//             t = Object(r.c)(),
//             Object(o.c)(c),
//             n = Object(r.c)() - t,
//             t = Object(r.c)(),
//             Object(o.b)(c),
//             i = Object(r.c)() - t,
//             l = Math.max(l, i),
//             Object(o.a)(),
//             0 == n || 0 === l ? [2, !1] : [2, 10 * l < n];
//             var t
//         })
//     })
// }
document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
};