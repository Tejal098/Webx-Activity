let blogs = JSON.parse(localStorage.getItem("blogs")) || [];


function show(id){

  document.getElementById("writer").classList.add("hide");
  document.getElementById("reader").classList.add("hide");
  document.getElementById("admin").classList.add("hide");

  document.getElementById(id).classList.remove("hide");
}


function addBlog(){

  let title = document.getElementById("title").value;
  let content = document.getElementById("content").innerHTML;

  if(title==="" || content===""){
    alert("Fill all fields");
    return;
  }

  blogs.push({
    title:title,
    content:content
  });

  localStorage.setItem("blogs", JSON.stringify(blogs));

  document.getElementById("title").value="";
  document.getElementById("content").innerHTML="";

  displayBlogs();
}


function displayBlogs(){

  let blogBox = document.getElementById("blogs");
  let adminBox = document.getElementById("adminBlogs");

  blogBox.innerHTML="";
  adminBox.innerHTML="";

  blogs.forEach((blog,index)=>{

    blogBox.innerHTML += `
      <div class="blog">
        <h3>${blog.title}</h3>
        <div>${blog.content}</div>
      </div>
    `;

    adminBox.innerHTML += `
      <div class="blog">
        <h3>${blog.title}</h3>
        <div>${blog.content}</div>

        <button class="edit"
                onclick="editBlog(${index})">
          Edit
        </button>

        <button class="delete"
                onclick="deleteBlog(${index})">
          Delete
        </button>
      </div>
    `;
  });
}


function editBlog(index){

  let title = prompt(
    "Edit Title",
    blogs[index].title
  );

  let content = prompt(
    "Edit Content",
    blogs[index].content
  );

  if(title && content){

    blogs[index].title = title;
    blogs[index].content = content;

    localStorage.setItem(
      "blogs",
      JSON.stringify(blogs)
    );

    displayBlogs();
  }
}


function deleteBlog(index){

  blogs.splice(index,1);

  localStorage.setItem(
    "blogs",
    JSON.stringify(blogs)
  );

  displayBlogs();
}


let editor = document.getElementById("content");

editor.addEventListener("paste", function(e){

  let items = e.clipboardData.items;

  for(let i=0;i<items.length;i++){

    if(items[i].type.indexOf("image") !== -1){

      let file = items[i].getAsFile();

      let reader = new FileReader();

      reader.onload = function(event){

        let img = document.createElement("img");

        img.src = event.target.result;

        editor.appendChild(img);
      };

      reader.readAsDataURL(file);
    }
  }
});


displayBlogs();