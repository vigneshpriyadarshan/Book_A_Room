function roomInfo(elem, roomnum) {
    //Display loading text
    elem.lastElementChild.innerHTML = "Loading info for room " + roomnum;

    //Sanity check for roomnum
    if (!Number.isSafeInteger(roomnum)) {
        elem.lastElementChild.innerHTML = "Room number should be an integer. This shouldn't happen, please report this bug";
        return 1;
    }

    //HTTP request to php script
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                //If request is successful, display room info
                dispSuccess(elem.lastElementChild, roomnum, this);
            } else {
                //If request fails, show xhr error
                dispFailure(elem.lastElementChild, this);
            }
        }
    };

    xhr.onerror = function () {
        //If request fails, show xhr error
        dispFailure(elem.lastElementChild, this);
    };

    xhr.open("GET", "query.php?roomnum=" + roomnum, true);

    //Send async request
    xhr.send();
}

function dispFailure(elem, response) {
    elem.innerHTML = "HTTP request error. Status:" + response.status + response.statusText + "\n" + response.responseText;
}

function dispSuccess(elem, roomnum, response) {
    elem.innerHTML = "Room info:";

    let timeslots = response.responseText.split(";");

    let curday = "";
    let curdayelem;
    for (let i = 1; i < timeslots.length; i++) {
        //2019-09-21 08:00:00,1
        let date = timeslots[i].substr(0, 10);
        let time = timeslots[i].substr(11, 8);
        let available = timeslots[i].substr(20, 1);

        //Create individual time element
        let slotdiv = document.createElement("div");
        slotdiv.innerText = time;

        if (available === "1") {
            slotdiv.setAttribute("style", "color:green");
            slotdiv.addEventListener("click", function(e) {
                let name = window.prompt("Please enter your name: ");
                if (name === null) return;
                let id = window.prompt("Please enter your SBU ID: ");
                if (id === null) return;
                
                
                // $(document).ready(function () { 
                //     createCookie(name, id); 
                // }); 

                var xhr = new XMLHttpRequest();

                xhr.onload = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            alert(this.responseText);
                            window.alert(name + "(" + id + ") has reserved " + date + " " + time + "\nPLEASE REMEMBER THIS");
                            slotdiv.setAttribute("style", "color:red");
                            slotdiv.removeEventListener(e.type, arguments.callee);
                        } else {
                            alert(this.responseText);
                            //If request fails, show xhr error
                            alert("Room reservation failed");
                        }
                    }
                };
            
                xhr.onerror = function () {
                    alert(this.responseText);
                    //If request fails, show xhr error
                    alert("Room reservation failed")
                };
            


                xhr.open("GET", "markreserved.php?name=" + name + "&id=" + id + "&roomnum=" + roomnum + "&date=" + date + "&time=" + time, true);
            
                //Send async request
                xhr.send();
            

                //TODO: php to update db                //date and time are variables you want as well? sure
            });
        } else {
            slotdiv.setAttribute("style", "color:red");
        }


        //If we are on a new day, create new parent element
        if (curday !== date) {
            if (curday !== "") {
                elem.appendChild(curdayelem);
            }

            curday = date;
            curdayelem = document.createElement("div");
            curdayelem.classList.add("timeContainer");
            // curdayelem.classList.add("hiddenChildren");
            // curdayelem.addEventListener("click", function (e) {
            //     if (e.target == this) {
            //         if (this.classList.contains("hiddenChildren")) {
            //             this.classList.remove("hiddenChildren");
            //         } else {
            //             this.classList.add("hiddenChildren");
            //         }
            //     }
            // });
            curdayelem.innerText = date;
        }
        curdayelem.appendChild(slotdiv);
    }
    elem.appendChild(curdayelem);
}