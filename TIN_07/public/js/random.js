let intervalId = null;

console.log("Hi from random.js!!!");

function startUpdates(){
    if(intervalId != null){
        return;
    }

    intervalId = setInterval(async () => {
        try{
            const res = await fetch("/data/random");
            const data = await res.json();

            document.getElementById("randomNumber").textContent = data.randomValue;
            document.getElementById("updateTime").textContent = new Date().toLocaleString();
        }catch(e){
            console.error("Error: " + e.message);
        }
    }, 2000);
}

function stopUpdates(){
    clearInterval(intervalId);
    intervalId = null;
}