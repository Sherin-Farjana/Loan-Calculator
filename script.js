// Wait until the full DOM content is loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
  
  // Cache UI elements for faster and cleaner access
  const calculateBtn = document.getElementById("calculateBtn");
  const amountInput = document.getElementById("amount");
  const interestInput = document.getElementById("interest");
  const yearsInput = document.getElementById("years");

  // Output fields for displaying results
  const monthlyPayment = document.getElementById("monthly");
  const totalPayment = document.getElementById("total");
  const totalInterestPayment = document.getElementById("totalInterest");

  /**
   * Main function to calculate loan details:
   * - Monthly Payment
   * - Total Payment
   * - Total Interest
   */
  function calculateLoan() {
    // Convert user inputs into usable numbers
    const principal = parseFloat(amountInput.value);
    const interest = parseFloat(interestInput.value) / 100 / 12; // yearly → monthly interest
    const payments = parseFloat(yearsInput.value) * 12; // years → months

    // Validate inputs: ensure all values entered are valid numbers
    if (isNaN(principal) || isNaN(interest) || isNaN(payments)) {
      alert("Please enter valid numbers");
      return;
    }

    // Formula: Monthly payment calculation 
    // Based on the standard amortization formula
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);

    // Ensure output is a valid number (not Infinity or NaN)
    if (isFinite(monthly)) {
      // Compute full payment and total interest paid
      const total = monthly * payments;
      const totalInterest = total - principal;

      // Animate the result values for smooth UI feedback
      animateValue(monthlyPayment, 0, monthly, 1000);
      animateValue(totalPayment, 0, total, 1000);
      animateValue(totalInterestPayment, 0, totalInterest, 1000);
    } else {
      alert("Please check your numbers");
    }
  }

  /**
   * Smoothly animates number values from 'start' to 'end'
   * @param {HTMLElement} element - DOM element to update
   * @param {number} start - starting value
   * @param {number} end - final value
   * @param {number} duration - animation time (ms)
   */
  function animateValue(element, start, end, duration) {
    const startTime = performance.now(); // timestamp when animation begins

    function update(currentTime) {
      const elapsed = currentTime - startTime; // time passed
      const progress = Math.min(elapsed / duration, 1); // clamp to 0–1

      // Calculate the current animated value
      const current = start + (end - start) * progress;
      element.textContent = current.toFixed(2);

      // Continue animation until completion
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    // Start animation
    requestAnimationFrame(update);
  }

  // Attach event listener: trigger loan calculation on button click
  calculateBtn.addEventListener("click", calculateLoan);
});
