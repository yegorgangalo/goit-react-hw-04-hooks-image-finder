import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

function SearchBar ({onSubmit}) {

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = ({ target }) => setSearchQuery(target.value);

  const reset = () => setSearchQuery('');

  const onSubmitForm = (event) => {
    event.preventDefault();
    searchQuery.trim() !== '' ? onSubmit(searchQuery) : toast.warn('Input search Query');
    reset();
  }

    return (
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={onSubmitForm}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>
            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </form>
        </header>
    )
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

export default SearchBar;