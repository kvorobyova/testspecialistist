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
    }
    function showResult(){
      let key = Object.keys(result).reduce(function(a,b){
        return result[a] > result[b] ? a:b;

      });
      document.querySelector('.question').innerText = answers[key]['description'];
      document.querySelector('button a').href = answers[key].url;
      setTimeout(() => {
        document.querySelector('.question').style.display = 'flex';
        document.querySelector('button').style.display = 'block';
        document.querySelector('.loader').style.display = 'none';
      }, 2000);
    }

  }
  showQuestion(step);
}
