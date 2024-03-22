const quizArray = [
    new Quiz('Quiz z wiedzy ogólnej'),
    new Quiz('Quiz z wiedzy specjalistycznej'),
];

const results = new Results();

// const quizWiedzaOgolna = new Quiz('Quiz z wiedzy ogólnej');
quizArray[0].addQuestion(new Question('Jakie miasto jest stolicą Szwecji?', 'open-endedQuestion', null, 'Sztokholm', ['Stockholm', 'Sztockholm'], 'Wpisz jeden wyraz. Wielkość liter nie ma znaczenia'))
quizArray[0].addQuestion(new Question('Najwyższy szczyt Alp i Europy to:', 'closed-endedQuestion', ['Matterhorn', 'Mont Blanc', 'Mount Everest', 'Mont Blanc de Courmayeur'], '1', null, 'Wybierz poprawną odpowiedź'))

quizArray[1].addQuestion(new Question('Więcej niż jedno zwierzę to:', 'open-endedQuestion', null, 'stado', ['satdo', 'sttado'], 'Wpisz jeden wyraz. Wielkość liter nie ma znaczenia'))

let newQuestions = [];

const themeButton = document.querySelector('#theme');
let theme = 'light';


themeButton.addEventListener('click', () => {
    if (theme === 'light') {
        themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
        theme = 'dark';
        
        const root = document.querySelector(':root');
        root.style.setProperty('--main', '#141516');
        root.style.setProperty('--second', '#f1f1f1');
        root.style.setProperty('--white', '#000');
        root.style.setProperty('--black', '#fff');
    } else {
        themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        theme = 'light';

        const root = document.querySelector(':root');
        root.style.setProperty('--main', '#f1f1f1');
        root.style.setProperty('--second', '#141516');
        root.style.setProperty('--black', '#000');
        root.style.setProperty('--white', '#fff');
    }
})


// obsługa nav
const navButtons = document.querySelectorAll('nav .ulNavBar li');
navButtons.forEach(element => {
    element.addEventListener('click', function() {
        // console.log(this.dataset.action)
        openTab(this.dataset.action)
    })
})

function openTab(tab) {
    if (inQuiz) {
        document.querySelector('section#quizContent').style.display = 'none';
        inQuiz = false;
        $('footer').show();
    }

    if (tab === 'mainPage') {
        $('main').find('*').hide();
        $('main div.mainPage').show().find('*').show();
        const header = document.querySelector('header');
        header.scrollIntoView({ behavior: 'smooth' });

        return;
    }

    if (tab === 'quizzes') {
        $('main').find('*').hide();
        $('main div.mainPage').show().find('*').show();
        const sectionElement = document.querySelector('section.quizzes');
        sectionElement.scrollIntoView({ behavior: 'smooth' });

        return;
    }

    if (tab === 'yourScores') {
        yourScores();
    }

    if (tab === 'createQuiz') {
        questionNumber = 0;
        addQuestion();
        newQuestions = [];
        $('form div.text').html('');
        $('form input[type="text"]').val('');
    }

    $('main').find('*').hide();
    $('#' + tab).show().find('*').show();
}

var questionNumber = 0;

function addQuestion() {
    const questions = document.querySelector('.questions');
    if (questionNumber == 0) {
        questions.innerHTML = ``;
    }
    questionNumber++;
    $('.questions').html(`
        <div class="addingQuestion">
            <div class="questionNumber">Pytanie nr&nbsp;<span class="questNo">${questionNumber}</span></div>
            <input type="text" name="question" placeholder="Treść pytania">
            <input type="text" name="additionalInformation" placeholder="Informacje dodatkowe">
            <div class="type">
                <div><input type="radio" name="questionType" value="closed-endedQuestion"><span>Zamknięte</span></div>
                <div><input type="radio" name="questionType" value="open-endedQuestion"><span>Otwarte</span></div>
            </div>
            <div class="answerBox"></div>
            <div class="addAnswer"></div>
        </div>
    `); // użyte jQuery, bo questions.querySelector('.questions').innerHTML = `...` usuwało to, co zawarte było w inputach

    questionButtons();
}

const addQuestionButton = document.querySelector('.addQuestionButton');
addQuestionButton.addEventListener('click', function(e) {
    e.preventDefault();
    addQuestionToArray();
})

const endAddingQuestions = document.querySelector('button.end')
endAddingQuestions.addEventListener('click', function(e) {
    e.preventDefault();
    if (newQuestions.length > 0) {
        $('.addQuestionButton').hide();
        $('.questions').hide();
        $('button.end').hide();
        $('form > div.text').html('');
    } else {
        $('form > div.text').html('Musisz mieć przynajmniej jedno pytanie aby zakończyć dodawanie pytań.')
    }
})

function addQuestionToArray() {
    const textInputs = document.querySelectorAll('.questions input[type="text"]');
    let allOk = 0;
    for (let i = 0; i < textInputs.length; i++) {
        if (textInputs[i].value === '') {
            textInputs[i].style.border = '2px solid red';
        } else {
            textInputs[i].style.border = '2px solid var(--mainPurple)';
            allOk++;
        }
    }

    let questionType = '';
    const radioInputs = document.querySelectorAll('.questions input[name="questionType"]');
    let checked = false;
    radioInputs.forEach(element => {
        if (element.checked) {
            checked = true;
            questionType = element.value;
        }
    })



    if (allOk == textInputs.length && checked && questionType === 'closed-endedQuestion') {
        let question = document.querySelector('.questions .addingQuestion input[name="question"]').value;
        let answers = [];

        const allAnswers = document.querySelectorAll('.closedEndedQuestion input[type="text"]');
        allAnswers.forEach(element => {
            answers.push(element.value);
        })


        const correct = document.querySelectorAll('.closedEndedQuestion input[name="correct"]');
        console.log(correct)
        let correctAnswer = '';
        for(let i = 0; i < correct.length; i++) {
            if (correct[i].checked) {
                correctAnswer = i.toString();
            }
        }

        
        let additionalInformation = document.querySelector('.questions .addingQuestion  input[name="additionalInformation"]').value;

        newQuestions.push(new Question(question, questionType, answers, correctAnswer, null, additionalInformation));
        addQuestion();
    } else if (allOk == textInputs.length && checked && questionType === 'open-endedQuestion') {
        let question = document.querySelector('.questions .addingQuestion input[name="question"]').value;

        let correctAnswer = document.querySelector('.answerBox .openEndedQuestion input[name="answer"]').value;

        let acceptableAnswers = [];

        const acceptable_Answers = document.querySelectorAll('.answerBox input[name="acceptable_answer"]')
        acceptable_Answers.forEach(element => {
            console.log(element.value)
            acceptableAnswers.push(element.value);
        })

        let additionalInformation = document.querySelector('.questions .addingQuestion  input[name="additionalInformation"]').value;

        newQuestions.push(new Question(question, questionType, null, correctAnswer, acceptableAnswers, additionalInformation));
        addQuestion();
    }
}

function questionButtons() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(element => {
        element.addEventListener('change', function(e) {
            // console.log(e.target.value)
            const value = e.target.value;
            const addingQuestionBox = element.parentNode.parentNode.parentNode;
            if (value === 'closed-endedQuestion') {
                closedEndedQuestionId = 0;
                closedEndedQuestion(addingQuestionBox);
                // closedEndedQuestion(e.parentNode);
            } else {
                openEndedQuestionId = 0;
                openEndedQuestion(addingQuestionBox);
                // openEndedQuestion();
            }
        })
    })
}

var closedEndedQuestionId = 0;
function closedEndedQuestion(element) {
    const answerBox = element.querySelector('.answerBox');
    const addAnswer = element.querySelector('.addAnswer');
    if (closedEndedQuestionId === 0) {
        answerBox.innerHTML = '<div class="text">Wskaż poprawną odpowiedź</div>';
        addAnswer.innerHTML = '<button class="addAnswer">Dodaj odpowiedź</button>';
        const btn = addAnswer.querySelector('button');
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            closedEndedQuestionId++;
            closedEndedQuestion(element);
        })
    }
    // answerBox.innerHTML += `
    //     <div class="closedEndedQuestion">
    //         <input type="radio" name="correct" value="${closedEndedQuestionId}">
    //         <input type="text" placeholder="Odpowiedź">
    //         <button class="remove"><i class="fa-solid fa-minus"></i></button>
    //     </div>
    // `;
    $(answerBox).append(`
        <div class="closedEndedQuestion">
            <input type="radio" name="correct">
            <input type="text" placeholder="Odpowiedź">
            <button class="remove"><i class="fa-solid fa-minus"></i></button>
        </div>
    `);

    const removeButtons = document.querySelectorAll('.closedEndedQuestion button.remove');
    removeButtons.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const answers = element.parentNode.parentNode.querySelectorAll('.closedEndedQuestion');
            // console.log(answersCount);
            if (answers.length > 1) {
                element.parentNode.remove();
                // setCorrectAnswerId(answers);
            }
        })
    })
};

var openEndedQuestionId = 0;
function openEndedQuestion(element) {
    const answerBox = element.querySelector('.answerBox');
    const addAnswer = element.querySelector('.addAnswer');
    if (openEndedQuestionId === 0) {
        answerBox.innerHTML = `
            <div class="text">Wpisz odpowiedź</div>
            <div class="openEndedQuestion">
                <input type="text" name="answer" placeholder="Odpowiedź">
            </div>
        `;
        addAnswer.innerHTML = '<button class="addAnswer">Dodaj akceptowalną odpowiedź</button>';
        const btn = addAnswer.querySelector('button');
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openEndedQuestionId++;
            openEndedQuestion(element);
        })
    }
    $(answerBox).append(`
        <div class="openEndedQuestion">
            <input type="text" name="acceptable_answer" placeholder="Akceptowalna odpowiedź">
        </div>
    `);
};

const form = document.querySelector('form')

form.addEventListener('submit', function(e) {
    e.preventDefault();
    // const allTextInputs = document.querySelectorAll('form input[type="text"]');
    // let allOk = 0;
    // allTextInputs.forEach(element => {
    //     if (element.value === '') {
    //         element.style.border = '2px solid red';
    //     } else {
    //         element.style.border = '2px solid var(--mainPurple)';
    //         allOk++;
    //     }
    // })
    const quizName = document.querySelector('form input[name="nazwa_quizu"]');
    if (quizName.value !== '') {
        quizName.style.border = '2px solid var(--mainPurple)';
        if (newQuestions.length > 0) {
            $('.questions').html();
            $('.addQuestionButton').hide();
           quizCreation(); 
        } else {
            $('form div.text').html('Musisz mieć przynajmniej jedno pytanie aby utworzyć quiz');
        }
    } else {
        quizName.style.border = '2px solid red';
    }
})

function quizCreation() {
    const quizName = document.querySelector('input[name="nazwa_quizu"]').value;
    let quizPicture = document.querySelector('input[name="quiz_picture"]').value;
    quizArray.push(new Quiz(quizName))
    for (let i = 0; i < newQuestions.length; i++) {
        console.log(newQuestions)
        quizArray[quizArray.length-1].addQuestion(newQuestions[i]);
    }


    if (quizPicture === '') {
        quizPicture = '../multimedia/img/quiz_tlo.jpg';
    }


    let quizID = quizArray.length-1;
    let quizIDString = quizID.toString()
    const quizzesBox = document.querySelector('.quizzesBox');
    quizzesBox.innerHTML += `
        <div class="quiz" data-quizid="${quizIDString}">
            <img src="${quizPicture}" alt="Quiz">
            <div class="quizTitle">${quizName}</div>
        </div>
    `;
    openTab('mainPage');

    const quizButtons = document.querySelectorAll('section.quizzes .quizzesBox .quiz');
    quizButtons.forEach(element => {
        element.addEventListener('click', function() {
            $('main').find('*').hide();
            $('footer').hide();
            $('section#quizContent').show().css({"display":"flex"});
            
            loadQuiz(this.dataset.quizid)   
        })
            
    })
}

const getStartedButton = document.querySelector('#getStarted');
getStartedButton.addEventListener('click', function() {
    const sectionElement = document.querySelector('section.quizzes');

    sectionElement.scrollIntoView({ behavior: 'smooth' })
})

const linksBoxes = document.querySelectorAll('.linkBox')
linksBoxes.forEach(element => {
    element.addEventListener('click', function() {
        window.open(element.dataset.link, '_blank');
    })
})

function yourScores() {
    const scoresBox = document.querySelector('.results');
    const allResults = results.getAllResults();
    // console.log(allResults);
    if (allResults.length == 0) {
        scoresBox.innerHTML = `<div class="noData">Brak danych do wyświetlenia. Wykonaj quiz aby zobaczyć wyniki.</div>`;
        return;
    }

    scoresBox.innerHTML = '';
    allResults.reverse();
    allResults.forEach(element => {
        let quizName = element.getQuizName();
        let date = dateFormat(new Date(element.getDate()));
        let score = ((element.getPoints() / element.getMaxPoints()) * 100) + '%';
        let points = element.getPoints() + '/' + element.getMaxPoints() + ' ' + 'punktów';
        scoresBox.innerHTML += `
            <div class="resultBox">
                <div class="head">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <div class="quizName">Nazwa: <span>${quizName}</span></div>
                <div class="date">Data: <span>${date}</span></div>
                <div class="score">Wynik: <span>${score}</span></div>
                <div class="pointsCount">Ilość punktów: <span>${points}</span></div>
            </div>
        `;
    })
}

function dateFormat(date) {
    let day = date.getDate();
    if (parseInt(day) < 10) {
        day = '0' + '' + date.getDate();
    }
    let month = date.getMonth()+1;
    if (parseInt(month) < 10) {
        month = '0' + '' + parseInt(date.getMonth()+1);
    }
    let year = date.getFullYear();

    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (parseInt(minutes) < 10) {
        minutes = '0' + '' + date.getMinutes();
    }

    const dateFormatted = day + '.' + month + '.' + year + ' ' + hour + ':' + minutes;
    return dateFormatted;
}




const quizButtons = document.querySelectorAll('section.quizzes .quizzesBox .quiz');
quizButtons.forEach(element => {
    element.addEventListener('click', function() {
        $('main').find('*').hide();
        $('footer').hide();
        $('section#quizContent').show().css({"display":"flex"});
        
        loadQuiz(this.dataset.quizid)   
    })
        
})


let points = 0;
var inQuiz = false;

function loadQuiz(quiz) {
    points = 0;
    inQuiz = true;
    let quizId = parseInt(quiz);
    let questionId = 0;
    let countOfQuestions = quizArray[quizId].questions.length;
    loadQuestion(quizId, questionId, countOfQuestions);
}

function loadQuestion(quizId, questionId, countOfQuestions) {
    if (questionId < countOfQuestions) {
        const question = quizArray[quizId].questions[questionId].showQuestion();
        const additionalInformation = quizArray[quizId].questions[questionId].showAdditionalInformation();

        const showAnswers = quizArray[quizId].questions[questionId].showAnswers();
        const questionAnswersBox = showAnswers.html;





        const content = `<div class="question">${question}</div><div class="additionalInformation">${additionalInformation}</div><div class="questionAnswersBox">${questionAnswersBox}</div>`;
        $('section#quizContent').html(`<div class="quizBox">${content}</div>`);

        if (showAnswers.button) {
            document.querySelector('section#quizContent button').addEventListener('click', function() {
                const value = document.querySelector('section#quizContent div input').value;
                const isCorrect = quizArray[quizId].questions[questionId].checkAnswer(value);
                if (isCorrect) {
                    points++;
                }
                loadQuestion(quizId, questionId+1, countOfQuestions);
            })
        } else {
            const buttons = document.querySelectorAll('section#quizContent button');
            buttons.forEach(element => {
                element.addEventListener('click', function() {
                    let answerId = this.dataset.answer;
                    const isCorrect = quizArray[quizId].questions[questionId].checkAnswer(answerId);
                    if (isCorrect) {
                        points++;
                    }
                    loadQuestion(quizId, questionId+1, countOfQuestions);
                })
            })
        }
    } else {
        const quizResult = new Result(quizArray[quizId].quizName, points, countOfQuestions, new Date());
        results.pushNewResult(quizResult);
        
        $('section#quizContent').html(`<div class="quizScore"><div>Twój wynik to: ${quizResult.getPoints()} ${quizResult.pointsWord()}</div><div>Maksymalna liczba punktów do zdobycia: 
            ${quizResult.getMaxPoints()}
        </div><div><button>Powrót do strony głównej</button></div></div>`);

        const btn = document.querySelector('section#quizContent button');
        btn.addEventListener('click', function() {
            openTab('mainPage');
        })
    }
}