$(function () {

    // 把資料保存到localStorage
    // 儲存數據的格式用陣列:
    // title是要進行的事項，done是判斷要放在todo還是done
    // let toDoList = [{title: 'js學習', done: false}]

    // localStorage裡面只能儲存字串，因此要轉換為JSON.stringfy()
    // 要獲取localStorage裡面的資料時，必須把字串轉為JSON.parse()

    load(); // 頁面一開啟，就顯示數據
    // 1. 按下enter，把數據儲存到localStorage
    $('#title').on('keydown', function (e) {
        if (e.keyCode === 13) {
            // 如果輸入空的內容，就跳出alert
            if($(this).val() === ''){
                alert('請輸入您要的操作');
            }else{
                // 先獲取 localStorage 裡面的數據
                let local = getData();
                // console.log(local);

                // 把local陣列進行更新數據 (把最新的數據追加給local陣列)
                // title是#title裡面的內容
                local.push({ title: $(this).val(), done: false });
                // 把local陣列儲存到localStorage
                saveData(local);

                // 把localStorage的todolist數據顯示到頁面上
                load();

                // 按下enter後輸入框就清空
                $(this).val('');
            }
        }
    })

    // 獲取localStorage的數據
    function getData() {
        let data = localStorage.getItem('todolist');
        // 如果data不為空，就返回裡面的數據
        if (data !== null) {
            // localStorage 裡面的數據是字串，要轉換
            return JSON.parse(data);
            // data為空，就返回空陣列
        } else {
            return [];
        }
    }

    // 儲存localStorage的數據
    function saveData(data) {
        // 上面的local是區域變數，這邊無法直接使用
        // 儲存必須轉換為字串
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    // 顯示數據到頁面上
    function load() {
        // 先獲取數據
        let data = getData();
        // console.log(data);

        // 進行迴圈前先清空ol裡面的數據，然後再prepend新數據，避免把所有的數據都重複顯示
        $('ol,ul').empty();

        let todoCount = 0; // 進行中的數量
        let doneCount = 0; // 已完成的數量

        // 迴圈數據
        // i是索引號，n是數據內容
        $.each(data, function (i, n) {
            // console.log(n);
            if (n.done) {
                // 如果數據是done，就顯示到ul(已完成)裡面
                // done的數據添加checked='checked'，讓它打勾
                $('ul').prepend("<li> <input type='checkbox' checked='checked'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a> </li>");
                doneCount++;
            } else {
                // 在ol (進行中的事項區域) 裡面添加li>input+p+a
                // prepend會把新數據添加在前面
                $('ol').prepend("<li> <input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a> </li>");
                // 在每個數據裡面添加id屬性，方便之後刪除數據使用
                todoCount++;
            }
            // 把進行中和已完成的數量顯示到畫面
            $('#todocount').text(todoCount);
            $('#donecount').text(doneCount);

        });
    };

    // todolist 刪除操作
    $('ol,ul').on('click', 'a', function () {
        // 先獲取數據
        let data = getData();
        console.log(data);

        // 修改數據
        // attr 獲取自定義屬性
        let index = $(this).attr('id');
        console.log(index);

        // splice(要插入或刪除的索引位置, 要刪除的元素數量, 要插入的元素內容)
        data.splice(index, 1);
        // 儲存數據
        saveData(data);

        // 重新顯示到頁面
        load();
    })

    // todolist 正在進行和已完成選項操作
    $('ol,ul').on('click', 'input', function () {
        // 先獲取數據
        let data = getData();

        // 修改數據
        let index = $(this).siblings('a').attr('id');
        console.log(index);

        // 把done修改為當前input(複選框)的選定狀態
        // prop是獲取固有屬性
        data[index].done = $(this).prop('checked');
        console.log(data);

        // 儲存數據
        saveData(data);

        // 重新顯示數據
        load();
    })




})