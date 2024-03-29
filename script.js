$('.btn').on('click', function () {
    $('.arquivo').trigger('click');
});

$('.arquivo').on('change', function () {
    var fileName = $(this)[0].files[0].name;
    $('#file').val(fileName);
});

const url = 'process.php';
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const file = document.getElementById('arquivo').files[0];

    fetch(url, {
        method: 'POST',
        body: file
    }).then(qwertyui => {
        d3.dsv(";", URL.createObjectURL(file)).then(function (data) {
            var expensesByCod = d3.nest()
                .key(function (d) { return d.COD_DISCIP_ORIG; })
                .rollup(function (v) { return {
                    COD_DISCIP_ORIG: v[0].COD_DISCIP_ORIG,
                    NOME_DISCIP_ORIG: v[0].NOME_DISCIP_ORIG,
                    equivalences: v
                }})
                .object(data);

            $.each(expensesByCod, function (result) {
                var results = document.getElementById("results");
                results.innerHTML += "<h3 class='label'>" + expensesByCod[result].NOME_DISCIP_ORIG + "</h3>";
                expensesByCod[result].equivalences.forEach(function (data) {
                    results.innerHTML += "<p class='content'>" + data.NOME_DISCIP_EQUIV + "</p>" 
                });
            });
        });
        stop_loading();
    });
});

function loading() {
    document.getElementById("overlay").classList.remove("invisible");
    document.getElementById("loads").classList.remove("invisible");
}

function stop_loading(){
    document.getElementById("overlay").classList.add("invisible");
    document.getElementById("loads").classList.add("invisible");
}