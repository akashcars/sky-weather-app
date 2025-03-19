 

const config  = {
  color: "#EC6E4C"  ,
};  

export default config;

 function isObjectEmpty(obj: any) {
   for (const i in obj) return false;
   return true;
 }
 
 export { isObjectEmpty };