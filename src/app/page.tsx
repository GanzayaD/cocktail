"use client"
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import gin from "./gin.jpg"
import { useRouter } from "next/navigation";
interface Cocktail {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  strGlass: string;
  // Add other properties if needed
}

const App = () => {
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailDetails, setCocktailDetails] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadings, setLoadingss] = useState(true);
  const [load, setLoadings] = useState(true);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [cocktailIngredients, setCocktailIngredients] = useState<string[]>([]);
  const [selected,selectedCocktails]=useState("");
  const [a,seta]=useState("");
  const [letter,setLetter]=useState("");
  const handleSearchByName = async () => {
    seta("a");
    setLoadingss(true);
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.drinks) {
        console.log("Cocktails:", data.drinks);
        setCocktails(data.drinks || []);
        setLoading(false);
       
      } else {
        console.log("No cocktails found");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error searching by name:", error);
      setLoading(false);
    }
  };

  const handleShowDetails = async (selectedCocktail: Cocktail) => {
    seta("b");
    setLoadingss(true);
    console.log(`${selectedCocktail.idDrink}`);
    setLoading(true);
    setLoadings(true)
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${selectedCocktail.idDrink}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.drinks && data.drinks.length > 0) {
        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
          const ingredient = data.drinks[0][`strIngredient${i}`];

          if (ingredient) {
            ingredients.push(ingredient);
          } else {
            break;
          }
        }

        console.log(`${selectedCocktail.strDrink} Ingredients:`, ingredients);
        setCocktailIngredients(ingredients);
        setCocktailDetails(selectedCocktail);
        selectedCocktails(selectedCocktail.strDrinkThumb);
      }
    } catch (error) {
      console.error("Error getting ingredients:", error);
    }
  };
 
  const handleSearchByIngredient = async (ingredient: string) => {
seta("a");
setLoadingss(true);
    try {
    
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.drinks) {
        console.log("Cocktails by ingredient:", data.drinks);
        setCocktails(data.drinks || []);
        setLoading(false);
      } else {
        console.log("No cocktails found for the selected ingredient");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error searching by ingredient:", error);
      setLoading(false);
    }
  };
  const fetchRandomCocktails = async () => {
    setLoading(true);
    setLoadingss(true);
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.drinks) {
        console.log("Random Cocktails:", data.drinks);
        setCocktails(data.drinks || []);
        setLoadings(false);
        // Reset selected cocktail details when fetching random cocktails
        setCocktailDetails(null);
        setCocktailIngredients([]);
      } else {
        console.log("No random cocktails found");
        setLoadings(false);
      }
    } catch (error) {
      console.error("Error fetching random cocktails:", error);
      setLoadings(false);
    }
  };
  
  useEffect(() => {
    fetchRandomCocktails();
  }, []);
 

  const handleListByFirstLetter = async (letter: string) => {
    setLoading(true);
    setLoadings(true);
    seta("a");
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      setLetter(letter);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.drinks) {
        setCocktails(data.drinks || []);
        setLoadingss(false);
        // Assuming data.drinks is an array of cocktails
        // You can handle the data as per your application requirements
        console.log(`Cocktails with the first letter ${letter}:`, data.drinks);
      } else {
        console.log(`No cocktails found with the first letter ${letter}`);
        setLoadingss(false);
      }
    } catch (error) {
      console.error("Error listing by first letter:", error);
      setLoadingss(false);
    }
  };



  return (
    
    <>
    
    <div className='z-40 relative'>
      <div className='w-full flex flex-row fixed bg-black h-16 border-b border-slate-400 border-opacity-25'>
           <h1 className=" text-4xl font-serif italic ms-[70px] my-2 ">Enjoy It</h1>   

           <input 
                className='ms-[650px] w-[300px] my-4 h-8 bg-zinc-800 rounded-md'
                type="text"
                placeholder="   Enter cocktail name"
                value={cocktailName}
                onChange={(e) => setCocktailName(e.target.value)}
               
            />
            <button onClick={handleSearchByName} className='-ms-5'><FontAwesomeIcon icon={faSearch}/></button>
            <FontAwesomeIcon icon={faHome} onClick={() => fetchRandomCocktails()} className='w-7 h-7 my-4 ms-10'/>
     </div>
      <br />
  
    <div className='w-5/6 my-12 bg-black ms-24 h-[450px]'> 
      {cocktailIngredients.length > 0 && a!="a" && (
        <div className=' grid grid-cols-2'>
          <div className='col-span-1  mb-0'>
                <img className=' inline-block my-5 w-[400px]'
                  src={selected}
                  alt={selected}
                  style={{ width: '600px', height: '430px', cursor: 'pointer' }}
                />
                <p className='font-serif italic text-4xl flex justify-center'>{cocktailDetails?.strDrink}</p>
                
          </div>
          <div className='col-span-1'>
          
             {cocktailIngredients.map((ingredient, index) => (   
                  <button key={index} className='my-6 ms-4 font-serif italic' onClick={() => handleSearchByIngredient(ingredient)}>
                 
                  <img  className=''
                  src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}
                  alt={ingredient} 
                  style={{ width: "150px", height: "150px" }}
                  />
                   {ingredient} 
                  </button>
                
          
           ))}
            
           </div> 
           <p className='my-[60px]  col-span-2 font-serif italic text-4xl flex justify-center'>Instructions</p>
           <p className=' flex justify-center col-span-2'>{cocktailDetails?.strInstructions}</p>
           <p className='my-[60px]  col-span-2 font-serif italic text-4xl flex justify-center'>Alcoholic</p>
           <p className=' flex justify-center col-span-2'>{cocktailDetails?.strAlcoholic}</p>
           <p className='my-[60px]  col-span-2 font-serif italic text-4xl flex justify-center'>Class</p>
           <p className=' flex justify-center col-span-2'>serve: {cocktailDetails?.strGlass}</p>
           <p className='font-serif italic text-xl mt-10 flex justify-center col-span-2 '>Listing cocktails by the first letter</p>
             
         <div className='flex flex-row justify-center space-x-2 my-5 border-b border-white h-14 col-span-2'>
         <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle ' onClick={() => handleListByFirstLetter("A")}>A</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("B")}>B</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("C")}>C</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("D")}>D</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("E")}>E</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("F")}>F</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("G")}>G</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("H")}>H</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("I")} >I</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("J")}>J</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("K")}>K</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("L")}>L</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("M")}>M</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("N")}>N</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("O")}>O</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("P")}>P</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("Q")}>Q</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("R")}>R</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("S")}>S</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("T")}>T</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("U")}>U</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("V")}>V</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("W")}>W</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("X")}>X</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("Y")}>Y</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("Z")}>Z</div>
              </div> 
        </div>
        
       
      )}
     
      <br />
      {loading ? (
        <p></p>
      ) : (
        <div>
          <div className='font-serif italic text-4xl flex justify-center border-b border-slate-400 border-opacity-25'>Your search result: Хайснаа ол</div>
          <ul className='my-5'>
            {cocktails.map((cocktail) => (

              <div key={cocktail.idDrink} className='inline-block ms-4 '>
                <img className=''
                  src={cocktail.strDrinkThumb}
                  onClick={() => handleShowDetails(cocktail)}
                  alt={cocktail.strDrink}
                  style={{ width: '330px', height: '330px', cursor: 'pointer' }}
                />
                <p className='font-serif italic text-xl flex justify-center'>{cocktail.strDrink}</p>
              </div>
            ))}
          </ul>
          <p></p>
          <p className='font-serif italic text-xl my-5 flex justify-center'>Listing cocktails by the {letter} first letter</p>
             
             <div className='flex flex-row justify-center space-x-2 my-5 border-b border-white h-14'>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle ' onClick={() => handleListByFirstLetter("A")}>A</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("B")}>B</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("C")}>C</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("D")}>D</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("E")}>E</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("F")}>F</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("G")}>G</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("H")}>H</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("I")} >I</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("J")}>J</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("K")}>K</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("L")}>L</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("M")}>M</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("N")}>N</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("O")}>O</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("P")}>P</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("Q")}>Q</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("R")}>R</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("S")}>S</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("T")}>T</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("U")}>U</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("V")}>V</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("W")}>W</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("X")}>X</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("Y")}>Y</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("Z")}>Z</div>
             
             </div>
        </div>
      )}
      {/* Display details */}
      {loadings ? (
        <p></p>
      ) : (
        <ul>
         <p className='font-serif italic text-4xl mt-4 flex justify-center col-span-2 mb-8'>  {letter} үсгээр эхэлсэн коктейлүүдийн жагсаалт:  </p>
          {cocktails.map((cocktail) => (
            <li key={cocktail.idDrink} className='inline-block ms-4 my-2'> 
           <img src={cocktail.strDrinkThumb} alt={cocktail.strDrinkThumb}    
            style={{ width: '330px', height: '330px', cursor: 'pointer' }} 
            onClick={() => handleShowDetails(cocktail)}/>
            <p className='flex justify-center'>{cocktail.strDrink}</p></li>
           
          ))}
        </ul>
      )}
      {load ? (
        <p></p>
      ) : (
        <div>
          <div className='flex flex-row'>
            <Image src={gin} alt='bg' height={100} width={120} className='ms-16'/>
          <h1 className='font-serif flex justify-center my-10 text-6xl'>Welcome to cocktail website</h1>
           </div>
          <div className='flex flex-row space-x-3 justify-between my-8 '>
            <div className='h-44 w-[310px]'>
              <p className='font-serif text-base'>An open, crowd-sourced database of drinks and cocktails from around the world.
              If you love our service and want extra features you can sign up as a Patreon supporter for $3.</p></div>
            <div className='  h-44 w-[310px] font-serif text-base'>
        
            The API and site will always remain free to access at its basic level.
If you love our service and want extra features you can sign up as a Patreon supporter for $3.</div>
            <div className=' h-44 w-[310px] font-serif text-base'>
          
            An open, crowd-sourced database of drinks and cocktails from around the world.
We also offer a free cocktail API for anyone wanting to use it.
</div>
</div>
         
          <p className='font-serif italic text-xl my-5 flex justify-center'>Listing cocktails by the first letter</p>
             
             <div className='flex flex-row justify-center space-x-2 my-5 border-b border-white h-14'>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle ' onClick={() => handleListByFirstLetter("A")}>A</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("B")}>B</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("C")}>C</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("D")}>D</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("E")}>E</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("F")}>F</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("G")}>G</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("H")}>H</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("I")}>I</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("J")}>J</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("K")}>K</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("L")}>L</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("M")}>M</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("N")}>N</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("O")}>O</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("P")}>P</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("Q")}>Q</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("R")}>R</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("S")}>S</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("T")}>T</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("U")}>U</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("V")}>V</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("W")}>W</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("X")}>X</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("Y")}>Y</div>
              <div className= ' border-2 border-white w-7 h-7 rounded-full text-center align-middle' onClick={() => handleListByFirstLetter("Z")}>Z</div>
             
             </div>
          <ul className='my-5'>
            {cocktails.map((cocktail) => (
              <li key={cocktail.idDrink} className='inline-block ms-4 '>
                <img
                  src={cocktail.strDrinkThumb}
                  onClick={() => handleShowDetails(cocktail)}
                  alt={cocktail.strDrink}
                  style={{ width: '330px', height: '330px', cursor: 'pointer' }}
                />
                 <p className='font-serif italic text-xl flex justify-center'>{cocktail.strDrink}</p>
              </li>
            ))}
              
            
          </ul>
        </div>
      )}
      </div>  
    </div>
    </>
  );
};

export default App;
