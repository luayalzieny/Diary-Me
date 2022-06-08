function deleteProd(btn){
    const post=btn.closest('.blog');
    const input=btn.closest('.blog').querySelector('.deletion').value;
    console.log(input);

    fetch('/deletePost/'+input,{
        method:"DELETE"
        })
        .then(result=>{
            console.log(result)
            return result.json()
        })
        .then(data=>{
            post.remove()
        })
        .catch(err=>console.log(err))
}