const alertBootstrapElement = document.getElementById("copyAlert");
const alertBootstrap = new bootstrap.Toast(alertBootstrapElement);

function copy(element) {
    if (alertBootstrap) {
        alertBootstrap.show();
    }

    let text = element.dataset.url;
    navigator.clipboard.writeText(text);
}