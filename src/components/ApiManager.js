const API = `http://localhost:8088/`
const storageAPI = `https://res.cloudinary.com/dwnxftunt/image/upload/v1678731459/ShowGoer/`

export const Method = (methodType, send) => {
    if (methodType === "DELETE") {
        return { method: methodType }
    } else {
        return {
            method: methodType,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(send)
        }
    }
}

export const Fetch = (folder, filtering, method = {}) => {
    return fetch(`${API}${folder}${filtering}`, method)
        .then(res => res.json())
}

export const FetchExternal = (folder, filtering, method = {}) => {
    return fetch(`${storageAPI}${folder}${filtering}`, method)
        .then(res => res.json())
}

/* 
fetch(`https://res.cloudinary.com/dwnxftunt/image/upload/v1678731459/ShowGoer/`, {
            method: "POST",
            body: newPost.src
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                document.getElementById("data").innerHTML += data;
            });
 */