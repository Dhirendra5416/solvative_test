import React, { useRef ,useEffect} from 'react'
import "./SearchBox.css"

const SearchBox = ({value,onChange,onSearch,placeholder}) => {
    const inputRef = useRef();

    const handleSearch=(event)=>{
        if(event.key === "Enter"){
            onSearch(event.target.value)
        }
    };

    const handleShortcut =(e)=>{
        if((e.ctrlKey || e.metaKey) && e.key === "/"){
           e.preventDefault();
           inputRef.current.focus()
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleShortcut);
        return () => {
          window.removeEventListener("keydown", handleShortcut);
        };
      }, []);

  return (
    <input
     type='text'
     ref={inputRef}
     className='search-box'
     value={value}
     onChange={onChange}
     onKeyDown={handleSearch}
     placeholder={placeholder}
    
    
    />
  )
}

export default SearchBox