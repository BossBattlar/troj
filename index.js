const express = require('express');
const dc = require('jwt-decode');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/fe.html")
})

app.get('/fe.js',(req,res)=>{
    res.sendFile(__dirname+"/fe.js");
})

app.get('/quiz.css',(req,res)=>{
    res.sendFile(__dirname+"/quiz.css")
})

app.post('/tokv',(req,res)=>{
    try{
        res.send({
            "error":"false",
            "dc":dc.jwtDecode(req.body.yok)
        });
    }catch(e){
        res.send({
            "error":"true",
            "dc":"erroe occured"
        })
    }
})

app.post('/subjects',(req,res)=>{
    if ((req.body.rno).includes("245321")){
        if ((req.body.rno).includes("733")){
            url="https://api.tesseractonline.com/studentmaster/subjects/5/5"
        }else{
            url="https://api.tesseractonline.com/studentmaster/subjects/5/6"
        }
    }else{
        if ((req.body.rno).includes("733")){
            url="https://api.tesseractonline.com/studentmaster/subjects/4/5"
        }else{
            url="https://api.tesseractonline.com/studentmaster/subjects/4/6"
        }
    }
    try{
        fetch(url,{
            method:'GET',
            headers: { 
                'Authorization': 'Bearer '+req.body.tok,
                'Referer':'https://tesseractonline.com/'
            },
        }).then((res)=>res.json()).then((d)=>{
            subs=d['payload']
            sud={"error":"false"}
            for(i in subs){
                sud[subs[i]['subject_id']]=subs[i]['subject_name']
            }
            res.send(sud)
        })
    }catch{
        res.send({"error":"true"})
    }
})

app.post('/units',(req,res)=>{
    url="https://api.tesseractonline.com/studentmaster/get-subject-units/"+req.body.sub
    try{
    fetch(url,{
        method:'GET',
        headers: { 
            'Authorization': 'Bearer '+req.body.tok,
            'Referer':'https://tesseractonline.com/'
        },
    }).then(res=>res.json()).then(d=>{
        units=d['payload']
        unitpay={'error':'false'}
        for(i in units){
            unitpay[units[i]['unitId']]=units[i]['unitName']
        }
        res.send(unitpay)
    })}catch{
        res.send({'error':'true'})
    }
})

app.post('/topics',(req,res)=>{
    url='https://api.tesseractonline.com/studentmaster/get-topics-unit/'+req.body.top+'/1273'
    try{
    fetch(url,{
        method:'GET',
        headers: { 
            'Authorization': 'Bearer '+req.body.tok,
            'Referer':'https://tesseractonline.com/'
        }
    }).then(res=>res.json()).then(d=>{
        tops=d['payload']['topics']
        topp={'error':'false'}
        for(i in tops){
            topp[tops[i]['id']]={
                'name':tops[i]['name'],
                'videourl':tops[i]['videourl'],
                'pdf':tops[i]['pdf']
            }
        }
        res.send(topp)
    })}catch{res.send({'error':'true'})}
})

app.post('/write-quiz',(req,res)=>{
    url="https://api.tesseractonline.com/quizattempts/quiz-result/"+req.body.id

    try{
        fetch(url,{
            method:'GET',
            headers: { 
                'Authorization': 'Bearer '+req.body.tok,
                'Referer':'https://tesseractonline.com/'
            }
        }).then(res=>res.json()).then(d=>{
            if(d['payload']["badge"]===1){
                console.log('its done')
            }else{
                urll="https://api.tesseractonline.com/quizattempts/create-quiz/"+req.body.id
                fetch(urll,{
                    method:'GET',
                    headers: { 
                        'Authorization': 'Bearer '+req.body.tok,
                        'Referer':'https://tesseractonline.com/'
                    }
                }).then(res=>res.json()).then(d=>{
                    var quiz=d['payload']['quizId']
                    qz={}
                    for (i in d['payload']['questions']){
                       qz[i]=d['payload']['questions'][i]["questionId"]
                    }
                    urlq='https://api.tesseractonline.com/quizquestionattempts/save-user-quiz-answer'
                    var i=0
                    console.log(qz)
                    opt=['a','b','c','d']
                    save
                    for(i in qz){
                        for(j in opt){
                            fetch(urlq,{
                                method:'POST',
                                headers:{
                                    'Authorization': 'Bearer '+req.body.tok,
                                    'Referer':'https://tesseractonline.com/'
                                },
                                body:{
                                    questionId: qz[i],
                                    quizId: quiz,
                                    userAnswer: opt[j]
                                }
                            }).then(res=>res.json()).then(d=>{
                                console.log(d)
                            })
                        }
                    }
                })
            }
        })

    }catch{res.send({"error":"true"})}
})

app.get('/404.css',(req,res)=>{
    res.sendFile(__dirname+"/404.css");
})

app.get('*',(req,res)=>{
    res.sendFile(__dirname+"/404.html");
})
app.post('*',(req,res)=>{
    res.send({'error':'true'});
})


app.listen(3000,()=>{console.log("server at 3000 is ready sir!")})