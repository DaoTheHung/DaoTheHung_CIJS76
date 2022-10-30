import { useEffect, useState } from "react";

import './index.css';

let A1 = [1, 2, "a", 'c', 'd']; let A2 = [1, 3, "b", 'd']

const arrConcat = A1.concat(A2);
const arr = []
for (let i = 0; i < A1.length; i++) {
  for (let j = 0; j < A2.length; j++) {
    if (A1[i] == A2[j]) {
      arr.push(A1[i]);
    }
  }
}

console.log(arr);
const arr1 = arrConcat.filter((e) => !arr.includes(e))
console.log(arr1)

//bai2
const dataFootbal = [{
  name: 'Arsenal',
  points: 99,
  GD: 45,
},
{
  name: 'Chelsea',
  points: 75,
  GD: 39,
},
{
  name: 'Manchester United',
  points: 60,
  GD: 29,
}, {
  name: 'a',
  points: 88,
  GD: 20,
},
{
  name: 'Liverpool',
  points: 88,
  GD: 39,
}, {
  name: 'b',
  points: 88,
  GD: 20,
},

]

const fakeData = [...dataFootbal].sort((a, b) => {
  if (a.points > b.points) return -1;
  if (a.points < b.points) return 1;
  if (a.GD > b.GD) return -1;
  if (a.GD < b.GD) return -1;
  return 0
})
console.log(fakeData)
fakeData.forEach((item, i) => {
  item.position = i + 1
})
fakeData.sort((a, b) => dataFootbal.indexOf(a) - dataFootbal.indexOf(b));
console.log('mang hoan thien: ', fakeData)


function App() {
  const [dataCart, setDataCart] = useState([])
  const [question, setQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false)
    fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple')
      .then((res) => { return (res.json()) }).then((data) => {
        setDataCart(data.results)
        setIsLoading(true)


      })
  }, [])

  const [test1, setTest1] = useState([])
  const [test2, setTest2] = useState([])
  useEffect(() => {
    if (isLoading) {
      setTest1(dataCart[question].incorrect_answers)
      setTest2(dataCart[question].correct_answer)
    }
  }, [dataCart[question]])
  const list = test1.concat(test2)



  function fakeArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
  fakeArray(list)

  const reRende = () => {
    window.location.reload()
  }
  return (
    <div className="App">
      {isLoading ? <>
        {showScore ? (
          <div className="menu_all">

            <div className='menu_question'>
              You scored {score} out of {dataCart.length}
            </div>
            <button onClick={reRende} className='btn-reset'>New questions</button>
          </div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {question + 1}</span>/{dataCart.length}
              </div>
              <div className='question-text'>{dataCart[question].question}</div>
            </div>
            <div className='answer-section'>
              {

                list.map((item) => (
                  <button onClick={() => {
                    if (item == dataCart[question].correct_answer) {
                      setScore(score + 1)
                      console.log(score)
                    }
                    const fakeQuestion = question + 1;
                    if (fakeQuestion < dataCart.length) {
                      setQuestion(fakeQuestion)
                    } else { setShowScore(true) }
                  }
                  }>{item}</button>
                ))

              }
            </div>
          </>
        )}
      </> : ''}

    </div>
  );
}

export default App;