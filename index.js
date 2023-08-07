import { postData } from './data.js';


const homePgContent = document.getElementById('home-pg-content')
const postPreviewEl = document.getElementsByClassName('post-preview')


document.addEventListener('click', function(e){
    const targetId = e.target.id;
    if(targetId === 'home-btn'){
        handleHomeBtnClick()
    } else if (targetId === 'aboutme-btn'){
        handleAboutMeBtnClick()
    } else if (targetId === 'more-btn'){
        handleMoreBtnClick()
    } else if (e.target.classList.contains('post-click')){
        let selectedPostUuid = e.target.dataset.uuid
        handlePostClick(selectedPostUuid)
    }

})

function handleHomeBtnClick(){
    homePgHtml()
}

function homePgHtml(){
 
    homePgContent.innerHTML=``

    if (postData.length > 0){
        const post = postData[0]

        homePgContent.innerHTML = `
            <div class="pg-home">
                <section class="feat-post post-click" id="feat-post" style="background-image: url('${post.img}')" data-uuid='${post.uuid}'>
                    <div class="feat-content" data-uuid='${post.uuid}'>
                        <p class="post-date" data-uuid='${post.uuid}'>${post.date}</p>
                        <h1 data-uuid='${post.uuid}'>${post.title}</h1>
                        <p class="feat-description" data-uuid='${post.uuid}'>${post.description}</p>
                    </div>
                </section>
                <section class="entries-container" id="entries-container">
                </section>
                <button class="more-btn" id="more-btn">View More</button>
            </div> 
        `
    
    }
    entriesContainerHtml()
}

function entriesContainerHtml(){
    const entriesContainer = document.getElementById('entries-container')
    entriesContainer.innerHTML = ``

    const removedPost = postData.shift()

    for (let post of postData){
        entriesContainer.innerHTML += `
        <div class="post-preview hidden post-click" data-uuid='${post.uuid}'>
            <img src= ${post.img} class="preview-img post-click" data-uuid='${post.uuid}'>
            <p class="entry-date post-click" data-uuid='${post.uuid}'>${post.date}</p>
            <h2 class="post-click" data-uuid='${post.uuid}'>${post.title}</h2>
            <p class="description post-click" data-uuid='${post.uuid}'>${post.description}</p>
        </div>
        `
    }

    for (let i = 0; i < 3 && i< postPreviewEl.length; i++){
        postPreviewEl[i].classList.remove('hidden');
    }

    postData.unshift(removedPost)

    
}

function handleAboutMeBtnClick(){
    aboutMeHtml()
    renderRandomPost()

}

function aboutMeHtml(){
    homePgContent.innerHTML=``
    homePgContent.innerHTML = `
        <div class="aboutme-content">
            <img src="images/propic.png" alt="head shot picture of blog author" class="pro-pic">
            <h1>Hi there! My name is Roku and welcome to my learning journal.</h1>
            <p class="post-description">After several months of learning in the Frontend Developer Career Path, I've made the big jump over to the Bootcamp to get expert code reviews of my Solo Projects projects and meet like-minded peers.</p>
            <div class="aboutme-paragraphs">
                <p class="bold">How I stay committed to learning</p>
                <p>I like to think of myself as a lifelong learner. I used to spend hours and hours learning, then try to create simple projects using what I learned or work new techniques into existing projects.</p>
                <p>While that was fun, I felt like it would be helpful to share what I was learning and most things about my journey with the world.</p>
                <p class="bold">How I got started</p>
                <p>I started simple and gradually grew my learning journal site. I would take notes about what I was learning. After each learning session, I'd use my notes to not only reflect on what I learned but also write short summaries of what I learned using my own words.</p>
                <p>That helped me grok what I was learning, and I realized that posting my learning summaries was also helping others learn and stay motivated.</p>
            </div>
        </div>
        <div class="recent-container">
            <p class="recent-text">Recent Posts</p>
            <div class="recent-post-container" id="recent-post-container">
            </div>
        </div>
    `
}

function handlePostClick(postId){
    const selectedPost = postData.find(post => post.uuid.toString() === postId);
    console.log(selectedPost)

    if (selectedPost) {
        homePgContent.innerHTML = `
            <div class="pg-blogpost" id="pg-blogpost">
                <section>
                    <div class="full-post">
                        <p class="post-date">${selectedPost.date}</p>
                        <h1>${selectedPost.title}</h1>
                        <p class="post-description">${selectedPost.description}</p>
                        <img src=${selectedPost.img} class="post-img">
                        ${selectedPost.content}
                    </div>
                </section>
                <section>
                    <div class="recent-container">
                        <p class="recent-text">Recent Posts</p>
                        <div class="recent-post-container" id="recent-post-container">
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    renderRandomPost();
}

function handleMoreBtnClick(){
    const moreBtnEl = document.getElementById('more-btn')
    const showMore = moreBtnEl.innerText === 'View More'

    for (let i = 3; i < postPreviewEl.length; i++){
        postPreviewEl[i].classList.toggle('hidden');
    }

    if (showMore){
        moreBtnEl.innerText = 'View Less'
    } else {
        moreBtnEl.innerText = 'View More'
    }


}

function renderRandomPost() {
    const resultArray = [];
    const selectedIndexes = new Set()

    while (selectedIndexes.size < 3){
        const randomIndex = Math.floor(Math.random() * postData.length)
        selectedIndexes.add(randomIndex)

    }

    for (let postIndex of selectedIndexes) {
        const randomPost = postData[postIndex]
        resultArray.push(randomPost)
    }

    recentPostsHtml(resultArray)
 
}

function recentPostsHtml(resultArray){
    const recentPostContainer = document.getElementById('recent-post-container')
    recentPostContainer.innerHTML = ``

    for (let post of resultArray){
        recentPostContainer.innerHTML += `
            <div class="post-preview post-click" id='post-${post.uuid}' data-uuid='${post.uuid}'>
                <img src= ${post.img} class="preview-img post-click" data-uuid='${post.uuid}'>
                <p class="entry-date post-click" data-uuid='${post.uuid}'>${post.date}</p>
                <h2 class="post-click" data-uuid='${post.uuid}'>${post.title}</h2>
                <p class="description post-click" data-uuid='${post.uuid}'>${post.description}</p>
            </div>
        `
    }

}

homePgHtml()