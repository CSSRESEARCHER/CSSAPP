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
        question: 'What measures should be taken to ensure safety when installing computer systems and networks?',
        choice1: 'Checking power connectors and voltage for each device',
        choice2: 'Using proper screwdrivers for each component',
        choice3: 'Discharging static electricity before handling components',
        choice4: 'Ensuring proper ventilation for the equipment',
        answer: 3
    },
    {
        question: 'What device test network connection?',
        choice1: 'Soldering pencil',
        choice2: 'Desoldering tool',
        choice3: 'LAN tester',
        choice4: 'Flashlight',
        answer: 3
    },
    {
        question: 'What instrument measure current voltage and resistance?',
        choice1: 'LAN tester',
        choice2: 'Anti-Static wrist wrap',
        choice3: 'Volt- Ohms- Millimeter (VOM)',
        choice4: 'Desoldering tool',
        answer: 3
    },
    {
        question: 'What considerations should be made when selecting a computer case for a new system build?',
        choice1: 'Choosing between desktop and tower form factors',
        choice2: 'Understanding the various terms used to refer to computer cases',
        choice3: 'Evaluating the size and layout of the case form factor',
        choice4: 'All of the above',
        answer: 4
    },
    {
        question: 'What is the purpose of the parallel port (printer port) on a computer\'s back panel?',
        choice1: 'Connecting external devices such as printers',
        choice2: 'Supporting bi-directional communications',
        choice3: 'Transmitting data serially',
        choice4: 'Enabling hot-swapping of peripherals',
        answer: 1
    },
    {
        question: 'Which port allows communication on a network that runs Transmission Control Protocol/Internet Protocol (TCP/IP)?',
        choice1: 'USB port',
        choice2: 'Serial port (COM port)',
        choice3: 'Monitor port / VGA',
        choice4: 'Ethernet port',
        answer: 4
    },
    {
        question: 'What is the primary function of the CPU in a computer system?',
        choice1: 'Managing hardware components',
        choice2: 'Cooling electronic components',
        choice3: 'Processing data and instructions',
        choice4: 'Providing memory storage',
        answer: 3
    },
    {
        question: 'Which type of memory is volatile and erased when the computer is powered off?',
        choice1: 'ROM (Read only Memory)',
        choice2: 'Cache Memory',
        choice3: 'RAM (Random Access Memory)',
        choice4: 'SRAM (Static Random-Access Memory)',
        answer: 3
    },
    {
        question: 'What is the function of a graphic card?',
        choice1: 'Storing files',
        choice2: 'Processing visual data',
        choice3: 'Performing calculations',
        choice4: 'Managing network connection',
        answer: 2
    },
    {
        question: 'What does USB stand for?',
        choice1: 'Universal Serial Bus',
        choice2: 'Ultra speedy bandwidth',
        choice3: 'Unified software bridge',
        choice4: 'Unrestricted software bridge',
        answer: 1
    },
    {
        question: 'What utility is commonly used to format and create bootable USB flash drives?',
        choice1: 'Windows File Allocation Table (FAT)',
        choice2: 'Rufus',
        choice3: 'ISO image file',
        choice4: 'NTFS (NT file system)',
        answer: 2
    },
    {
        question: 'Which file system does Windows NT operating system primarily use for storing and retrieving files on a hard disk?',
        choice1: 'Master Boot Record (MBR)',
        choice2: 'File Allocation Table (FAT)',
        choice3: 'GUID Partition Table (GPT)',
        choice4: 'New Technology File System (NTFS)',
        answer: 4
    },
    {
        question: 'What is the maximum theoretical limit of disk size supported by the GUID Partition Table (GPT) format?',
        choice1: '2 terabytes (TB)',
        choice2: '256 terabytes (TB)',
        choice3: '9.4 zettabytes (ZB)',
        choice4: '10 billion terabytes',
        answer: 3
    },
    {
        question: 'What is an ISO image file primarily used for?',
        choice1: 'Storing audio files',
        choice2: 'Duplicating the contents of a CD or DVD',
        choice3: 'Organizing software programs',
        choice4: 'Creating video files',
        answer: 2
    },
    {
        question: 'What is the function of an operating system?',
        choice1: 'Managing computer hardware',
        choice2: 'Providing user interface',
        choice3: 'Running programs',
        choice4: 'All of the above',
        answer: 4
    },
    {
        question: 'Which type of user interface utilizes typewritten commands for executing tasks?',
        choice1: 'Graphical User Interface (GUI)',
        choice2: 'Command Line Interface (CLI)',
        choice3: 'Desktop Interface',
        choice4: 'Object Linking and Embedding (OLE)',
        answer: 2
    },
    {
        question: 'How does the operating system manage hardware?',
        choice1: 'By directly controlling hardware components',
        choice2: 'By acting as a facilitator between programs and hardware',
        choice3: 'By organizing files and folders',
        choice4: 'By providing user interface options',
        answer: 2
    },
    {
        question: 'What function does a device driver serve in the context of the operating system?',
        choice1: 'Providing a graphical user interface',
        choice2: 'Managing hardware resources',
        choice3: 'Enabling communication between hardware devices and the operating system',
        choice4: 'Organizing files and folders',
        answer: 3
    },
    {
        question: 'How can users locate software or drivers for their computer hardware?',
        choice1: 'By checking the hardware manufacturer\'s website or CD provided with the computer',
        choice2: 'By contacting their internet service provider',
        choice3: 'By searching for them on social media platforms',
        choice4: 'By consulting online forums for recommendations',
        answer: 1
    },
    {
        question: 'Which hardware device drivers are recommended to be updated for improving computer performance and stability?',
        choice1: 'Printer drivers and firmware',
        choice2: 'Monitor drivers',
        choice3: 'Keyboard drivers',
        choice4: 'All of the above',
        answer: 4
    },
    {
        question: 'What is a limitation of the Master Boot Record (MBR) partition table format?',
        choice1: 'It allows for only one primary partition',
        choice2: 'It limits the size of disks to 2TB',
        choice3: 'It supports up to 256TB of disk space',
        choice4: 'It is a newer technology introduced in the 2000s',
        answer: 2
    },
    {
        question: 'What is the primary function of antivirus software?',
        choice1: 'Preventing, scanning, detecting, and deleting viruses from a computer',
        choice2: 'Optimizing computer performance',
        choice3: 'Managing software updates',
        choice4: 'Enhancing internet speed',
        answer: 1
    },
    {
        question: 'What does antivirus software typically provide in terms of protection?',
        choice1: 'Real-time scanning',
        choice2: 'Automatic software updates',
        choice3: 'Device optimization',
        choice4: 'Internet speed enhancement',
        answer: 1
    },
    {
        question: 'What are some common steps involved in installing antivirus software?',
        choice1: 'Downloading the software, updating settings, and configuring for best results',
        choice2: 'Uninstalling conflicting apps, checking email, and browsing the web',
        choice3: 'Updating social media profiles, playing games, and watching videos',
        choice4: 'None of the above',
        answer: 1
    },
    {
        question: 'What is Microsoft Office primarily used for?',
        choice1: 'Protecting against viruses',
        choice2: 'Enhancing computer security',
        choice3: 'Increasing internet speed',
        choice4: 'Desktop productivity applications for business use',
        answer: 4
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

        return window.location.assign('end1.html')
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