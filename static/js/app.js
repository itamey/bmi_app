// Function to calculate BMI and update the UI with the result
function calculateBMI() {
    // Get input elements and result spans from the DOM
    var weightInput = $('#weight');
    var heightInput = $('#height');
    var bmiResultSpan = $('#bmiResult');
    var bmiCategorySpan = $('#bmiCategory');
    var historyTable = $('#historyTable');

    // Parse weight and height inputs to floats
    var weight = parseFloat(weightInput.val());
    var height = parseFloat(heightInput.val());

    // Check if weight and height inputs are valid numbers
    if (!isNaN(weight) && !isNaN(height)) {
      // Send a POST request to calculate BMI on the server
      $.ajax({
        type: 'POST',
        url: '/bmi',
        data: { weight: weight, height: height },
        success: function(response) {
          // Extract BMI, BMI category, and current date from the response
          var bmi = response.bmi;
          var bmiCategory = response.category;
          var currentDate = response.date;

          // Update the UI with the calculated BMI and BMI category
          bmiResultSpan.text(bmi.toFixed(2));
          bmiCategorySpan.text(bmiCategory);

          // Create a new row in the history table with the BMI calculation details
          var row = $('<tr>');
          $('<td>').text(bmi.toFixed(2)).appendTo(row);
          $('<td>').text(bmiCategory).appendTo(row);
          $('<td>').text(currentDate).appendTo(row);
          row.prependTo(historyTable);

          // Clear the weight and height inputs after calculation
          weightInput.val('');
          heightInput.val('');
        }
      });
    }
}

// Function to fetch BMI calculation history from the server and populate the history table
function fetchHistory() {
    var historyTable = $('#historyTable');

    // Send a GET request to retrieve BMI calculation history from the server
    $.ajax({
        type: 'GET',
        url: '/history',
        success: function(history) {
            // Iterate through the retrieved history and create rows in the history table
            $.each(history, function(index, item) {
                var row = $('<tr>');
                $('<td>').text(item.bmi.toFixed(2)).appendTo(row);
                $('<td>').text(item.category).appendTo(row);
                $('<td>').text(item.date).appendTo(row);
                row.appendTo(historyTable);
            });
        }
    });
}

// Call fetchHistory function to populate the history table when the page loads
fetchHistory();
