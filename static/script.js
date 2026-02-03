const upload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

upload.addEventListener("change", () => {
    const file = upload.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        preview.src = reader.result;
        preview.hidden = false;
        result.innerText = "";
    };
    reader.readAsDataURL(file);
});

function predict() {
    console.log("Button clicked");

    if (!upload.files.length) {
        alert("Please upload an image!");
        return;
    }

    const formData = new FormData();
    formData.append("image", upload.files[0]);

    result.innerText = "Analyzing...";

    fetch("/predict", {
        method: "POST",
        body: formData
    })
    .then(res => {
        console.log("Response status:", res.status);
        return res.json();
    })
    .then(data => {
        console.log("Server data:", data);
        result.innerText = `${data.prediction} (${data.confidence}%)`;
        document.getElementById("confBar").style.width = data.confidence + "%";
    })
    .catch(err => {
        console.error("Fetch error:", err);
        result.innerText = "Error contacting server";
    });
}

