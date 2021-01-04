import blogs from './blogs.js';

const blogsDisplay = function() {
    const blogSection = document.getElementsByClassName('blogs')[0];
    let indexOfDisplayedBlog = 0;
    const blogsArray = blogs.map((blog, index) => {
        return `
            <div class="blogTitle">
                <p>${blog.title}</p>
            </div> <!-- closing blogTitle -->
            <div class="blogImageContaine blogPost--${index}">
                <a href="${blog.link}" target="_blank"><img src="${blog.imgFile}" alt="Photo for ${blog.title} blog post"/></a>
            </div> <!-- closing blogImageContainer blogPost--${index} -->
        `;
    });

    function indexLoop(index, change) {
        index += change;
        if (index < 0) {
            index = blogs.length - 1;
        } else if (index > blogs.length - 1) {
            index = 0;
        };
        return index;
    };

    function handleBlogNav(change) {
        indexOfDisplayedBlog = indexLoop(indexOfDisplayedBlog, change);
        buildBlogSection(indexOfDisplayedBlog);
    };
    
    function createBlogSection(indexOfBlogToDisplay) {
        const section = `
            ${
                blogsArray[indexOfBlogToDisplay]
            }
            <button class="previousBlog" aria-label="show previous blog post"><i class="fas fa-chevron-left"></i></button>
            <button class="nextBlog" aria-label="show next blog post"><i class="fas fa-chevron-right"></i></button>
        `;
        const templateFragment = document.createElement('template');
        templateFragment.innerHTML = section;
        return templateFragment;
    };

    function buildBlogSection(indexOfBlogToDisplay) {
        const section = createBlogSection(indexOfBlogToDisplay);
        blogSection.innerHTML = '';
        blogSection.appendChild(section.content);
        const previousBlogButton = blogSection.getElementsByClassName('previousBlog')[0];
        previousBlogButton.onclick = () => handleBlogNav(-1);
        const nextBlogButton = blogSection.getElementsByClassName('nextBlog')[0];
        nextBlogButton.onclick = () => handleBlogNav(1);
    };

    function init() {
        buildBlogSection(indexOfDisplayedBlog);
    };

    return {
        init: init
    };
}();

export default blogsDisplay;