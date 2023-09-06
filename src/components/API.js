const randomCategoery = ['health=vegetarian','health=alcohol-free','health=vegan','health=sugar-conscious','diet=low-fat','diet=low-sodium','diet=balanced','diet=high-fiber']

export const selectedCategoery = randomCategoery[Math.floor(Math.random()*(1+randomCategoery.length-0))+0]

export const getItemlist = async (url = `https://www.edamam.com/api/recipes/v2?${selectedCategoery}&type=public`) => {
  if(url == null){
    return []
  }
  try {
    const jsonData = await fetch(url);
    
    if (jsonData.status === 200) {
      const data = await jsonData.json();
      return data;
    } else {

    }
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for the caller to handle
  }

};

