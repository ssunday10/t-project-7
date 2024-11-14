const alertBanner = document.getElementById("alert");
const bell = document.querySelector('.bell-icon');



bell.addEventListener("click", () => {
    const tooltip = document.querySelector('.tooltip span');
    tooltip.style.visibility = "visible";
});


function button() {
    const button = document.querySelector('.tooltip span');
    if(button.style.display === "none"){
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}


alertBanner.innerHTML = `<div class="alert-banner">
<p><strong>Alert:</strong> You have unread messages</p>
<p class="alert-banner-close">x</p>
</div>`

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if ( element.classList.contains("alert-banner-close")){
        alertBanner.style.display = "none";
    }
});



// Traffic Chart: Daily / Weekly & Monthly

let trafficCanvas = document.getElementById('traffic-chart');
let trafficData = {

    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],

    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        tension: 0.3,
    }]

};


const hourly = [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250,1500, 2500];

const daily = [1000, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 5000, 4500];

const weekly = [1000, 2000, 3000, 4000, 5000, 6000, 5000, 4000, 3000, 2000, 1000];

const monthly = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 8000, 5000];


function timeFrame(period){
    console.log(period);

    if(period == 'hourly'){
        trafficChart.data.datasets[0].data = hourly;
    } else if(period == 'daily') {
        trafficChart.data.datasets[0].data = daily;
    } else if(period == 'weekly'){
        trafficChart.data.datasets[0].data = weekly;
    } else if(period == 'monthly'){
        trafficChart.data.datasets[0].data = monthly;
    }
    trafficChart.update();
};



let trafficOptions = {
    backgroundColor: "rgba(112, 104, 201, .5)",
    fill: true,
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        y: {
            beginAtZero: true
        }
    },
};



let trafficChart = new Chart(trafficCanvas, {
    type: "line",
    data: trafficData,
    options: trafficOptions
});


//Daily Traffic Area
const dailyCanvas = document.getElementById("daily-chart");
const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }]
};

const dailyOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};


let dailyChart = new Chart(dailyCanvas, {
    type:'bar',
    data: dailyData,
    options: dailyOptions
});


const mobileCanvas = document.getElementById("mobile-doughnut-chart");
const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: '# of Users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    }]
};


const mobileOptions = {
    aspectRatio: 1.9,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 20,
                fontStyle: 'bold'
            }
        }
    }
};


let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});


// MESSAGE USER AREA


const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
send.addEventListener('click', (event) => {
    event.preventDefault();
    if (user.value === "" && message.value === ""){
        alert("Please fill out user and message fields before sending");
    } else if (user.value === "") {
        alert("Please make sure you fill in the user field");
    } else if (message.value === ""){
        alert("Please fill in the message field before sending");
    } else {
        alert(`Message successfully sent to: ${user.value}`);
    }
});




// Variables

function setValues() {
    // email toggle
    const emailToggle = localStorage.getItem("email");

    // profile toggle
    const profileToggle = localStorage.getItem("profilePublic");

    // Timezone list
    const timeZone = localStorage.getItem("timezone");

    document.getElementById("email").checked = emailToggle;
    document.getElementById("Profile-To-Public").checked = profileToggle;
    document.getElementById("timezone").value = timeZone;
}

setValues();

let email = document.querySelector("#email");
let profilePublic = document.querySelector("#Profile-To-Public");
let timezone = document.querySelector("#timezone");
let save = document.querySelector("#save");


// Setting the local storage with setItem() method.
save.addEventListener('click', (e) => {
    const save = document.querySelector('#save');
    localStorage.setItem('email', JSON.stringify(email.checked));
    localStorage.setItem('profilePublic', JSON.stringify(profilePublic.checked));
    localStorage.setItem('timezone', timezone.value);
    console.log(localStorage);
});


// This is the 'press the cancel button to clear local storage'.
cancel.addEventListener('click', (e) => {
    const cancel = document.getElementById('#cancel');
    let emailToggle = document.getElementById('#email');
    let profileToggle = document.getElementById('#Profile-To-Public');
    let timezoneToggle = document.getElementById('#timezone');

    localStorage.removeItem('email');
    localStorage.removeItem('profilePublic');
    localStorage.removeItem('timezone');
    

    emailToggle.checked = false;
    profileToggle.checked = false;
    timezoneToggle.value = 'Default';
});




const trafficNav = document.querySelector('.traffic-nav');

trafficNav.addEventListener('click', (e) => {
  if (e.target.classList.contains('hourly')) {
    timeFrame('hourly');
  }

  if (e.target.classList.contains('daily')) {
    timeFrame('daily');
  }

  if (e.target.classList.contains('weekly')) {
    timeFrame('weekly');
  }

  if (e.target.classList.contains('monthly')) {
    timeFrame('monthly');
  }
});