
function handleSearch(event) {
      event.preventDefault(); 
      const searchInput = event.target.querySelector('input[type="search"]');
      alert('Searching for: ' + searchInput.value); 
      searchInput.value = ''; 
  }
  
  
  function changeSectionColor(section) {
      section.style.backgroundColor = section.style.backgroundColor === 'rgba(255, 255, 255, 0.2)' ? 'rgba(10, 10, 10, 0.5)' : 'rgba(255, 255, 255, 0.2)';
  }
  