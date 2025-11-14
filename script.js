document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 計算邏輯 ---
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const birthDateInput = document.getElementById('birthdate').value;
            const resultDisplay = document.getElementById('result-display');
            
            if (!birthDateInput) {
                resultDisplay.innerHTML = '<p style="color: red;">請先選擇狗狗的出生日期！</p>';
                return;
            }

            const birthDate = new Date(birthDateInput);
            const today = new Date();

            if (birthDate > today) {
                resultDisplay.innerHTML = '<p style="color: red;">出生日期不能在未來喔！</p>';
                return;
            }

            const diffTime = Math.abs(today - birthDate);
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            const dogAgeYears = diffDays / 365.25;
            const dog_age = dogAgeYears.toFixed(1);

            let human_age_raw = 16 * Math.log(dogAgeYears) + 31;

            if (human_age_raw < 1) {
                human_age_raw = 1;
            }
            
            const human_age = human_age_raw.toFixed(0);

            resultDisplay.innerHTML = `
                <p>妙麗現在大約 <strong>${dog_age}</strong> 歲狗年齡。</p>
                <p>換算成人類年齡大約是 <strong>${human_age}</strong> 歲。</p>
            `;
        });
    }

    // --- 2. 修改後的切換邏輯 ---
    const toggleBtn = document.getElementById('toggle-info-btn');
    const infoDiv = document.getElementById('reference-info');

    if (toggleBtn && infoDiv) {
        toggleBtn.addEventListener('click', function() {
            
            // 切換 'show' class
            const isVisible = infoDiv.classList.toggle('show');
            
            // --- 更新 ARIA 屬性 ---
            if (isVisible) {
                // 如果內容可見
                toggleBtn.setAttribute('aria-expanded', 'true');
                toggleBtn.setAttribute('aria-label', '隱藏計算說明');
            } else {
                // 如果內容隱藏
                toggleBtn.setAttribute('aria-expanded', 'false');
                toggleBtn.setAttribute('aria-label', '顯示計算說明');
            }
        });
    }

});