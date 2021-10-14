const backBtns = document.querySelectorAll(".back");
    const nextBtns = document.querySelectorAll(".next");
    const progress = document.getElementById("progress");
    const formSteps = document.querySelectorAll(".form_step");
    const progrssSteps = document.querySelectorAll(".progressStep");

    let stepNumber = 0;

    nextBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        stepNumber++;
        updateFormSteps();
        updateProgressSteps();
      });
    });

    backBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        stepNumber--;
        updateFormSteps();
        updateProgressSteps();
      });
    });

    function updateFormSteps() {
      formSteps.forEach(function (formStep) {
        formStep.classList.contains("form_active") &&
          formStep.classList.remove("form_active");
      });
      formSteps[stepNumber].classList.add("form_active");
    }

    function updateProgressSteps() {
      progrssSteps.forEach(function (progress_step, index) {
        if (index < stepNumber + 1) {
          progress_step.classList.add("active");
        } else {
          progress_step.classList.remove("active");
        }
      });

      const progressActive = document.querySelectorAll(".active");
      progress.style.width =
        ((progressActive.length - 1) / (progrssSteps.length - 1)) * 100 + "%";
    }