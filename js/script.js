$(document).ready(function () {
  // Function to display error icon
  function showErrorIcon(inputId) {
    $("#" + inputId)
      .next(".error-icon")
      .show();
  }

  // Function to hide error icon
  function hideErrorIcon(inputId) {
    $("#" + inputId)
      .next(".error-icon")
      .hide();
  }

  // Function to display tooltip
  function showTooltip(inputId, message) {
    $("#" + inputId)
      .next(".error-icon")
      .attr("title", message);
  }

  // Function to validate inputs
  function validateInputs() {
    var isValid = true;

    // Validate Gross Annual Income
    var grossIncome = $("#grossIncome").val();
    if (isNaN(grossIncome) || grossIncome === "") {
      showErrorIcon("grossIncome");
      showTooltip("grossIncome", "Please enter a valid number");
      isValid = false;
    } else {
      hideErrorIcon("grossIncome");
    }

    // Validate Extra Income
    var extraIncome = $("#extraIncome").val();
    if (isNaN(extraIncome) || extraIncome === "") {
      showErrorIcon("extraIncome");
      showTooltip("extraIncome", "Please enter a valid number");
      isValid = false;
    } else {
      hideErrorIcon("extraIncome");
    }

    // Validate Deductions
    var deductions = $("#deductions").val();
    if (isNaN(deductions) || deductions === "") {
      showErrorIcon("deductions");
      showTooltip("deductions", "Please enter a valid number");
      isValid = false;
    } else {
      hideErrorIcon("deductions");
    }

    // Validate Age
    var age = $("#age").val();
    if (age === "") {
      showErrorIcon("age");
      showTooltip("age", "This field is mandatory");
      isValid = false;
    } else {
      hideErrorIcon("age");
    }

    return isValid;
  }

  // Function to calculate tax
  function calculateTax() {
    var grossIncome = parseFloat($("#grossIncome").val());
    var extraIncome = parseFloat($("#extraIncome").val());
    var deductions = parseFloat($("#deductions").val());
    var age = $("#age").val();

    var taxableIncome = grossIncome + extraIncome - deductions;
    var tax = 0;

    if (taxableIncome > 800000) {
      if (age === "<40") {
        tax = 0.3 * (taxableIncome - 800000);
      } else if (age === "40-59") {
        tax = 0.4 * (taxableIncome - 800000);
      } else if (age === "60+") {
        tax = 0.1 * (taxableIncome - 800000);
      }
    }

    return tax;
  }

  // Event listener for Submit button
  $("#calculateTax").click(function () {
    // Reset error icons
    $(".error-icon").hide();

    // Validate inputs
    if (validateInputs()) {
      // Calculate tax
      var tax = calculateTax();
      var resultText = "Tax to be paid: " + tax.toFixed(2) + " Lakhs";

      // Display result in modal
      $("#resultText").text(resultText);
      $("#resultModal").modal("show");
    }
  });
});
