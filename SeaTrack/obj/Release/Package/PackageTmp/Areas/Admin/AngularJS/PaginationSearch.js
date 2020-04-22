function ListDeviceSearch(id_search, list_result) {
    var _id_search, _list_result, filter, tr, td;
    _id_search = document.getElementById(id_search);
    _list_result = document.getElementById(list_result);
    tr = _list_result.getElementsByTagName('tr');
    filter = _id_search.value.toUpperCase();

    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td');
        var get = false;
        for (var j = 2; j < td.length; j++) {
            get = get || (td[j].innerText.toUpperCase().indexOf(filter) > -1);
        }
        if (get) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }

    }
};
