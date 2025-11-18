document.addEventListener('DOMContentLoaded', function() {
    
    // 定義 LocalStorage 的 key
    const STORAGE_KEY = 'mewoli_birthdate';

    // 元素引用
    const birthDateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDisplay = document.getElementById('result-display');
    const toggleBtn = document.getElementById('toggle-info-btn');
    const infoDiv = document.getElementById('reference-info');

    // --- 0. 載入上次的紀錄並自動計算 ---
    function loadAndCalculate() {
        const storedDate = localStorage.getItem(STORAGE_KEY);
        if (storedDate) {
            // 載入上次儲存的日期到輸入框
            birthDateInput.value = storedDate;
            
            // 觸發計算
            calculateAge(storedDate);
        }
    }

    // --- 核心計算函數 ---
    function calculateAge(birthDateValue) {
        if (!birthDateValue) {
            resultDisplay.innerHTML = '<p style="color: red;">請先選擇狗狗的出生日期！</p>';
            return;
        }

        const birthDate = new Date(birthDateValue);
        const today = new Date();

        if (birthDate > today) {
            resultDisplay.innerHTML = '<p style="color: red;">出生日期不能在未來喔！</p>';
            return;
        }

        // --- 計算狗年齡 ---
        const diffTime = Math.abs(today - birthDate);
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        const dogAgeYears = diffDays / 365.25;
        const dog_age = dogAgeYears.toFixed(1);

        // --- 換算人類年齡 (公式: human_age = 16 * ln(dog_age) + 31) ---
        let human_age_raw = 16 * Math.log(dogAgeYears) + 31;

        if (human_age_raw < 1) {
            human_age_raw = 1;
        }
        
        const human_age = human_age_raw.toFixed(0);

        // --- 顯示結果 ---
        resultDisplay.innerHTML = `
            <p>妙麗現在大約 <strong>${dog_age}</strong> 歲狗年齡。</p>
            <p>換算成人類年齡大約是 <strong>${human_age}</strong> 歲。</p>
        `;
        
        // --- 儲存紀錄 ---
        localStorage.setItem(STORAGE_KEY, birthDateValue);
    }


    // --- 1. 計算邏輯事件監聽 ---
    if (calculateBtn && birthDateInput) {
        calculateBtn.addEventListener('click', function() {
            calculateAge(birthDateInput.value);
        });
    }

    // --- 2. 切換邏輯事件監聽 ---
    if (toggleBtn && infoDiv) {
        toggleBtn.addEventListener('click', function() {
            
            // 切換 'show' class
            const isVisible = infoDiv.classList.toggle('show');
            
            // --- 更新 ARIA 屬性 ---
            if (isVisible) {
                toggleBtn.setAttribute('aria-expanded', 'true');
                toggleBtn.setAttribute('aria-label', '隱藏計算說明');
            } else {
                toggleBtn.setAttribute('aria-expanded', 'false');
                toggleBtn.setAttribute('aria-label', '顯示計算說明');
            }
        });
    }

    // --- 啟動時載入紀錄 ---
    loadAndCalculate();

});