'use strict';

const articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// This is a contstuctor function that creates the articles that are stored in the articles array. The name is capitilized because it is constructor function. "This" refers to Object, which is ultimately any object in the rawData array. "rawDataObj" represents the length of the rawData array.

function Article (rawDataObj) {
    Object.keys(rawDataObj).forEach(key => {
        this[key] = rawDataObj[key];
    });

    // Walk through the code in the constructor function and write a comment explaining what's happening in lines 9-11. 
    // It takes the keys of each object instance inside the rawData array and assigns it to a key of the new object instance for the length of the rawData array.
}

Article.prototype.toHtml = function() {
    // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
    // So we can add more posts to the blog using the same HTML and CSS styling in place.

    const template = $('#article-template').clone().html();
    /* TODOne: We got the html from our template, but we need to turn the html string into a jQuery object and store it in our $newArticle variable. */
    const $newArticle = $(template);

    if (!this.publishedOn) $newArticle.addClass('draft');
    $newArticle.attr('data-category', this.category);

    /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */

    $newArticle.find('address a').text(this.author).attr('href', this.authorUrl);
    $newArticle.find('h1').text(this.title);

   
    // const $body = $(body);
    $newArticle.find('.article-body').text($(this.body));
    $newArticle.find('time').attr('datetime', this.publishedOn);

    // REVIEW: Display the date as a relative number of 'days ago'
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
    $newArticle.append('<hr>');
    return $newArticle;
};

rawData.sort(function(a,b) {
    // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

for(let i = 0; i < rawData.length; i++) {
    articles.push(new Article(rawData[i]));
}

for(let i = 0; i < articles.length; i++) {
    $('#articles').append(articles[i].toHtml());
}
