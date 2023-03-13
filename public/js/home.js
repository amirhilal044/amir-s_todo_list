const plus_btn = document.querySelector(".plus-button");
const _form = document.querySelector("form");
const text_field = document.querySelector(".text-field")


function mover_content() {
    plus_btn.style.transform = "translate(100%, 0px)";
    text_field.style.width = "100px";
}

function mover_clear() {

    if (text_field === document.activeElement) {
        // Get a reference to the specific div
        const specificDiv = document.querySelector('.add_box');
        // Add a click event listener to the document object
        document.addEventListener('click', function (event) {
            // Check if the clicked element is inside the specific div
            if (!specificDiv.contains(event.target)) {
                
                // The click is outside the specific div, do something here
                plus_btn.style.transform = "translate(0%, 0px)";
                text_field.style.width = "20px";
                text_field.value ="";
            }
        });
    } else {
        plus_btn.style.transform = "translate(0%, 0px)";
        text_field.style.width = "20px";
        text_field.value = "";
    }
}


const editBtn = document.querySelectorAll('.edit_name');
const deleteBtn = document.querySelectorAll('.delete_name');

const modal_edit = document.querySelectorAll('.modal_1');
const cancelBtnEdit = document.querySelectorAll('.cancel-btn-edit');

const modal_delete = document.querySelectorAll('.modal_2');
const cancelBtnDelete = document.querySelectorAll('.cancel-btn-delete');

for(let i =0; i < editBtn.length; i++){
    editBtn[i].addEventListener('click', () => {
        modal_edit[i].style.display = 'block';
    });

    cancelBtnEdit[i].addEventListener('click', () => {
        modal_edit[i].style.display = 'none';
    });


    deleteBtn[i].addEventListener('click', () => {
        modal_delete[i].style.display = 'block';
    });

    cancelBtnDelete[i].addEventListener('click', () => {
        modal_delete[i].style.display = 'none';
    });
}
//fix this
// function validateForm() {
//     var input = document.getElementById("edited_name").value;
//     if (input === "") {
//         alert("Please fill out the input field.");
//         return false;
//     } else {
//         document.forms[0].submit();
//     }
// }

function redirectToNewPage(title) {
    let lowercaseString = title.toLowerCase();

    // Redirect to the new EJS file passing in the title as a query parameter
    window.location.href = "/home/" + encodeURIComponent(lowercaseString);
}
