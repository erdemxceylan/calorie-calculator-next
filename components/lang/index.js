import { useState, useEffect, Fragment } from 'react';

export default function Lang() {
   const [lang, setLang] = useState('en');

   useEffect(() => {
      setLang(localStorage.getItem('lang') || 'en');
   }, []);

   function changeHandler(option) {
      if (typeof window !== undefined) {
         localStorage.setItem('lang', option.target.value);
         setLang(option.target.value);
         window.location.reload();
      }
   }

   return (
      <Fragment>
         <select onChange={option => changeHandler(option)} value={lang}>
            <option value='en'>English</option>
            <option value='de'>Deutsch</option>
            <option value='tr'>Türkçe</option>
         </select>
         <h2>Hello</h2>
         <p>Hello</p>
      </Fragment>
   );
}