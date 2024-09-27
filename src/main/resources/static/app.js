document.getElementById('propertyForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const address = document.getElementById('address').value;
    const price = document.getElementById('price').value;
    const size = document.getElementById('size').value;
    const description = document.getElementById('description').value;

    if (!address || !price || !size || !description) {
        alert('All fields are required.');
        return;
    }

    fetch('/api/properties', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, price, size, description })
    })
    .then(response => response.json())
    .then(data => {
        alert('Property added successfully');
        loadProperties();
    })
    .catch(error => console.error('Error:', error));
});

function loadProperties() {
    fetch('/api/properties')
        .then(response => response.json())
        .then(data => {
            const propertyList = document.getElementById('propertyList');
            propertyList.innerHTML = '';
            data.forEach(property => {
                const propertyItem = document.createElement('div');
                propertyItem.innerHTML = `
                    <h3>${property.address}</h3>
                    <p>Price: ${property.price}</p>
                    <p>Size: ${property.size}</p>
                    <p>Description: ${property.description}</p>
                    <button onclick="viewProperty(${property.id})">View</button>
                    <button onclick="updateProperty(${property.id})">Update</button>
                    <button onclick="deleteProperty(${property.id})">Delete</button>
                `;
                propertyList.appendChild(propertyItem);
            });
        });
}

function viewProperty(id) {
    fetch(`/api/properties/${id}`)
        .then(response => response.json())
        .then(property => {
            alert(`Address: ${property.address}\nPrice: ${property.price}\nSize: ${property.size}\nDescription: ${property.description}`);
        })
        .catch(error => console.error('Error:', error));
}

function updateProperty(id) {
    const address = prompt('Enter new address:');
    const price = prompt('Enter new price:');
    const size = prompt('Enter new size:');
    const description = prompt('Enter new description:');

    if (!address || !price || !size || !description) {
        alert('All fields are required.');
        return;
    }

    fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, price, size, description })
    })
    .then(response => response.json())
    .then(data => {
        alert('Property updated successfully');
        loadProperties();
    })
    .catch(error => console.error('Error:', error));
}

function deleteProperty(id) {
    fetch(`/api/properties/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert('Property deleted successfully');
        loadProperties();
    })
    .catch(error => console.error('Error:', error));
}

loadProperties();