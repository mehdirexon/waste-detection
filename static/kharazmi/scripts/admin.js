const imageFrame = document.getElementById('image-frame');
const predicted_class_text = document.getElementById('predicted-class-text');
const current_time = document.getElementById('current-time');
const predicted_subclass_text = document.getElementById('predicted-subclass-text');
const categories = ["cardboard", "glass", "metal", "paper", "plastic", "trash"];
const detailed_categories = ["HDPE", "PETE", "green", "brown", "transparent", "colored", "white"];



var processedIDs = new Map(); // Changed to Map to track IDs with their categories

// Update the time in the header
function updateTime() {
    const now = new Date();
    current_time.innerText = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

updateTime();
setInterval(updateTime, 1000);

$(document).ready(function () {
    var isSidebarOpen = true;

    $(".sidebar").css("transform", "translateX(0)");
    $(".content").css("margin-left", "27rem");

    $(".toggle-button").click(function () {
        if (isSidebarOpen) {
            $(".sidebar").css("transform", "translateX(-26rem)");
            $(".content").css("margin-left", "2rem");
            isSidebarOpen = false;
        } else {
            $(".sidebar").css("transform", "translateX(0)");
            $(".content").css("margin-left", "27rem");
            isSidebarOpen = true;
        }
    });
});

class AdminSocket {
    constructor() {
        this.connect(); // Initial connection
    }

    connect() {
        this.socket = new WebSocket('ws://' + window.location.host + '/ws/real_time/');
        this.bindEventListeners();
    }

    onopen(event) {
        console.log('WebSocket (Admin) connection opened');
    }

    onmessage(event) {
        const data = JSON.parse(event.data);
        imageFrame.src = 'data:image/jpeg;base64,' + data['outputs']['image'];

        const class_label = data['outputs']['class'];
        const subclass_label = data['outputs']['subclass'];

        const class_label_parts = class_label.split(' ');
        const subclass_label_parts = subclass_label.split(' ');


        const classIndex = categories.indexOf(class_label_parts[0]);
        const subClassIndex = detailed_categories.indexOf(subclass_label_parts[0]);

        predicted_class_text.textContent = class_label_parts[0];
        predicted_subclass_text.textContent = subclass_label_parts[0];




        if (isNaN(class_label_parts[2])) {
            console.log('Invalid tracker ID:', class_label_parts[2]);
            return;
        }

        // Check if the ID already exists
        if (processedIDs.has(class_label_parts[2])) {
            return;
        }

        // If the ID is new, add it to the map and increment the category count
        processedIDs.set(class_label_parts[2], class_label_parts[0]);


        if (classIndex !== -1) {

            GeneralChart.data.datasets[0].data[classIndex] += 1;
            DetailedChart.data.datasets[0].data[subClassIndex] += 1;
            PieChart.data.datasets[0].data[classIndex] += 1;
            GeneralChart.update();
            DetailedChart.update();
            PieChart.update();
        }
        PieChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0];
    }

    onerror(event) {
        console.error('WebSocket (Admin) error:', event);
    }

    onclose(event) {
        console.log('WebSocket (Admin) connection closed. Trying to reconnect in 3 seconds!');
        setTimeout(() => {
            this.connect();
        }, 3000); // Retry after 3 seconds
    }

    send(data) {
        this.socket.send(JSON.stringify(data));
    }

    bindEventListeners() {
        this.socket.addEventListener('open', this.onopen.bind(this));
        this.socket.addEventListener('message', this.onmessage.bind(this));
        this.socket.addEventListener('error', this.onerror.bind(this));
        this.socket.addEventListener('close', this.onclose.bind(this));
    }
}

const adminSocket = new AdminSocket();

// Create the chart
const generalChart = document.getElementById('general-chart').getContext('2d');
const detailedChart = document.getElementById('detailed-chart').getContext('2d');
const pieChart = document.getElementById('pie-chart').getContext('2d');

let pieChartData = [0, 0, 0, 0, 0, 0];
const pie_chart =  {
    type: 'polarArea',
    data: {
        labels: categories,
        datasets: [{
            data: pieChartData,
            backgroundColor:
                [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0 // Disable initial animation
        }
    }
};

var generalChartData = [0, 0, 0, 0, 0, 0];
const general_chart = {
    type: 'bar',
    data: {
        labels: categories,
        datasets: [{
            label: 'General Wastes',
            data: generalChartData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: '#333', // Change font color
                    fontFamily: 'Poppins' // Change font family
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.1)' // Change grid line color
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: '#333', // Change font color
                    fontFamily: 'Poppins' // Change font family
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0)' // Hide x-axis grid lines
                }
            }]
        },
        legend: {
            labels: {
                fontColor: '#333', // Change legend font color
                fontFamily: 'Poppins' // Change legend font family
            }
        }
    }
};

var detailedChartData = [0, 0, 0, 0, 0, 0];
const detailed_chart = {
    type: 'bar',
    data: {
        labels: detailed_categories,
        datasets: [{
            label: 'Detailed Wastes',
            data: detailedChartData,
            backgroundColor: [
                'rgba(153, 102, 255, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: '#333', // Change font color
                    fontFamily: 'Poppins' // Change font family
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.1)' // Change grid line color
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: '#333', // Change font color
                    fontFamily: 'Poppins' // Change font family
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0)' // Hide x-axis grid lines
                }
            }]
        },
        legend: {
            labels: {
                fontColor: '#333', // Change legend font color
                fontFamily: 'Poppins' // Change legend font family
            }
        }
    }
};

const GeneralChart = new Chart(generalChart, general_chart);
const DetailedChart = new Chart(detailedChart, detailed_chart);
const PieChart = new Chart(pieChart, pie_chart);

