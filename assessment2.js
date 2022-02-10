'use strict';//厳格モード
//各行で設定したidを使って、要素の取得を行う
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

//無名関数をassessmentButtonのonclickプロパティに設定し、ボタンが押された時に動作するようにする
assessmentButton.onclick = function() {
    //userNameInputオブジェクトのvalueプロパティから、テキストエリアに入力された文字列を受け取る
    const userName = userNameInput.value;
    //名前が空=文字列の長さが0なら、戻り値なしで処理を終了させるという処理
    if (userName.length === 0) {
        return;
    }
    //診断結果表示エリアの作成
    //ボタンを押すたびに追記されないように、まず前回の結果を削除する処理をいれる
    resultDivided.innerText = '';
    //HTML側の要素を作成する
    const header = document.createElement('h3');
    //innerTextプロパティで、タグ内のテキストを書き換える
    header.innerText = '診断結果';
    //（div要素を親として、）子要素（header）を追加する
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
    //ツイートエリアの作成
    tweetDivided.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    //作成したaタグの内容
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    //Tweet buttonのような見た目にする
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

//Enterキーを押した時にも、関数を動作させる
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
}

//診断結果の定義
const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

//assessment()関数を説明するJSDoc形式のコメント
/**
 * 名前の文字列を渡すと診断結果を返す関数（関数の処理内容）
 * @param {string} userName (引数のデータ型と名前)
 * @return {string} 診断結果（戻り値のデータ型
 */
//note: 関数の内部処理と、外部からの入力(引数)と、外部への出力（戻り値）を定義する「内外の境界」をインターフェースと呼ぶ

function assessment(userName) {
    //全文字のコード番号を取得して、それを足し合わせる処理
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        //入力したuserNameのi番目文字列の文字コード番号を足していく処理
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って、添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    //上で定義した診断結果内の {userName} をユーザーの名前に置き換える
    result = result.replaceAll('{userName}', userName);
    return result;
}

//テストコード
//第一引数には、trueとなるかテストする式を入れて、第二引数にはtrueではなかったとこのメッセージを書く
assessment('太郎') === 
console.assert(
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '「診断結果の文言の特定の部分を名前に置き換える処理」が正しくありません。'
);
console.assert(
    assessment('花子') === assessment('花子'),
    '「入力が同じ名前なら同じ診断結果を出力する処理」が正しくありません。'
);
//Note: 正しいときは何も表示されない！

//同じ文字を入力したときは同じ結果が出ることを確認する
console.log(assessment('太郎'));
console.log(assessment('花子'));
console.log(assessment('太郎'));
