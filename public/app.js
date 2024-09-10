document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('itemForm');
    const itemsTable = document.getElementById('itemsTable').querySelector('tbody');
  
    const apiUrl = '/api/items';
  
    function fetchItems() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(items => {
          itemsTable.innerHTML = '';
          items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${item._id}</td>
              <td>${item.name}</td>
              <td>${item.description}</td>
              <td>${item.price}</td>
              <td>
                <button onclick="editItem('${item._id}')">Edit</button>
                <button onclick="deleteItem('${item._id}')">Delete</button>
              </td>
            `;
            itemsTable.appendChild(row);
          });
        })
        .catch(error => console.error('Error fetching items:', error));
    }
  
    function addItem(name, description, price) {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price }),
      })
      .then(response => response.json())
      .then(() => {
        itemForm.reset();
        fetchItems();
      })
      .catch(error => console.error('Error adding item:', error));
    }
  
    function editItem(id) {
      const newName = prompt('Enter new item name:');
      const newDescription = prompt('Enter new item description:');
      const newPrice = prompt('Enter new item price:');
      if (newName && newDescription && newPrice) {
        fetch(`${apiUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName, description: newDescription, price: parseFloat(newPrice) }),
        })
        .then(response => response.json())
        .then(() => fetchItems())
        .catch(error => console.error('Error updating item:', error));
      }
    }
  
    function deleteItem(id) {
      fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => fetchItems())
        .catch(error => console.error('Error deleting item:', error));
    }
  
    itemForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('itemNameInput').value;
      const description = document.getElementById('itemDescriptionInput').value;
      const price = parseFloat(document.getElementById('itemPriceInput').value);
      addItem(name, description, price);
    });
  
    fetchItems();
  });
  
