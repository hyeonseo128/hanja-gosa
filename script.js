const words = [
    { id: 1, text: "백발백중", image: "1.png" },
    { id: 2, text: "구우일모", image: "2.png" },
    { id: 3, text: "일석이조", image: "3.png" },
    { id: 4, text: "칠전팔기", image: "4.png" },
    { id: 5, text: "천신만고", image: "5.png" },
    { id: 6, text: "문일지십", image: "6.png" },
    { id: 7, text: "지음", image: "7.png" },
    { id: 8, text: "형설지공", image: "8.png" },
    { id: 9, text: "다다익선", image: "9.png" },
    { id: 10, text: "계란유골", image: "10.png" },
    { id: 11, text: "함흥차사", image: "11.png" },
    { id: 12, text: "결초보은", image: "12.png" },
    { id: 13, text: "수주대토", image: "13.png" },
    { id: 14, text: "어부지리", image: "14.png" },
    { id: 15, text: "오십보백보", image: "15.png" },
    { id: 16, text: "조삼모사", image: "16.png" },
    { id: 17, text: "호가호위", image: "17.png" },
    { id: 18, text: "조장", image: "18.png" },
    { id: 19, text: "오비삼척", image: "19.png" },
    { id: 20, text: "종두득두", image: "20.png" },
    { id: 21, text: "일어 혼전천", image: "21.png" },
    { id: 22, text: "내언불미 거언하미", image: "22.png" },
    { id: 23, text: "근묵자흑", image: "23.png" },
    { id: 24, text: "결자해지", image: "24.png" },
    { id: 25, text: "출필곡 반필면", image: "25.png" },
    { id: 26, text: "양약고구이리어병", image: "26.png" },
    { id: 27, text: "위귀인 이 위호인 난", image: "27.png" },
    { id: 28, text: "차도 고려득지어신라", image: "28.png" },
    { id: 29, text: "아조득지어고려", image: "29.png" },
    { id: 30, text: "원비일본지지 조동강토", image: "30.png" },
    { id: 31, text: "불가여지", image: "31.png" },
    { id: 32, text: "오비이락", image: "32.png" }
];

let questionPool = [];
let memorized = [];
let unmemorized = [];
let currentWord = null;
let currentMode = "all";
let currentQuizType = "textToImage";

// 문제 리스트 초기화 및 섞기
function resetQuestions() {
    if (currentMode === "all") {
        questionPool = shuffle([...words]);
    } else if (currentMode === "memorized") {
        questionPool = shuffle([...memorized]);
    } else if (currentMode === "unmemorized") {
        questionPool = shuffle([...unmemorized]);
    }
}

// 학습 모드 변경
document.getElementById("modeSelect").addEventListener("change", (e) => {
    currentMode = e.target.value;
    resetQuestions();
    loadNextQuestion();
});

// 출제 방식 변경
document.getElementById("quizType").addEventListener("change", (e) => {
    currentQuizType = e.target.value;
    loadNextQuestion();
});

// 랜덤 섞기
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 다음 문제 로드
function loadNextQuestion() {
    if (questionPool.length === 0) {
        resetQuestions();
    }

    if (questionPool.length === 0) {
        document.getElementById("question").textContent = "문제가 없습니다.";
        document.getElementById("image").classList.add("hidden");
        return;
    }

    currentWord = questionPool.pop();

    if (currentQuizType === "textToImage") {
        document.getElementById("question").textContent = currentWord.text;
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.add("hidden");
    } else {
        document.getElementById("question").textContent = "";
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.remove("hidden");
    }

    updateProgress();
}

// 진행 상황 업데이트 (현재 문제 번호 포함)
function updateProgress() {
    const totalQuestions = words.length;
    const currentQuestionNumber = totalQuestions - questionPool.length;
    
    document.getElementById("progress").textContent =
        `현재 문제: ${currentQuestionNumber} / ${totalQuestions}  
        | 남은 문제: ${questionPool.length}  
        | 외운 문제: ${memorized.length}  
        | 못 외운 문제: ${unmemorized.length}`;
}


// 정답 보기
document.getElementById("showAnswer").addEventListener("click", () => {
    if (currentQuizType === "textToImage") {
        document.getElementById("image").classList.remove("hidden");
    } else {
        document.getElementById("question").textContent = currentWord.text;
    }
});

// 몰라요
document.getElementById("dontKnow").addEventListener("click", () => {
    if (!unmemorized.includes(currentWord)) {
        unmemorized.push(currentWord);
    }
    loadNextQuestion();
});

// 알아요
document.getElementById("know").addEventListener("click", () => {
    if (!memorized.includes(currentWord)) {
        memorized.push(currentWord);
    }
    loadNextQuestion();
});

// 진행 상황 업데이트
function updateProgress() {
    document.getElementById("progress").textContent = 
        `남은 문제: ${questionPool.length}, 외운 문제: ${memorized.length}, 못 외운 문제: ${unmemorized.length}`;
}

// 초기 문제 설정
resetQuestions();
loadNextQuestion();