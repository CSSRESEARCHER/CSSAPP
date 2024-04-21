const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choices-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

/*CHANGE THE QUESTION UC 2*/
let questions = [
    {
        question: 'A group of interconnected computers called?',
        choice1: 'Network',
        choice2: 'Server',
        choice3: 'Workgroup',
        choice4: 'Sharing',
        answer: 1
    },
    {
        question: 'The smallest type of network',
        choice1: 'Local Area Network',
        choice2: 'Metropolitan Area Network',
        choice3: 'Wide Area Network',
        choice4: 'All of the above',
        answer: 1
    },
    {
        question: 'A powerful computer whose sole purpose is to serve network clients',
        choice1: 'Host',
        choice2: 'Peers',
        choice3: 'Network Server',
        choice4: 'Workstation',
        answer: 3
    },
    {
        question: 'What are the criteria a network must meet?',
        choice1: 'Reliability, Scalability, Security',
        choice2: 'Performance, Availability, Affordability',
        choice3: 'Performance, Reliability, Scalability',
        choice4: 'Efficiency, Timeliness, Accuracy',
        answer: 3
    },
    {
        question: 'What is the primary function of a transmitter in data communication?',
        choice1: 'To receive incoming data',
        choice2: 'To convert data into electromagnetic signals',
        choice3: 'To manage the destination device',
        choice4: 'To encode data into binary format',
        answer: 2
    },
    {
        question: 'Which model is commonly used for doing business with consumers over the Internet?',
        choice1: 'Client-Server model',
        choice2: 'Point-to-Point Connection model',
        choice3: 'Multipoint Connection model',
        choice4: 'e-commerce model',
        answer: 4
    },
    {
        question: 'Which network topology forms a ring, where each computer is connected to another computer, with the last one connected to the first?',
        choice1: 'Bus Topology',
        choice2: 'Ring Topology',
        choice3: 'Star Topology',
        choice4: 'Mesh Topology',
        answer: 2
    },
    {
        question: 'What type of topology is a mixture of two or more different types of topologies?',
        choice1: 'Mesh Topology',
        choice2: 'Tree Topology',
        choice3: 'Hybrid Topology',
        choice4: 'Star Topology',
        answer: 3
    },
    {
        question: 'What is the primary purpose of twisting the conductors in twisted pair cabling?',
        choice1: 'To increase electromagnetic interference',
        choice2: 'To decrease crosstalk between lines',
        choice3: 'To decrease signal transmission speed',
        choice4: 'To increase signal distortion',
        answer: 2
    },
    {
        question: 'What is the difference between shielded twisted pair (STP) and unshielded twisted pair (UTP) cables?',
        choice1: 'STP cables have no shielding, while UTP cables have overall foil shielding',
        choice2: 'STP cables are surrounded by shielding to prevent electromagnetic interference, while UTP cables are not',
        choice3: 'STP cables are typically used for indoor telephone applications, while UTP cables are used for outdoor telephone applications',
        choice4: 'STP cables use RJ45 connectors, while UTP cables use RJ11 connectors',
        answer: 2
    },
    {
        question: 'What is the primary function of a patch panel in a network configuration?',
        choice1: 'To deliver data communication to various electronic systems',
        choice2: 'To provide a dedicated, full-time connection to a network',
        choice3: 'To connect and route circuits for monitoring, interconnecting, and testing',
        choice4: 'To implement physical layer circuitry necessary for communicating with a data link layer standard',
        answer: 3
    },
    {
        question: 'Which type of NIC provides network connections through a device plugged into the USB port?',
        choice1: 'Wireless NIC',
        choice2: 'Wired NIC',
        choice3: 'USB NIC',
        choice4: 'Fiber optics NIC',
        answer: 3
    },
    {
        question: 'What is the purpose of the MAC address assigned to a NIC?',
        choice1: 'To determine the speed rating of the NIC',
        choice2: 'To provide data transmission control',
        choice3: 'To deliver Ethernet packets to the computer',
        choice4: 'To notify the user when data transmission occurs',
        answer: 3
    },
    {
        question: 'When setting up a static IP address on Windows 10, what is the purpose of this configuration?',
        choice1: 'To establish a dedicated, full-time connection to a network',
        choice2: 'To enable communication between a computer and other devices',
        choice3: 'To assign a unique, unchangeable media access control address',
        choice4: 'To specify a fixed IP address for the computer on the network',
        answer: 4
    },
    {
        question: 'How does a router contribute to network configuration?',
        choice1: 'By providing data transmission control between devices',
        choice2: 'By implementing physical layer circuitry for communication',
        choice3: 'By connecting computers to a network with an Ethernet cable',
        choice4: 'By enabling communication between a computer and other devices on the network',
        answer: 4
    },
    {
        question: 'What is the main function of a router?',
        choice1: 'Connects printers to the network',
        choice2: 'Connects a local network to the internet and routes data between different networks based on their IP addresses',
        choice3: 'Provides security for network devices',
        choice4: 'Controls the speed of internet connection',
        answer: 2
    },
    {
        question: 'How does a router determine where to send data packets?',
        choice1: 'By inspecting the color of the data packets',
        choice2: 'By checking the destination MAC address',
        choice3: 'By inspecting the IP address of incoming data packets',
        choice4: 'By analyzing the data payload of the packets',
        answer: 3
    },
    {
        question: 'What is the purpose of resetting a router?',
        choice1: 'To upgrade its firmware',
        choice2: 'To restore it to its default settings and clear any previous configurations',
        choice3: 'To increase its speed',
        choice4: 'To block unwanted devices from accessing the network',
        answer: 2
    },
    {
        question: 'What type of cable is typically used to connect a computer to a router?',
        choice1: 'Coaxial cable',
        choice2: 'Fiber optic cable',
        choice3: 'RJ45 cable (UTP cable)',
        choice4: 'HDMI cable',
        answer: 3
    },
    {
        question: 'What step follows after plugging in the LAN cable from the router to the internet service provider port?',
        choice1: 'Turn off the router',
        choice2: 'Configure the router',
        choice3: 'Install antivirus software',
        choice4: 'Connect a printer to the router',
        answer: 2
    },
    {
        question: 'What is the purpose of inspecting and testing configured computer networks?',
        choice1: 'To install new software',
        choice2: 'To identify and resolve network issues',
        choice3: 'To upgrade hardware components',
        choice4: 'To clean the computer\'s casing',
        answer: 2
    },
    {
        question: 'What are some common tools used for inspecting and testing computer networks?',
        choice1: 'Screwdriver and hammer',
        choice2: 'Antivirus software',
        choice3: 'Ping and traceroute commands',
        choice4: 'Paintbrush and ruler',
        answer: 3
    },
    {
        question: 'What does the "ping" command do?',
        choice1: 'Measures the speed of internet connection',
        choice2: 'Sends packets of data to a specific network device and measures the response time',
        choice3: 'Checks for software updates',
        choice4: 'Cleans temporary files from the computer',
        answer: 2
    },
    {
        question: 'How can traceroute be helpful in network troubleshooting?',
        choice1: 'By displaying a map of nearby network devices',
        choice2: 'By identifying the physical location of a network server',
        choice3: 'By showing the path that data takes from the local computer to a specified destination',
        choice4: 'By blocking unwanted network traffic',
        answer: 3
    }   
        
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 25

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end2.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions [questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion ['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}



/* FAST CLICK*/

const choiceContainers = document.querySelectorAll('.choice-container');

choiceContainers.forEach(choiceContainer => {
    choiceContainer.addEventListener('click', () => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = choiceContainer.querySelector('.choices-text');
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


startGame()