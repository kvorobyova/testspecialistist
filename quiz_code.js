window.onload = function(){
    let result = {};
    let step = 0;

    function  showQuestion(questionNumber) {
        document.querySelector(".question").innerHTML = quiz[step]['q'];
        let answer = '';
        for (let key in quiz[step]['ans']) {
            answer += `<li data-v="${key}" class="answer-variant"><div class="select"></div>${quiz[step]['ans'][key]}</li>`;
        }
        document.querySelector(".answer").innerHTML = answer;
    }
    document.onclick = function(event) {
        event.stopPropagation();
        if (event.target.classList.contains('answer-variant') && step < quiz.length) {
            if (result[event.target.dataset.v] !== undefined) {
                result[event.target.dataset.v]++;
            }
            else {
                result[event.target.dataset.v] = 0;
            }
            step++;
            if (step === quiz.length) {
                document.querySelector('.question').style.display = 'none';
                document.querySelector('.answer').remove();
                document.querySelector('.loader').style.display = 'block';
                showResult();
            }
            else {
                showQuestion(step);
            }

            document.querySelector('.back').onclick = () => {
                step--;
                showQuestion(step);
                document.querySelector('.back').style.display = step > 0 ? 'block' : 'none';
            }

            document.querySelector('.back').style.display = step > 0 && step < quiz.length ? 'block' : 'none';

        }
        function showResult(){
            let key = Object.keys(result).reduce(function(a,b){
                return result[a] > result[b] ? a:b;
            });
            document.querySelector('.question').innerText = answers[key]['description'];
            document.querySelector('button a').href = answers[key].url;
            document.querySelector('.back').style.display = 'none';
            setTimeout(() => {
                document.querySelector('.question').style.display = 'flex';
                document.querySelector('.buttons').style.display = 'flex';
                document.querySelector('.loader').style.display = 'none';
            }, 2000);
            console.log(answers[key]['description'])
            console.log(answers[key].url)
            const user = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({...user, test_result: answers[key]['description'], test_url: answers[key].url}));
        }


    }
    showQuestion(step);
}
