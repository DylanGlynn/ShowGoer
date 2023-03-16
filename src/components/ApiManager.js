const API = `http://localhost:8088/`

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