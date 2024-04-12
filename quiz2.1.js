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

/*CHANGE THE QUESTION UC 1*/
let questions = [
        {
            question: 'What is a LAN?',
            choice1: 'A network spanning multiple geographic areas',
            choice2: 'A network connecting computer in close proximity',
            choice3: 'A network used exclusively by business',
            choice4: 'A network exclusively for mainframes',
            answer: 2
        },
        {
            question: 'What is firmware?',
            choice1: 'Software installed on servers',
            choice2: 'Hardware integrated with software',
            choice3: 'Software for network security',
            choice4: 'Operating system software',
            answer: 2
        },
        {
            question: 'What is the main function of a network interface card (NIC)?',
            choice1: 'Control network traffic',
            choice2: 'Connect to the internet wirelessly',
            choice3: 'Connect a computer to a network',
            choice4: 'Monitor network bandwidth',
            answer: 3
        },
        {
            question: 'What is bandwidth?',
            choice1: 'Measurement of network size',
            choice2: 'Total maximum transfer rate of a network cable or device',
            choice3: 'Number of computer in a network',
            choice4: 'Type of network security protocol',
            answer: 2
        },
        {
            question: 'What does WAN stand for?',
            choice1: 'Wide Access Network',
            choice2: 'Wide Area Network',
            choice3: 'Wireless Area Network',
            choice4: 'Wired Access Network',
            answer: 2
        },
        {
            question: 'Which network is commonly used in school campuses and large companies with multiple buildings?',
            choice1: 'LAN',
            choice2: 'WAN',
            choice3: 'MAN',
            choice4: 'VPN',
            answer: 3
        },
        {
            question: 'What is broadcast information?',
            choice1: 'Information sent to a single receiver',
            choice2: 'Information sent to many receiver',
            choice3: 'Information sent via telephone lines',
            choice4: 'Information stored on a server',
            answer: 2
        },
        {
            question: 'What is broadband?',
            choice1: 'Slow internet connection',
            choice2: 'Fast internet connection',
            choice3: 'Type of network cable',
            choice4: 'Network security protocol',
            answer: 2
        },
        {
            question: 'What is the maximum length of a Cat 5 LAN cable?',
            choice1: '50 meters',
            choice2: '100 meters',
            choice3: '200 meters',
            choice4: '500 meters',
            answer: 2
        },
        {
            question: 'What is a client computer?',
            choice1: 'A computer used for server',
            choice2: 'A computer connected to a remote server',
            choice3: 'A computer used exclusively for network management',
            choice4: 'A computer used for server side processing',
            answer: 2
        },
        {
            question: 'What is the purpose of crimping tool?',
            choice1: 'To cut metal wires',
            choice2: 'To join two pieces of metal by deforming them',
            choice3: 'To bend metal into shapes',
            choice4: 'To solder metal components',
            answer: 2
        },
        {
            question: 'What is the primary material used in fiber optic cable?',
            choice1: 'Copper',
            choice2: 'Plastic',
            choice3: 'Glass',
            choice4: 'Aluminum',
            answer: 3
        },
        {
            question: 'What does gateway serve as in a network?',
            choice1: 'A central computer',
            choice2: 'An entry point another network',
            choice3: 'A dedicated server',
            choice4: 'A storage device',
            answer: 2
        },
        {
            question: 'Which network type does not have a central computer or dedicated server?',
            choice1: 'LAN',
            choice2: 'WAN',
            choice3: 'P2P',
            choice4: 'VPN',
            answer: 3
        },
        {
            question: 'Who coined the term “packet” to describe a segment of data sent over a network?',
            choice1: 'Tim Bervers Lee',
            choice2: 'Uint Cerf',
            choice3: 'Donald Davies',
            choice4: 'Bod Kahn',
            answer: 3
        },
        {
            question: 'What is the purpose of the WAN- ADD/Edit page?',
            choice1: 'To view WAN settings',
            choice2: 'To configure WAN settings',
            choice3: 'To delete WAN settings',
            choice4: 'To troubleshoot WAN connections',
            answer: 2
        },
        {
            question: 'Which network addressing modes are supported by the security appliance for IPV4?',
            choice1: 'DHCP client, Static IP, PPPoE, PPTP, and L2TP',
            choice2: 'DHCP server, Dynamic IP, PPPoE, IPsec and GRE',
            choice3: 'Static IP, DNS server, NAT, VPN, and VLAN',
            choice4: 'DHCP client, Dynamic IP, PPPoE, IPsec and GRE',
            answer: 1
        },
        {
            question: 'What does SLAAC stand for IPV6 Configuration?',
            choice1: 'State Less Address Auto Configuration',
            choice2: 'Secure Local Area Address Configuration',
            choice3: 'State Less IPv6 Auto-Assigned Configuration',
            choice4: 'Static Local Area Address Configuration',
            answer: 1
        },   
        
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 18

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
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
        }, 4000);
    });
});

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


startGame()