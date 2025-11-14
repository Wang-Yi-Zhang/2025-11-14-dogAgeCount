// 監聽 "開始計算" 按鈕的點擊事件
document.getElementById('calculate-btn').addEventListener('click', function() {
    
    // 1. 獲取輸入
    const birthDateInput = document.getElementById('birthdate').value;
    const resultDisplay = document.getElementById('result-display');
    
    // 檢查是否選擇了日期
    if (!birthDateInput) {
        resultDisplay.innerHTML = '<p style="color: red;">請先選擇妙麗的出生日期！</p>';
        return;
    }

    // 2. 計算 {dog_age}
    const birthDate = new Date(birthDateInput);
    const today = new Date();

    // 檢查日期是否在未來
    if (birthDate > today) {
        resultDisplay.innerHTML = '<p style="color: red;">出生日期不能在未來喔！</p>';
        return;
    }

    // 計算時間差（毫秒）
    const diffTime = Math.abs(today - birthDate);
    
    // 轉換為天數
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    // 轉換為年（使用 365.25 來約略計算閏年）
    const dogAgeYears = diffDays / 365.25;
    
    // 格式化 {dog_age} 到小數第一位
    const dog_age = dogAgeYears.toFixed(1);

    // 3. 計算 {human_age}
    // 公式: human_age = 16 * ln(dog_age) + 31
    // 注意: JavaScript 中的 Math.log() 就是自然對數 (ln)
    // 參考來源：Wang, T., Ma, J., Hogan, A. N., Fong, S., Licon, K., Tsui, B., ... & Ideker, T. (2020). Quantitative translation of dog-to-human aging by conserved remodeling of the DNA methylome. Cell systems, 11(2), 176-185.https://www.cell.com/cell-systems/fulltext/S2405-4712(20)30203-9
    let human_age_raw = 16 * Math.log(dogAgeYears) + 31;

    // *** 處理說明中提到的「年齡下限」 ***
    // 如果計算結果小於 1 (例如剛出生的幼犬)，則將其設為 1
    if (human_age_raw < 1) {
        human_age_raw = 1;
    }
    
    // 格式化 {human_age} 為整數
    const human_age = human_age_raw.toFixed(0);

    // 4. 輸出結果
    resultDisplay.innerHTML = `
        <p>妙麗現在大約 <strong>${dog_age}</strong> 歲狗年齡。</p>
        <p>換算成人類年齡大約是 <strong>${human_age}</strong> 歲。</p>
    `;
});