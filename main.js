$(function() {
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');
  const $finishPanel = $('#finish-panel');

  let char_index = 1;
  let max_length = 3;
  let question_number = 0;
  let question_limit = 3;

  const MONDAI_LIST = [
    {yomi:'ごはん', text:'gohan'},
    {yomi:'おすし', text:'osushi'},
    {yomi:'サイフ', text:'saifu'},
    {yomi:'バナナ', text:'banana'},
    {yomi:'くつした', text:'kutsushita'},
  ];

  $(document).on('keypress', function(e) {

    const $target = $('#char-'+ char_index);
    const char = $target.text();
    if (e.key === char) {
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
    }

    if (max_length < char_index) {
      question_number++;
      if (question_limit < question_number) {
        finish();
        return
      }
      changeQuestionWord();
      char_index = 1;
    }
    function changeQuestionWord() {
      const word = MONDAI_LIST[question_number]['text'];
      max_length = word.length;
      let newHtml = '';
      for (var i = 0; i < max_length; i++) {
        newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>';
      }
      $mondai.html(newHtml);
      $yomi.text(MONDAI_LIST[question_number]['yomi']);
    }

    function finish() {
      $finishPanel.removeClass('hidden');
      $yomi.hide();
      $mondai.hide();
    }
  });
});