function calculateBMI() {
    var weightInput = $('#weight');
    var heightInput = $('#height');
    var bmiResultSpan = $('#bmiResult');
    var bmiCategorySpan = $('#bmiCategory');
    var historyTable = $('#historyTable');

    var weight = parseFloat(weightInput.val());
    var height = parseFloat(heightInput.val());

    if (!isNaN(weight) && !isNaN(height)) {
      $.ajax({
        type: 'POST',
        url: '/bmi',
        data: { weight: weight, height: height },
        success: function(response) {
          var bmi = response.bmi;
          var bmiCategory = response.category;
          var currentDate = response.date;

          bmiResultSpan.text(bmi.toFixed(2));
          bmiCategorySpan.text(bmiCategory);

          var row = $('<tr>');
          $('<td>').text(bmi.toFixed(2)).appendTo(row);
          $('<td>').text(bmiCategory).appendTo(row);
          $('<td>').text(currentDate).appendTo(row);
          row.prependTo(historyTable);

          weightInput.val('');
          heightInput.val('');
        }
      });
    }
}

function fetchHistory() {
    var historyTable = $('#historyTable');

    $.ajax({
        type: 'GET',
        url: '/history',
        success: function(history) {
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

fetchHistory();