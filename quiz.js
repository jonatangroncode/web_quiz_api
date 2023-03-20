

const apiurl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy';

const button = document.querySelector('#fetch');

button.addEventListener('click', async e => {

    console.log('click click');

    const response = await fetch(apiurl);
    console.log('2. got response:', response);

    const data = await response.json();
    console.log('3. got data:', data);


    const allQuestions = data.results

    createQuestions(allQuestions);

})


const createQuestions = (questions) => {
    const questionsContainer = document.querySelector('#questions');
    questions.forEach( q => {
        const questionElement = createQuestionElement(q);
        questionsContainer.appendChild(questionElement);
        
    });
}

const createQuestionElement = (question) =>{

    const questionElement = document.createElement('div');
    questionElement.className = 'question';

    const questionHeading = document.createElement('h2');
    questionHeading.innerHTML = question.question;

    questionElement.appendChild(questionHeading);

    // let options =  [...question.incorrect_answers, question.correct_answer];
    //todo: shuffle

    let options = question.incorrect_answers;
    const randomIndex = Math.floor(Math.random() * options.length + 1)
    options.splice(randomIndex, 0, question.correct_answer)

    options.forEach( option => {
        const optionElement = createOptionElement(option, question.correct_answer); 
        questionElement.appendChild(optionElement)
    })


    return questionElement;

}

const createOptionElement = (option, correct_answer) => {
    const optionElement = document.createElement('div'); 
    optionElement.className = 'option';
    optionElement.innerHTML = option;

    optionElement.addEventListener('click', e=> {
        console.log('Du valde:' + option);

        if (option == correct_answer) {
            optionElement.classList.add('correct_answer');
            console.log('Rätt')
        }else{
            optionElement.classList.add('incorrect_answer');
            console.log('Fel')
        }
    })

    return optionElement;

} 