// api.js
export async function getData() {
    try {
        let res = await fetch('https://api-project-85678-default-rtdb.firebaseio.com/products.json');
        let data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching data:", err);
        return null;
    }
}
