'use strict';

const articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// TODO As a style standard, the variable name of a constructor function is captilized to indicate that it is the template.

function Article (rawDataObj) {
    Object.keys(rawDataObj).forEach(key => {
        this[key] = rawDataObj[key];
    });

    // TODOne?: Explain this
    // Setting up a constructor function for the object Article, which will create an instance that shares the properties of the object literal used as an argument.
}

Article.prototype.toHtml = function() {
    // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
    // Cloning makes a detailed copy, including descendent elements and nodes, super helpful for duplicating HTML sections like we are using.

    const template = $('#article-template').clone().html();
    /* TODOne: We got the html from our template, but we need to turn the html string into a jQuery object and store it in our $newArticle variable. */
    const $newArticle = $(template);

    if (!this.publishedOn) $newArticle.addClass('draft');
    $newArticle.attr('data-category', this.category);
    $newArticle.find('address a').text(this.author).attr('href', this.authorUrl);
    $newArticle.find('h1').text(this.title);
    $newArticle.find('.article-body').html(this.body);
    $newArticle.find('time').attr('datetime', this.publishedOn);

    /* TODOne: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */

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
