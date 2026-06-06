const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");
const score = document.getElementById("score");
const feedback = document.getElementById("feedback");

// Generate Password
generateBtn.addEventListener("click", generatePassword);

function generatePassword() {

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]<>?/";

    let password = "";

    for(let i = 0; i < 20; i++) {
        password += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    passwordInput.value = password;
    analyzePassword();
}

// Analyze Password
passwordInput.addEventListener("input", analyzePassword);

function analyzePassword() {

    const pass = passwordInput.value;

    if(pass.length === 0){

        strengthFill.style.width = "0%";
        strengthFill.style.background = "#22c55e";

        strengthText.textContent = "Waiting...";
        score.textContent = "0";

        feedback.innerHTML = `
            <li>Generate or enter a password to analyze.</li>
        `;

        return;
    }

    let points = 0;

    if(pass.length >= 8) points += 20;
    if(pass.length >= 12) points += 20;
    if(/[A-Z]/.test(pass)) points += 15;
    if(/[a-z]/.test(pass)) points += 15;
    if(/[0-9]/.test(pass)) points += 15;
    if(/[^A-Za-z0-9]/.test(pass)) points += 15;

    if(points > 100) points = 100;

    score.textContent = points;

    let status = "Weak";
    let width = "25%";
    let color = "#ef4444";

    if(points >= 40){
        status = "Medium";
        width = "50%";
        color = "#f59e0b";
    }

    if(points >= 70){
        status = "Strong";
        width = "80%";
        color = "#3b82f6";
    }

    if(points >= 90){
        status = "Very Strong";
        width = "100%";
        color = "#22c55e";
    }

    strengthText.textContent = status;
    strengthFill.style.width = width;
    strengthFill.style.background = color;

    feedback.innerHTML = `
        <li>${pass.length >= 8 ? "✅" : "❌"} Minimum 8 characters</li>
        <li>${/[A-Z]/.test(pass) ? "✅" : "❌"} Contains uppercase letters</li>
        <li>${/[a-z]/.test(pass) ? "✅" : "❌"} Contains lowercase letters</li>
        <li>${/[0-9]/.test(pass) ? "✅" : "❌"} Contains numbers</li>
        <li>${/[^A-Za-z0-9]/.test(pass) ? "✅" : "❌"} Contains special characters</li>
        <li>📏 Length: ${pass.length} characters</li>
    `;
}

// Copy Password
copyBtn.addEventListener("click", () => {

    if(passwordInput.value === ""){

        alert("Generate or enter a password first.");
        return;
    }

    navigator.clipboard.writeText(passwordInput.value);

    copyBtn.textContent = "Copied ✓";

    setTimeout(() => {
        copyBtn.textContent = "Copy Password";
    }, 2000);

});