 const asyncCatch = (fnc : any) => async (data : any) => {
    try {
      await fnc(data);
    } catch (error) {
    return console.log(error);
      
    }
  };

  export default asyncCatch;