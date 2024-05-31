const imageFrame = document.getElementById('image-frame');
const predicted_class_text = document.getElementById('predicted-class-text');
const current_time = document.getElementById('current-time');
const predicted_subclass_text = document.getElementById('predicted-subclass-text');
const categories = ["cardboard", "glass", "metal", "paper", "plastic", "trash"];

var counts = [0, 0, 0, 0, 0, 0];
var processedIDs = new Set();

// update the time in the header
function updateTime() {
    const now = new Date();
    current_time.innerText = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

updateTime();
setInterval(updateTime, 1000);

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
        predicted_class_text.textContent = data['outputs']['class'];
        predicted_subclass_text.textContent = data['outputs']['subclass'];

        const class_name = data['outputs']['class'].slice(0, -6).trim();
        const tracker_id = data['outputs']['class'].slice(-2).trim();

        // Debug mode
        console.log(class_name, tracker_id);

        // Update the chart only if the ID is new
        if (!processedIDs.has(tracker_id)) {
            processedIDs.add(tracker_id);
            const itemIndex = categories.indexOf(class_name);
            if (itemIndex !== -1) {
                myChart.data.datasets[0].data[itemIndex] += 1;
                myChart2.data.datasets[0].data[itemIndex] += 1;
                myChart.update();
                myChart2.update();
            }
        }
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
const ctx = document.getElementById('chart').getContext('2d');
const ctx2 = document.getElementById('chart2').getContext('2d');

const chartConfig = {
    type: 'bar',
    data: {
        labels: categories,
        datasets: [{
            label: 'Number of wastes',
            data: counts,
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

const myChart = new Chart(ctx, chartConfig);
const myChart2 = new Chart(ctx2, chartConfig);
