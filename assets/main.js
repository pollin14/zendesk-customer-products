$(function () {
    var client = ZAFClient.init();

    client.invoke('resize', {height: '300px'});
    client.get('ticket.requester.email').then(function (data) {
        var email = data['ticket.requester.email'];
        requestUserInfo(client, email);
    });
});

function showInfo(data) {
    var source = $("#customer-products-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#content").html(html);
}

function showError(response) {
    var error_data = {
        'status': response.status,
        'statusText': response.statusText
    };
    var source = $("#error-template").html();
    var template = Handlebars.compile(source);
    var html = template(error_data);
    $("#content").html(html);
}

function requestUserInfo(client, email) {
    var settings = {
        url: 'https://0k838xf1xh.execute-api.us-west-2.amazonaws.com/develop/customer/' + email,
        type: 'GET',
        dataType: 'json',
    };

    client.request(settings).then(showInfo, showError);
}

function formatDate(date) {
    var cdate = new Date(date);
    var options = {
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    date = cdate.toLocaleDateString("en-us", options);
    return date;
}

var x = {
    statusCode: 200,
    isBase64Encoded: false,
    headers: {'contentType': 'application/json'},
    body: {
        'plan_name': 'Premium',
        'products': [
            {
                'name': 'Seguro de vida',
                'type': 'insurance',
                'number': 'SV300'
            },
            {
                'name': 'Seguro de accidentes',
                'type': 'insurance',
                'number': 'SA600'
            },
            {
                'name': 'Prestamo',
                'type': 'loan',
                'number': 'LO400'
            }
        ]
    }
};
