import React, { useEffect ,useState } from 'react';


function App() {
  const [pages, setPages] = useState({ hits: [] });
  async function fetchPages() {
    const response = await fetch('https://qiita.com/api/v2/items' ); 
    const json = await response.json();
    setPages(json);
  }
  useEffect(()=>{
    fetchPages();
  },[]);
return <React.Fragment>{pages.hits.map(item => (
  <li key={item.objectID}>
    <a href={item.url}>{item.title}</a>
  </li>
))}</React.Fragment>
}

export default App;
