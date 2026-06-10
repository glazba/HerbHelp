const params = new URLSearchParams(window.location.search);

const herbId = params.get("id");

console.log(herbId);
