import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (<>
    <SearchBar onSubmit={setSearchQuery} />
    <ImageGallery searchQuery={searchQuery} />
    <ToastContainer autoClose={3000}/>
    </>)
}

export default App;
