//handle errors
const handleErrors=(err,numb)=>{
    // console.log(err.message,err.code)
     let errors ={username:"",email:"",number:"",password:""}
     
     //duplicate error
     
     if(err.code===11000){
       errors.username=JSON.stringify(Object.values(err.keyValue)[0]).slice(1,-1)+" already exists"
       console.log(err)
       return errors
     }
     
     if(numb[0]!=="0" && numb[1]!=="1"){
     
      errors.number="Enter a valid number"
     }
   
     // validation errors
     if(err.message.includes("blog validation failed")){
       Object.values(err.errors).forEach((error)=>{
   
        errors[error.properties.path]=error.properties.message
         //console.log(error.properties.message)
       
       })
     }
   return errors;
   }
   
   
   
   //end of handle errors
   
   module.exports=handleErrors