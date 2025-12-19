var addProduct = document.querySelector(".adding");
var closePage = document.querySelector(".close-btn");
// var addPhoto = document.getElementById("add-photo");
var filePhoto = document.querySelector(".filesPhoto");
var userName = document.querySelector(".userName");
var phoneNumber = document.querySelector(".phoneNumber");
var email = document.querySelector(".e-adress");
var streetAdrees = document.querySelector(".stree-adress");
var formSelection = document.querySelector(".form-select");
var notesBody = document.querySelector(".text-area");
var contentNotes = document.querySelector(".content-notes");
var searchField = document.querySelector(".searchField");

var sortName = document.querySelector(".shortName");
var personPhoto = document.querySelector(".person-photo");
var userFullName = document.querySelector(".user-full-name");
var notedPhoneNumber = document.querySelector(".note-phone-number");
var noteEmailAdddress = document.querySelector(".email-address");
var notePhysicalAdddress = document.querySelector(".physical-address");
var updateContact = document.querySelector(".edit-contact");
var trash = document.querySelector(".fa-trash");
var closeDelete = document.querySelector(".close-delete");
var noContactLogo = document.querySelector(".no-contacts-logo");

var favorit = false;
document.querySelector(".favorite").addEventListener("click",function(){
    if (this.classList.contains("non-check")) {

        this.classList.remove("non-check");
        this.classList.add("check");

        favorit = true;
    } else {
        this.classList.remove("non-check");
        this.classList.add("check");
        favorit = false;
    }
});

var emergancy = false;
document.querySelector(".emergancy").addEventListener("click",function(){
    if (this.classList.contains("non-check")) {

        this.classList.remove("non-check");
        this.classList.add("check");

        emergancy = true;
    } else {
        this.classList.remove("non-check");
        this.classList.add("check");
        emergancy = false;
    }
});

var cancel = document.querySelector(".cancel");
var save = document.querySelector(".save");
var update = document.querySelector(".update");

var totalNumber = document.querySelector(".total-number");
var totalFavoriteNumber = document.querySelector(".total-favorites-num");
var totalEmergincyNumber = document.querySelector(".total-emergency-num");
var contactsNumber = document.querySelector(".contacts-number");



/* ============================================================ Start Adding Contact */
var shortName = "";
var noteNumber = 0;
var contactsList = [];
var tempArrName = [];

if (window.localStorage.getItem("notes"))
{
    contactsList = JSON.parse(window.localStorage.getItem("notes"));
    displayNotes();
} else {
    displayNotes();
}

if(contactsList.length === 0) 
{
    noContactLogo.classList.add("d-block");
    noContactLogo.classList.remove("d-none");
} else {
    noContactLogo.classList.add("d-none");
    noContactLogo.classList.remove("d-block");
}


function addContacts() 
{


    // if(validation(userName.value, email.value, phoneNumber.value)) 
    // {
        contactsList.unshift({
            image: filePhoto.files.length === 0 ? "" : filePhoto.files[0].name,
            fullName: userName.value,
            pNumber: phoneNumber.value,
            eAddress: email.value,
            physicalAdres: streetAdrees.value,
            group: formSelection.value,
            notes: notesBody.value,
            fav: favorit,
            emer: emergancy,
        });
        
        window.localStorage.setItem("notes", JSON.stringify(contactsList));
        clearInputs();
    // }

}

function displayNotes()
{
    var tempNotes = [];
    tempArrName = [];
    var favoritesPhones = "";
    var favoritesNumber = 0;
    var emrgencyPhones = "";
    var emergancieNumber = 0;

    for(var i=0; i<contactsList.length; i++)
    {
        tempArrName = contactsList[i].fullName.split(" ");
        if (tempArrName.length === 1)
        {
            shortName = tempArrName[0][0];
        } else {
            shortName = tempArrName[0][0] + tempArrName[tempArrName.length-1][0];
        }

        tempNotes+= `<div class="p-3 col-md-6 col-12 ">
                        <div class=" bg-white p-3 rounded-4 box-shadow-boxes">
                            <div class="top-section d-flex align-items-end">
                                <div class="photo-section ">
                                    ${ contactsList[i].image === '' ? 
                                        `<div class="w-fit p-3 rounded-3 ${contactsList[i].fav === true ? `star-icone`: ``} ${contactsList[i].emer === true ? `heart-icone`: ``} ${tempArrName.length <= 2 ? `bg-heart` : tempArrName.length === 3 ? `bg-blue` : `bg-star` } ">
                                            <p class="shortName text-uppercase text-white fw-bold fs-5 mb-0">
                                                ${shortName}
                                            </p>
                                        </div>`
                                        :
                                        `<div class=" width-photo ${contactsList[i].fav === true ? `star-icone`: ``} ${contactsList[i].emer === true ? `heart-icone`: ``}">
                                            <img class="person-photo rounded-3" src=./images/${contactsList[i].image} alt="">
                                        </div>`
                                    }
                                </div>

                                <div class="ps-4">
                                    <p class="user-full-name mb-0 fw-bold pb-2">${contactsList[i].fullName.length > 20 ? contactsList[i].fullName.slice(0,20)+"..." : contactsList[i].fullName}</p>
                                    <div class="d-flex align-items-center gap-3">
                                        <i class="fa-solid fa-phone p-2 rounded-2"></i> 
                                        <p class="mb-0 gray-head note-phone-number">${contactsList[i].pNumber}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="middle-section">
                                <div class=" d-flex align-items-center mt-3">
                                    <i class="fa-solid fa-envelope p-2 rounded-2"></i>
                                    <p class="email-address mb-0 ms-4 gray-head">${contactsList[i].eAddress}</p>
                                </div>
                                <div class=" d-flex align-items-center mt-3">
                                    <i class="fa-solid fa-location-dot p-2 rounded-2"></i>
                                    <p class="physical-address mb-0 ms-4 gray-head">${contactsList[i].physicalAdres}</p>
                                </div>
                                <div class="d-flex align-items-center gap-4 mt-3 border-bottom pb-4">
                                    <p class="mb-0 text-capitalize p-2 rounded-3 ${contactsList[i].group}">${contactsList[i].group}</p>
                                    <p class="mb-0 text-capitalize heart-color heartemergencie p-2 rounded-3 ${contactsList[i].emer === true ? `d-block`: `d-none`} "><i class="fa-solid fa-heart-pulse"></i> emergancie</p>
                                </div>
                                <div class="bottom-section d-flex align-items-center justify-content-between pt-4">
                                    <div>
                                        <a class="py-3" href="tel:${contactsList[i].pNumber}"><i class="fa-solid hover-phone fa-phone friend pointer p-2 rounded-2"></i></a>
                                        <a class="py-3" href="mailto:${contactsList[i].eAddress}"><i class="fa-solid hover-mail fa-envelope pointer p-2 rounded-2"></i></a>
                                    </div>
                                    <div class="">
                                        <i onclick="changeFavorit(${i})" class="ms-3  pointer ${contactsList[i].fav === true ?  `fa-solid fa-star star-color`: `fa-regular fa-star gray-head`}  rounded-2 p-2"></i>
                                        <i onclick="changeemergancy(${i})" class="ms-3 pointer  ${contactsList[i].emer === true ? `fa-solid fa-heart-pulse heart-color heartemergencie heart_hover`: `fa-regular fa-heart gray-head inputs-effect heart-effect`}  p-2 rounded-2"></i>
                                        <i onclick="edit(${i})" class="ms-3 edit-contact gray-head pointer p-2 rounded-2 fa-solid fa-pen"></i>
                                        <i onclick="remove(${i})" class="ms-3 gray-head pointer p-2 rounded-2 fa-solid fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        contentNotes.innerHTML = tempNotes;

        if (contactsList[i].fav === true)
            {
                favoritesNumber++;
                favoritesPhones += `
                    <div class="top-section p-3 d-flex align-items-center justify-content-between friend-phone pointer my-3">
                        <div class="d-flex align-items-end">
                            <div class="photo-section w-fit">
        
                                ${ contactsList[i].image === '' ? 
                                    `<div class="w-fit p-3 rounded-3 ${tempArrName.length <= 2 ? `bg-heart` : tempArrName.length === 3 ? `bg-blue` : `bg-star` }">
                                        <p class="shortName text-uppercase text-white fw-bold fs-5 mb-0">${shortName}</p>
                                    </div>`
                                    :
                                    `
                                    <div class=" width-photo">
                                        <img class="person-photo rounded-3" src="./images/${contactsList[i].image}" alt="">
                                    </div>
                                    `
                                }
                            </div>
                            <div class="ps-4">
                                <p class="user-full-name mb-0 fw-bold pb-2">${contactsList[i].fullName.length > 19 ? contactsList[i].fullName.slice(0,20)+"...":contactsList[i].fullName}</p>
                                <div class="d-flex align-items-center gap-3">
                                    <p class="mb-0 gray-head note-phone-number">${contactsList[i].pNumber}</p>
                                </div>
                            </div>
                        </div>
                        <a href="tel:${contactsList[i].pNumber}"><i class="fa-solid friend fa-phone p-2 rounded-2"></i></a> 
                    </div>
                    `
            }                            
        document.querySelector(".fav-section").innerHTML = favoritesPhones;
        

        if(contactsList[i].emer === true)
        {
            emergancieNumber++;
            emrgencyPhones += `

            <div class="top-section p-3 d-flex align-items-center justify-content-between pointer my-3 emerg-section">
                <div class="d-flex align-items-end">
                    <div class="photo-section w-fit">
                        ${ contactsList[i].image === '' ? 
                            `<div class="w-fit p-3 rounded-3 ${tempArrName.length <= 2 ? `bg-heart` : tempArrName.length === 3 ? `bg-blue` : `bg-star` }">
                                <p class="shortName text-uppercase text-white fw-bold fs-5 mb-0">${shortName}</p>
                            </div>`
                            :
                            `
                            <div class=" width-photo">
                                <img class="person-photo rounded-3" src="./images/${contactsList[i].image}" alt="">
                            </div>
                            `
                        }
                    </div>
                    <div class="ps-4">
                        <p class="user-full-name mb-0 fw-bold pb-2">${contactsList[i].fullName.length > 19 ? contactsList[i].fullName.slice(0,20)+"...":contactsList[i].fullName}</p>
                        <div class="d-flex align-items-center gap-3">
                            <p class="mb-0 gray-head note-phone-number">${contactsList[i].pNumber}</p>
                        </div>
                    </div>
                </div>
                <a href="tel:+18001234567"><i class="fa-solid fa-phone emerg-phone p-2 rounded-2"></i></a> 
            </div>
            
            `
        }

        document.querySelector(".section-emer").innerHTML = emrgencyPhones;
    }

    totalNumber.innerHTML = contactsList.length;
    totalFavoriteNumber.innerHTML = favoritesNumber;
    totalEmergincyNumber.innerHTML = emergancieNumber;
    contactsNumber.innerHTML = contactsList.length;
}

function remove(num) {
    document.querySelector(".layOutDeleted").style.display = "block";
    document.querySelector(".delete").style.transform = "translate(-50%, -50%) scale(1)"; 
    document.querySelector(".delete").style.opacity = 1; 
    document.querySelector(".delete").style.zIndex = 3; 
    document.querySelector(".fa-circle-exclamation").style.transform = "scale(1)";
    
    document.querySelector(".confirm-cancel").onclick = function() {
        contactsList.splice(num,1);
        document.querySelector(".layOutDeleted").style.display = "none";
        document.querySelector(".delete").style.transform = "translate(-50%, -50%) scale(0)"; 
        document.querySelector(".delete").style.opacity = 0; 
        document.querySelector(".delete").style.zIndex = -1; 
        document.querySelector(".fa-circle-exclamation").style.transform = "scale(0)";
        window.localStorage.setItem("notes", JSON.stringify(contactsList));
        displayNotes();
    }


}

function search() 
{
    var tempNotes = [];

    for(var i=0; i<contactsList.length; i++)
        {
        if(contactsList[i].fullName.toLowerCase().includes(searchField.value) || contactsList[i].eAddress.toLowerCase().includes(searchField.value) || contactsList[i].pNumber.includes(searchField.value))
        {
            tempArrName = contactsList[i].fullName.split(" ");
            if (tempArrName.length === 1)
            {
                shortName = tempArrName[0][0];
            } else {
                shortName = tempArrName[0][0] + tempArrName[tempArrName.length-1][0];
            }
    
            tempNotes+= `<div class="p-3 col-md-6 col-12 ">
                            <div class=" bg-white p-3 rounded-4 box-shadow-boxes">
                                <div class="top-section d-flex align-items-end">
                                    <div class="photo-section ">
                                        ${ contactsList[i].image === '' ? 
                                            `<div class="w-fit p-3 rounded-3 ${contactsList[i].fav === true ? `star-icone`: ``} ${contactsList[i].emer === true ? `heart-icone`: ``} ${tempArrName.length <= 2 ? `bg-heart` : tempArrName.length === 3 ? `bg-blue` : `bg-star` } ">
                                                <p class="shortName text-uppercase text-white fw-bold fs-5 mb-0">
                                                    ${shortName}
                                                </p>
                                            </div>`
                                            :
                                            `<div class=" width-photo ${contactsList[i].fav === true ? `star-icone`: ``} ${contactsList[i].emer === true ? `heart-icone`: ``}">
                                                <img class="person-photo rounded-3" src=./images/${contactsList[i].image} alt="">
                                            </div>`
                                        }
                                    </div>
    
                                    <div class="ps-4">
                                        <p class="user-full-name mb-0 fw-bold pb-2">${contactsList[i].fullName.length > 20 ? contactsList[i].fullName.slice(0,20)+"..." : contactsList[i].fullName}</p>
                                        <div class="d-flex align-items-center gap-3">
                                            <i class="fa-solid fa-phone p-2 rounded-2"></i> 
                                            <p class="mb-0 gray-head note-phone-number">${contactsList[i].pNumber}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="middle-section">
                                    <div class=" d-flex align-items-center mt-3">
                                        <i class="fa-solid fa-envelope p-2 rounded-2"></i>
                                        <p class="email-address mb-0 ms-4 gray-head">${contactsList[i].eAddress}</p>
                                    </div>
                                    <div class=" d-flex align-items-center mt-3">
                                        <i class="fa-solid fa-location-dot p-2 rounded-2"></i>
                                        <p class="physical-address mb-0 ms-4 gray-head">${contactsList[i].physicalAdres}</p>
                                    </div>
                                    <div class="d-flex align-items-center gap-4 mt-3 border-bottom pb-4">
                                        <p class="mb-0 text-capitalize p-2 rounded-3 ${contactsList[i].group}">${contactsList[i].group}</p>
                                        <p class="mb-0 text-capitalize heart-color heartemergencie p-2 rounded-3 ${contactsList[i].emer === true ? `d-block`: `d-none`} "><i class="fa-solid fa-heart-pulse"></i> emergancie</p>
                                    </div>
                                    <div class="bottom-section d-flex align-items-center justify-content-between pt-4">
                                        <div>
                                            <a class="py-3" href="tel:${contactsList[i].pNumber}"><i class="fa-solid hover-phone fa-phone friend pointer p-2 rounded-2"></i></a>
                                            <a class="py-3" href="mailto:${contactsList[i].eAddress}"><i class="fa-solid hover-mail fa-envelope pointer p-2 rounded-2"></i></a>
                                        </div>
                                        <div class="">
                                            <i class="ms-3  pointer ${contactsList[i].fav === true ?  `fa-solid fa-star star-color`: `fa-regular fa-star gray-head`}  rounded-2 p-2"></i>
                                            <i class="ms-3 pointer  ${contactsList[i].emer === true ? `fa-solid fa-heart-pulse heart-color heartemergencie heart_hover`: `fa-regular fa-heart gray-head inputs-effect heart-effect`}  p-2 rounded-2"></i>
                                            <i onclick="edit(${i})" class="ms-3 edit-contact gray-head pointer p-2 rounded-2 fa-solid fa-pen"></i>
                                            <i onclick="remove(${i})" class="ms-3 gray-head pointer p-2 rounded-2 fa-solid fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }
                }
                
                contentNotes.innerHTML = tempNotes;
}



function edit(id) 
{
    addUpdateShowList();
    noteNumber=id;

    tempArrName = contactsList[id].fullName.split(" ");
    if (tempArrName.length === 1)
    {
        shortName = tempArrName[0][0];
    } else {
        shortName = tempArrName[0][0] + tempArrName[tempArrName.length-1][0];
    }

        document.querySelector(".avatar").innerHTML = `
        
                                    ${ contactsList[id].image === '' ? 
                                        `
                                        <div class="w-25 mx-auto  p-3 rounded-3 ${tempArrName.length <= 2 ? `bg-heart` : tempArrName.length === 3 ? `bg-blue` : `bg-star` } ">
                                            <p class="shortName text-uppercase text-white fw-bold fs-5 mb-0">
                                                ${shortName}
                                            </p>
                                        </div>
                                        `
                                        :
                                        `<div class=" ">
                                            <img class="w-25 person-photo rounded-3" src=./images/${contactsList[id].image} alt="">
                                        </div>`
                                    }
        
        `;
        userName.value = contactsList[noteNumber].fullName;
        phoneNumber.value = contactsList[noteNumber].pNumber;
        email.value = contactsList[noteNumber].eAddress;
        streetAdrees.value = contactsList[noteNumber].physicalAdres;
        formSelection.value = contactsList[noteNumber].group;
        notesBody.value = contactsList[noteNumber].notes;
        favorit = contactsList[noteNumber].fav;
        emergancy = contactsList[noteNumber].emer;

        save.classList.remove("d-block");
        save.classList.add("d-none");

        update.classList.add("d-block");
        update.classList.remove("d-none");
}

function updateNotes() {
    update.onclick = function () {

        if (noteNumber == null) return;

        var contact = contactsList[noteNumber];

        if (filePhoto.files.length > 0) {
            contact.image = filePhoto.files[0].name;
        }

        contact.fullName = userName.value;
        contact.pNumber = phoneNumber.value;
        contact.eAddress = email.value;
        contact.physicalAdres = streetAdrees.value;
        contact.group = formSelection.value;
        contact.notes = notesBody.value;
        contact.fav = favorit;
        contact.emer = emergancy;

        localStorage.setItem("notes", JSON.stringify(contactsList));
        displayNotes();
        clearInputs();

        console.log("Image updated correctly ✅");
    };
}

updateNotes();



function changeFavorit(id)
{
    if(contactsList[id].fav === true) contactsList[id].fav = false;
    else contactsList[id].fav = true;

    window.localStorage.setItem("notes", JSON.stringify(contactsList));
    displayNotes();
}

function changeemergancy(id)
{
    if(contactsList[id].emer === true) contactsList[id].emer = false;
    else contactsList[id].emer = true;

    window.localStorage.setItem("notes", JSON.stringify(contactsList));
    displayNotes();
}

// function validation(name,email,phoneNumber) 
// {
//     var testName = /^[A-Za-z0-9._-]{3,50}$/;
//     var testEmail = /^[A-Za-z0-9._-]{3,30}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     var testPhone =/^01[0125]\d{8}$/;

//     if(!testName.test(name))
//     {
//         document.querySelector(".name-warning").classList.remove("d-none");      
//         console.log("error");
//         return false; 
//     }
    
//     if(!testEmail.test(email))
//     {
//         document.querySelector(".mail-warning").classList.remove("d-none");      
//         console.log("error");
//         return false; 
//     }
    
//     if(!testPhone.test(phoneNumber))
//     {
//         document.querySelector(".phone-warning").classList.remove("d-none");      
//         console.log("error");
//         return false; 
//     }

    
//     return true;
// }


/* ============================================================ End Adding Contact */


/* ========================================================== Start Show layOut and adding nots list */


function addUpdateShowList() 
{
    document.querySelector(".layOut").style.zIndex = 1;
    document.querySelector(".layOut").style.opacity = 1;
    
    document.querySelector(".the-form").style.opacity = 1;
    document.querySelector(".the-form").style.zIndex = 10;
    document.querySelector(".the-form").style.top = "50%";
    document.querySelector("nav").style.zIndex=0;

}

addProduct.addEventListener("click",function(){
    addUpdateShowList();
    save.classList.remove("d-none");
    save.classList.add("d-block");

    update.classList.remove("d-block");
    update.classList.add("d-none");
});

save.addEventListener("click",function(){
    // if (validation(userName.value, email.value, phoneNumber.value)) {
        addContacts();
    // }
});


function cancelShowList () 
{
    document.querySelector(".layOut").style.zIndex = -10;
    document.querySelector(".layOut").style.opacity = 0;

    document.querySelector(".the-form").style.opacity = 0;
    document.querySelector(".the-form").style.zIndex = -2;
    document.querySelector(".the-form").style.top = "60%";
    document.querySelector("nav").style.zIndex=2;
}


closeDelete.addEventListener("click",function(){
    document.querySelector(".layOutDeleted").style.display = "none";
    document.querySelector(".delete").style.transform = "translate(-50%, -50%) scale(0)"; 
    document.querySelector(".delete").style.opacity = 0; 
    document.querySelector(".fa-circle-exclamation").style.transform = "scale(0)"; 
});

cancel.addEventListener("click",function(){
    cancelShowList ();
});

closePage.addEventListener("click",function(){
    cancelShowList ();
});

updateContact.addEventListener("click",function(){
    addUpdateShowList();
});

function clearInputs() 
{
        filePhoto.value = "";
        userName.value = "";
        phoneNumber.value = "";
        email.value = "";
        streetAdrees.value = "";
        formSelection.value = "";
        notesBody.value = "";
        favorit = false ;
        emergancy = false;
}
/* ========================================================== End Show layOut and adding nots list */




/* Form  */
document.querySelector(".the-form").addEventListener("submit", function(eInfo){
    eInfo.preventDefault();
})

