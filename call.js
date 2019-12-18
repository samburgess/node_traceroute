const {exec} = require('child_process')
const express = require('express')
const app = express()
const https = require('https')

var output = ""
const port = 3000

getInfo = (ip) =>{


    console.log("from getInfo: "+tosend)
    return tosend;
}


app.get('/', (req, res) => {
    //execute traceroute and put stdout in output
    exec( 'traceroute -m 10 nyu.edu', async (err, stdout, stderr) => {
        console.log("traceroute");
        if(err){
            console.log("\nerror\n")
            return;
        }
        //console.log(`${stdout}`)
        output = `${stdout}`

        //get list ip
        var ips = {};
        var i = 0;
        var j = 0;
        var ip = "";

        while(true/*output.charAt(i)!='\n' && i<output.length*/){
            if(output.charAt(i)==='('){
                i++;
                while(output.charAt(i)!==')'){
                    ip += output.charAt(i)
                    i++;
                }
                //console.log(ip);
                ips[j] = ip;
                break;
                j++;
            }
            i++;
        }
        i++;

        //const city_state = await getInfo(ip)
        console.log(ip)
        const key = "a4e6948f93364875b18de0746c48ee4b"
        const url = "https://api.ipgeolocation.io/ipgeo?" 
        url.concat("&key="+key+"&ip="+ip)
        https.get(url, (resp) => {
            let data = ''
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            })
            resp.on('end', () => {
                console.log("end stream")
                console.log("sending")
                res.send(JSON.parse(data).city+", "+JSON.parse(data).state_prov)
            })
            // console.log("sending")
            // res.send(tosend)
        })
    })//exec
})//app.gete

app.listen(port, () => console.log(`Example app listening on port ${port}!`))