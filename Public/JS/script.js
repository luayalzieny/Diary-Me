// Function to handle the deletion of a blog post
function deleteProd(btn) {
    // Finding the closest ancestor element with the class 'blog'
    const post = btn.closest('.blog');
    // Finding the value of the '.deletion' input within the closest 'blog' element
    const input = btn.closest('.blog').querySelector('.deletion').value;
    
    // Logging the retrieved input value
    console.log(input);

    // Sending a DELETE request to the server to delete the post with the specified input value
    fetch('/deletePost/' + input, {
        method: "DELETE"
    })
    .then(result => {
        // Logging the result of the DELETE request
        console.log(result);
        // Returning the result as JSON
        return result.json();
    })
    .then(data => {
        // Removing the 'blog' element from the DOM after successful deletion
        post.remove();
    })
    .catch(err => console.log(err));
}
