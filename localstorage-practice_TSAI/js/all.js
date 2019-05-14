var add = document.querySelector('#add');
var memo = document.querySelector('#memo');
var list = document.querySelector('.list');
var body = document.body;
// 讀取資料庫or新增空字串
var myArr =JSON.parse(localStorage.getItem('memoList')) || [];

// 待辦事項輸入進字串
function getTextToArr(e) {
    if (memo.value == ''){return};

    var myObj = {
        content : memo.value
    }
    myArr.push(myObj);

    arrayToMemoery();
}

// 陣列轉字串，更新資料庫
function arrayToMemoery (){
    var memoStr = JSON.stringify(myArr);
    localStorage.setItem('memoList',memoStr);
    upDate();
}

// 渲染ul
function upDate(){
    // 輸入清空
    memo.value = '';
    // ul清空
    list.textContent = '';

    for (let i = 0; i < myArr.length; i++) {
        var strLi = document.createElement('li');
        var strDel = document.createElement('a');
        var strSpan = document.createElement('span');

        strDel.textContent = '刪除';
        strDel.setAttribute('href','#');
        strDel.dataset.num = i;

        strSpan.textContent = myArr[i].content; 

        strLi.appendChild(strDel);
        strLi.appendChild(strSpan);
        list.appendChild(strLi);    

        }
}

// 刪除程式
function deleteFun(e) {
    var nodeName = e.target.nodeName;
    
    if (nodeName !== 'A'){
        return;
    }else{
        myArr.splice(e.target.dataset.num,1)
    }
arrayToMemoery();
}

// 快捷enter function
function enter(e){    
    if (e.keyCode === 13){getTextToArr()}
}

upDate();

// 按鈕觸發
add.addEventListener('click',getTextToArr,false);
// 刪除觸發
list.addEventListener('click',deleteFun,false);
// 快捷enter
body.addEventListener('keydown',enter,false);
