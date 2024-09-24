const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

const form=document.querySelector('#new-post form')
const fetchButton=document.querySelector('#available-posts button')
const postList=document.querySelector('ul')

function sendHttpRequest(method, url,data) {
//   const promise = new Promise((resolve, reject) => {
   return fetch(url,{
    method:method,
    body:JSON.stringify(data),
    headers:{
        'Content-Type':'application/json'
    }
   }).then(response=>{
    if(response.status>=200 && response.status<300){
       return response.json(); 
    }
    else{
        return response.json().then(errorData=>{
            console.log(errorData)
            throw new Error('something Went Wrong - Server-side')
        })
     
    }
    
   }).catch(error=>{
    console.log(error)
    throw new Error('Something Went Wrong')
   })
//    .then(response=>{
//     console.log(response.json())
//     return response.json()
//    });

//   });
//   return promise
}

function fetchPosts(){
    axios.get('https://jsonplaceholder.typicode.com/posts').then(responseData=>{
        console.log(responseData)
        const listOfPosts = responseData.data;
        // console.log(listOfPosts);
        for (const post of listOfPosts) {
          const postEl = document.importNode(postTemplate.content, true);
          postEl.querySelector("h2").textContent = post.title.toUpperCase();
          postEl.querySelector("p").textContent = post.body;
          postEl.querySelector('li').id=post.id
  
          listElement.append(postEl);
        }
    })
    .catch(err=>{
        alert(err.message);
    })
}

async function createPost(title,content){
    const userId=Math.random().toString();
    const post={
        title:title,
        body:content,
        userId:userId
    }

    // const fd=new FormData(); //adding a file picker
    // fd.append('title',title)
    // fd.append('body',content)
    // fd.append('userId',userId)
    // fd.append('somefile','somefilepicked in a file input','photo.png')
    // sendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts',fd)

    // then in sendHttpRequest
    // return fetch(url,{
    //     method:method,
    //     body:data,
    // })
    //All Donee

    //OR
    //const fd=new FormData(form) //from the form element and should have a name attribute
       // sendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts',fd)


    axios.post('https://jsonplaceholder.typicode.com/posts',post).then(response=>{
        console.log(response)
    })
}

// createPost('Dummy','A Dummy Post')

fetchButton.addEventListener('click',fetchPosts);
form.addEventListener('submit',event=>{
    event.preventDefault();
    const enteredTitle=event.currentTarget.querySelector('#title').value
    const enteredContent=event.currentTarget.querySelector('#content').value

    createPost(enteredTitle,enteredContent)
})

postList.addEventListener('click',event=>{
    if(event.target.tagName==='BUTTON'){
        const postId=event.target.closest('li').id;
        console.log(postId)
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
})