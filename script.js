
const BOBOT_TUGAS = 0.3;
const BOBOT_UTS = 0.3;
const BOBOT_UAS = 0.4;
const BATAS_LULUS = 60;

function updateProgressBar(inputId, progressId) {
    const input = document.getElementById(inputId);
    const progressBar = document.getElementById(progressId);
    
    input.addEventListener('input', function() {
        const value = parseInt(this.value) || 0;
        const width = Math.min(Math.max(value, 0), 100);
        progressBar.style.width = width + '%';
    });
}

updateProgressBar('tugas', 'progress-tugas');
updateProgressBar('uts', 'progress-uts');
updateProgressBar('uas', 'progress-uas');

function validateInput(nilai) {
    const num = parseFloat(nilai);
    return !isNaN(num) && num >= 0 && num <= 100;
}

function getNilaiHuruf(nilai) {
    if (nilai >= 90) return 'A';
    if (nilai >= 80) return 'B';
    if (nilai >= 70) return 'C';
    if (nilai >= 60) return 'D';
    return 'E';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;
    
    errorDiv.style.animation = 'none';
    errorDiv.offsetHeight;
    errorDiv.style.animation = 'slideIn 0.3s ease';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}

function hitungNilai() {
    hideError();

    const nilaiTugas = document.getElementById('tugas').value;
    const nilaiUTS = document.getElementById('uts').value;
    const nilaiUAS = document.getElementById('uas').value;

    if (!nilaiTugas || !nilaiUTS || !nilaiUAS) {
        showError('Semua nilai harus diisi');
        return;
    }

    if (!validateInput(nilaiTugas) || !validateInput(nilaiUTS) || !validateInput(nilaiUAS)) {
        showError('Semua nilai harus berada antara 0 dan 100');
        return;
    }

    const kontribusiTugas = parseFloat(nilaiTugas) * BOBOT_TUGAS;
    const kontribusiUTS = parseFloat(nilaiUTS) * BOBOT_UTS;
    const kontribusiUAS = parseFloat(nilaiUAS) * BOBOT_UAS;

    const nilaiAkhir = kontribusiTugas + kontribusiUTS + kontribusiUAS;
    const nilaiHuruf = getNilaiHuruf(nilaiAkhir);
    const lulus = nilaiAkhir >= BATAS_LULUS;

    const hasil = document.getElementById('hasil');
    hasil.style.display = 'block';

    document.getElementById('kontribusi-tugas').textContent = 
        `Kontribusi Tugas: ${kontribusiTugas.toFixed(2)}`;
    document.getElementById('kontribusi-uts').textContent = 
        `Kontribusi UTS: ${kontribusiUTS.toFixed(2)}`;
    document.getElementById('kontribusi-uas').textContent = 
        `Kontribusi UAS: ${kontribusiUAS.toFixed(2)}`;
    document.getElementById('nilai-akhir').textContent = 
        `Nilai Akhir: ${nilaiAkhir.toFixed(2)}`;
    document.getElementById('nilai-huruf').textContent = 
        `Nilai Huruf: ${nilaiHuruf}`;
    
    const statusElement = document.getElementById('status');
    statusElement.textContent = `Status: ${lulus ? 'LULUS' : 'TIDAK LULUS'}`;
    statusElement.className = lulus ? 'lulus' : 'tidak-lulus';
}