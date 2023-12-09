recommended_list = [];

function onLoadPage() {
    let option = localStorage.getItem('selectedOption');
    if (option == 'guide') {
        let startPoint = document.getElementById("startPoint_div");
        startPoint.remove();
        let title = document.title;
        title = "Tourist guide";
    }
}
let counter = 2;
function imgSwitcher() {
    if (counter == 6)
        counter = 1;
    let image = document.getElementById('album');
    image.style.opacity = 0;
    setTimeout(function () {
        image.style.opacity = 1;
        image.src = `../img/random_images/background${counter}.jpg`;
        counter += 1;
    }, 750);
}

let submitButton = document.getElementById("submit_div").getElementsByTagName("button")[0];

submitButton.addEventListener('click', function () {
    const url = 'http://localhost:4000/locations';

    const body = {};
    body["start_point"] = document.getElementById("startPoint_div").getElementsByTagName("textarea")[0].value;
    body["interests"] = document.getElementById("interests_div").getElementsByTagName("textarea")[0].value;
    body["budget"] = document.getElementById("budget_div").getElementsByTagName("textarea")[0].value;
    body["categories"] = [];
    for (let cat of document.getElementById("categories_div").getElementsByTagName("input"))
        if (cat.checked)
            body["categories"].push(cat.value);
    body["trip_length"] = document.getElementById("time_div").getElementsByTagName("input")[0].value;

    const input = document.getElementById('photo');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            body["base64"] = e.target.result.split(',')[1];
            // popravit upload slike
        };

        reader.readAsDataURL(file);
    }

    console.log(body);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);

            recommended_list = data;
            let container = document.getElementById("card-container");
            for (let i = 0; i < data.length; i++) {
                console.log("ADDING CARD");
                const locationCard = document.createElement('div');
                locationCard.classList.add('location-card');

                // Image
                const imageDiv = document.createElement('div');
                const image = document.createElement('img');
                image.src = data[i]["image"]; // Replace with the actual image URL
                image.alt = data[i]["LocationName"];
                imageDiv.appendChild(image);
                locationCard.appendChild(imageDiv);

                // Button
                const buttonDiv = document.createElement('div');
                const button = document.createElement('input');
                button.type = 'button';
                button.value = 'GENERATE PLAN';
                buttonDiv.appendChild(button);
                locationCard.appendChild(buttonDiv);

                // Title
                const titleDiv = document.createElement('div');
                const title = document.createElement('p');
                title.textContent = data[i]["LocationName"];
                titleDiv.appendChild(title);
                locationCard.appendChild(titleDiv);

                // Description
                const descriptionDiv = document.createElement('div');
                const description = document.createElement('p');
                description.textContent = data[i]["Description"];
                descriptionDiv.appendChild(description);
                locationCard.appendChild(descriptionDiv);

                container.appendChild(locationCard);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

});

window.onLoad = onLoadPage();
setInterval(imgSwitcher, 4000);